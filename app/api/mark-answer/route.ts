import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/mark-answer
 *
 * Marks one free-response exam-question answer against its mark scheme,
 * using Groq's hosted llama-3.3-70b-versatile model as the AI examiner.
 *
 * Requires a GROQ_API_KEY environment variable to be set in the Vercel
 * project (Settings -> Environment Variables). The key is only ever read
 * server-side here — it is never sent to the browser.
 *
 * Request body:
 *   {
 *     questionPrompt: string,
 *     context?: string,        // scene-setting text shown above the question
 *     markScheme: { point: string; marks: number }[],
 *     maxMarks: number,
 *     studentAnswer: string,
 *   }
 *
 * Response body (200):
 *   {
 *     marksAwarded: number,
 *     maxMarks: number,
 *     matchedPoints: string[],
 *     feedback: string,
 *   }
 */

interface MarkRequestBody {
  questionPrompt: string;
  context?: string;
  markScheme: { point: string; marks: number }[];
  maxMarks: number;
  studentAnswer: string;
}

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export async function POST(req: NextRequest) {
  let body: MarkRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { questionPrompt, context, markScheme, maxMarks, studentAnswer } = body;

  if (
    typeof questionPrompt !== "string" ||
    !Array.isArray(markScheme) ||
    typeof maxMarks !== "number" ||
    typeof studentAnswer !== "string"
  ) {
    return NextResponse.json({ error: "Malformed marking request." }, { status: 400 });
  }

  if (!studentAnswer.trim()) {
    return NextResponse.json({
      marksAwarded: 0,
      maxMarks,
      matchedPoints: [],
      feedback: "No answer was submitted, so no marking points could be awarded.",
    });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI marking is not configured yet. Add a GROQ_API_KEY environment variable in the Vercel project settings, then redeploy.",
      },
      { status: 500 }
    );
  }

  const schemeText = markScheme
    .map((m, i) => `${i + 1}. (${m.marks} mark${m.marks === 1 ? "" : "s"}) ${m.point}`)
    .join("\n");

  const systemPrompt = `You are an experienced AQA GCSE Biology examiner. You mark student answers strictly against the mark scheme you are given, the way a real AQA examiner does: award each marking point independently if the student's answer conveys that point's meaning, even if the wording, spelling, or phrasing differs from the mark scheme. Do not require the exact words of the mark scheme. Do not award a point for vague, contradictory, off-topic, or purely repeated-question answers. Never award more than the stated maximum for the question. Always respond with ONLY a single JSON object and nothing else — no markdown code fences, no commentary before or after it.`;

  const userPrompt = `Question${context ? " context: " + context : ""}
Question: ${questionPrompt}
Maximum marks: ${maxMarks}

Mark scheme:
${schemeText}

Student's answer:
"""
${studentAnswer}
"""

Mark the student's answer against the mark scheme above. Respond with ONLY a JSON object in exactly this shape:
{"marksAwarded": <integer, 0 to ${maxMarks}>, "matchedPoints": [<the exact mark scheme point strings that were awarded, copied verbatim from the scheme above>], "feedback": "<2-3 sentences, specific and encouraging, explaining what scored and what — if anything — was missing or could be improved>"}`;

  let response: Response;
  try {
    response = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 500,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });
  } catch {
    return NextResponse.json({ error: "Could not reach the marking service. Check your connection and try again." }, { status: 502 });
  }

  if (!response.ok) {
    const status = response.status;
    const message =
      status === 401
        ? "The marking service rejected the request — GROQ_API_KEY may be invalid."
        : status === 429
        ? "The marking service is temporarily rate-limited. Try again in a moment."
        : `The marking service returned an error (${status}).`;
    return NextResponse.json({ error: message }, { status: 502 });
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    return NextResponse.json({ error: "The marking service returned an unreadable response." }, { status: 502 });
  }

  const raw: string = data?.choices?.[0]?.message?.content ?? "";
  const cleaned = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Fall back to trying to locate a JSON object within the text, in case
    // the model added stray text despite instructions.
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        parsed = JSON.parse(match[0]);
      } catch {
        parsed = null;
      }
    } else {
      parsed = null;
    }
  }

  if (!parsed) {
    return NextResponse.json({ error: "Could not parse the marking result. Please try submitting again." }, { status: 502 });
  }

  const marksAwarded = Math.max(0, Math.min(maxMarks, Math.round(Number(parsed.marksAwarded) || 0)));
  const matchedPoints = Array.isArray(parsed.matchedPoints)
    ? parsed.matchedPoints.filter((p: unknown) => typeof p === "string")
    : [];
  const feedback = typeof parsed.feedback === "string" ? parsed.feedback : "";

  return NextResponse.json({ marksAwarded, maxMarks, matchedPoints, feedback });
}

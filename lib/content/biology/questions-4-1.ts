import type { ExamQuestion } from "@/lib/types";

/**
 * AQA GCSE Biology — exam-style questions for 4.1.1 Cell structure.
 *
 * Every question is written to match the shape, command words and mark
 * weighting of real AQA GCSE Biology papers and CGP-style practice
 * questions (tick-one-box multiple choice, "give"/"state"/"describe"/
 * "explain" structured questions, and calculation questions using the
 * exact magnification formula AQA gives on the paper) — but no wording is
 * copied from any published source. All content is grounded in, and
 * traceable to, the existing 4.1.1 study notes
 * (lib/content/biology/topic-4-1.tsx) — no facts appear here that aren't
 * already taught there.
 *
 * Marking model:
 * - Multiple-choice parts have a single correct option and are marked
 *   instantly, client-side — there's nothing ambiguous to grade, and it
 *   avoids spending an AI call on a question with one right answer.
 * - Free-response parts (the majority) are marked by an AI examiner via
 *   POST /api/mark-answer (Groq, llama-3.3-70b-versatile), which is given
 *   the exact mark scheme below and told to award marks point-by-point,
 *   the way a real AQA examiner does — not all-or-nothing.
 *
 * Question design, and why it's built this way:
 * - Every mark scheme is written as separately-awardable points (AQA's
 *   own convention), which is what lets partial credit work honestly
 *   instead of collapsing every answer to right/wrong.
 * - Grade bands (4-6 / 6-7 / 7-9) are attached per question, the same
 *   convention CGP uses, so revision can be aimed at a specific target
 *   grade rather than worked through in a flat, undifferentiated list.
 * - Command words are used precisely (state/give = brief recall, describe
 *   = give detail without reasoning, explain = give reasons/mechanism) —
 *   AQA examiner reports consistently cite command-word misreading as a
 *   major cause of lost marks, so drilling the distinction here (not just
 *   the biology) is itself part of the learning goal.
 * - Interleaved sub-points: like the flashcard deck, questions aren't
 *   meant to be worked strictly in spec order — mixing sub-points in a
 *   practice session (via the topic/grade-band filters) supports better
 *   long-term retention than one massed block per sub-point.
 */
export const topic41Questions: ExamQuestion[] = [
  {
    id: "4.1.1.1-Q1",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    gradeBand: "4-6",
    assessmentObjective: "AO1",
    tier: "Both",
    context:
      "Bacteria are single-celled prokaryotic organisms. Animal and plant cells are eukaryotic.",
    totalMarks: 4,
    parts: [
      {
        id: "4.1.1.1-Q1-a",
        label: "a)",
        prompt: "Which of the following is a prokaryotic cell? Tick one box.",
        type: "multiple-choice",
        marks: 1,
        options: ["Root hair cell", "Bacterium", "Sperm cell", "Nerve cell"],
        correctOption: 1,
      },
      {
        id: "4.1.1.1-Q1-b",
        label: "b)",
        prompt: "State one difference between the genetic material of a eukaryotic cell and a prokaryotic cell.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Eukaryotic cell: genetic material is enclosed within a nucleus.", marks: 1 },
          { point: "Prokaryotic cell: genetic material is a single loop of DNA, free in the cytoplasm (not enclosed in a nucleus).", marks: 1 },
        ],
        modelAnswer:
          "In a eukaryotic cell the genetic material is enclosed within a nucleus. In a prokaryotic cell, the genetic material is a single loop of DNA that floats freely in the cytoplasm — it isn't enclosed in a nucleus.",
      },
      {
        id: "4.1.1.1-Q1-c",
        label: "c)",
        prompt: "Name the small rings of DNA that may be found in a prokaryotic cell, in addition to its main loop of DNA.",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "Plasmids.", marks: 1 }],
        modelAnswer: "Plasmids.",
      },
    ],
    examTip:
      "In multiple choice questions, tick exactly one box — an examiner can't award a mark if two boxes are ticked, even if one of them is correct.",
  },
  {
    id: "4.1.1.1-Q2",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    gradeBand: "6-7",
    assessmentObjective: "AO2",
    tier: "Both",
    context: "A eukaryotic cell has a diameter of 40 μm. A prokaryotic cell has a diameter of 2 μm.",
    totalMarks: 4,
    parts: [
      {
        id: "4.1.1.1-Q2-a",
        label: "a)",
        prompt: "Calculate how many times larger the eukaryotic cell is than the prokaryotic cell.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Correct method shown: 40 ÷ 2.", marks: 1 },
          { point: "Correct answer: 20 (times larger).", marks: 1 },
        ],
        modelAnswer: "40 ÷ 2 = 20. The eukaryotic cell is 20 times larger.",
      },
      {
        id: "4.1.1.1-Q2-b",
        label: "b)",
        prompt: "A bacterium has a length of 0.0015 mm. Write this in standard form.",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "1.5 × 10⁻³ mm.", marks: 1 }],
        modelAnswer: "1.5 × 10⁻³ mm",
      },
      {
        id: "4.1.1.1-Q2-c",
        label: "c)",
        prompt: "Give one difference between prokaryotic and eukaryotic cells, other than their size.",
        type: "free-response",
        marks: 1,
        markScheme: [
          {
            point:
              "Any valid structural difference, e.g. a prokaryotic cell's genetic material is not enclosed in a nucleus, or prokaryotic cells may contain plasmids and eukaryotic cells do not.",
            marks: 1,
          },
        ],
        modelAnswer: "A prokaryotic cell's genetic material is not enclosed in a nucleus, unlike a eukaryotic cell's.",
      },
    ],
    examTip:
      "Keep a close eye on units in calculation questions. If the question gives you mixed units (μm and mm), convert to the same unit before you calculate anything.",
  },
  {
    id: "4.1.1.2-Q1",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    gradeBand: "4-6",
    assessmentObjective: "AO1",
    tier: "Both",
    context:
      "Figure 1 shows a simple diagram of an animal cell with three unlabelled structures: one containing the cell's genetic material, one controlling which substances move in and out, and one where most of the cell's chemical reactions take place.",
    totalMarks: 7,
    parts: [
      {
        id: "4.1.1.2-Q1-a",
        label: "a)",
        prompt: "Give the function of the cell membrane.",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "Controls what substances move in and out of the cell (and holds the cell together).", marks: 1 }],
        modelAnswer: "It controls what substances move in and out of the cell, and holds the cell together.",
      },
      {
        id: "4.1.1.2-Q1-b",
        label: "b)",
        prompt: "Give the function of the cytoplasm.",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "Gel-like substance where most of the cell's chemical reactions take place, controlled by enzymes.", marks: 1 }],
        modelAnswer: "It's a gel-like substance where most of the cell's chemical reactions happen, controlled by enzymes.",
      },
      {
        id: "4.1.1.2-Q1-c",
        label: "c)",
        prompt: "Give the function of the nucleus.",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "Contains the cell's genetic material (DNA), which controls the cell's activities.", marks: 1 }],
        modelAnswer: "It contains the cell's genetic material (DNA), which controls the cell's activities.",
      },
      {
        id: "4.1.1.2-Q1-d",
        label: "d)",
        prompt:
          "Name two other subcellular structures found in an animal cell (other than the nucleus, cytoplasm and cell membrane), and describe the function of each.",
        type: "free-response",
        marks: 4,
        markScheme: [
          { point: "First structure correctly named (mitochondria or ribosomes).", marks: 1 },
          { point: "Correct function given for the first structure.", marks: 1 },
          { point: "Second structure correctly named (the other of mitochondria / ribosomes).", marks: 1 },
          { point: "Correct function given for the second structure.", marks: 1 },
        ],
        modelAnswer:
          "Mitochondria — the site of most reactions in aerobic respiration, which transfers the energy the cell needs. Ribosomes — where proteins are made (synthesised).",
      },
    ],
    examTip:
      "If a question asks you to label a diagram, draw your label lines carefully — if it isn't clear which part of the diagram the line is pointing to, you could lose the mark even if the label itself is correct.",
  },
  {
    id: "4.1.1.2-Q2",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    gradeBand: "6-7",
    assessmentObjective: "AO2",
    tier: "Both",
    context: "A student draws a cell showing only a nucleus, cytoplasm and cell membrane, and says this represents a plant cell.",
    totalMarks: 6,
    parts: [
      {
        id: "4.1.1.2-Q2-a",
        label: "a)",
        prompt: "Give one reason why this diagram does not represent a plant cell.",
        type: "free-response",
        marks: 1,
        markScheme: [
          {
            point: "It is missing a plant-specific structure — e.g. no chloroplasts shown, or no permanent vacuole shown, or no cell wall shown (any one).",
            marks: 1,
          },
        ],
        modelAnswer: "It doesn't show a cell wall, chloroplasts or a permanent vacuole, which plant cells have.",
      },
      {
        id: "4.1.1.2-Q2-b",
        label: "b)",
        prompt: "Describe the function of chloroplasts.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "They are the site of photosynthesis.", marks: 1 },
          { point: "They contain chlorophyll, which absorbs the light needed for photosynthesis.", marks: 1 },
        ],
        modelAnswer:
          "Chloroplasts are the site of photosynthesis. They contain the green pigment chlorophyll, which absorbs the light needed for photosynthesis.",
      },
      {
        id: "4.1.1.2-Q2-c",
        label: "c)",
        prompt: "What is contained in a plant cell's permanent vacuole?",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "Cell sap — a weak solution of sugars and salts.", marks: 1 }],
        modelAnswer: "Cell sap — a weak solution of sugars and salts.",
      },
      {
        id: "4.1.1.2-Q2-d",
        label: "d)",
        prompt: "What is the plant cell wall made of, and what is its function?",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Made of cellulose.", marks: 1 },
          { point: "Strengthens and supports the cell.", marks: 1 },
        ],
        modelAnswer: "It's made of cellulose. It strengthens and supports the cell.",
      },
    ],
    examTip:
      "A common mistake is listing only chloroplasts, the vacuole and the cell wall for a plant cell — remember plant cells also have a nucleus, cytoplasm, cell membrane, mitochondria and ribosomes, exactly like animal cells.",
  },
  {
    id: "4.1.1.3-Q1",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    gradeBand: "4-6",
    assessmentObjective: "AO1",
    tier: "Both",
    totalMarks: 1,
    parts: [
      {
        id: "4.1.1.3-Q1-a",
        prompt:
          "As an organism develops, some of its cells develop specific structures and become adapted to carry out a particular job. What is this process called? Tick one box.",
        type: "multiple-choice",
        marks: 1,
        options: ["Mitosis", "Adaptation", "Differentiation", "Specialisation"],
        correctOption: 2,
      },
    ],
  },
  {
    id: "4.1.1.3-Q2",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    gradeBand: "6-7",
    assessmentObjective: "AO2",
    tier: "Both",
    context:
      "A sperm cell has a long tail, a streamlined head, many mitochondria packed around its middle section, and enzymes stored in its head.",
    totalMarks: 5,
    parts: [
      {
        id: "4.1.1.3-Q2-a",
        label: "a)",
        prompt: "State the function of a sperm cell.",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "Delivers (male) DNA to the egg cell (female DNA).", marks: 1 }],
        modelAnswer: "It delivers male DNA to the female DNA in the egg cell.",
      },
      {
        id: "4.1.1.3-Q2-b",
        label: "b)",
        prompt:
          "Explain how the structure of a sperm cell helps it carry out its function. Refer to at least three adaptations described above.",
        type: "free-response",
        marks: 4,
        markScheme: [
          { point: "Long tail — allows the cell to swim towards the egg cell.", marks: 1 },
          { point: "Streamlined head — reduces resistance/drag, helping it move efficiently towards the egg.", marks: 1 },
          { point: "Many mitochondria — release the energy needed for the tail to move / for the journey to the egg.", marks: 1 },
          { point: "Enzymes in the head — digest/break down the outer layers of the egg cell, allowing fertilisation.", marks: 1 },
        ],
        modelAnswer:
          "Its long tail lets it swim to the egg cell. Its streamlined head reduces drag as it swims. Its many mitochondria release the energy needed for the tail to keep moving on the journey. The enzymes stored in its head digest through the outer layers of the egg cell, allowing fertilisation to happen.",
      },
    ],
  },
  {
    id: "4.1.1.3-Q3",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    gradeBand: "6-7",
    assessmentObjective: "AO2",
    tier: "Both",
    totalMarks: 4,
    parts: [
      {
        id: "4.1.1.3-Q3-a",
        label: "a)",
        prompt: "Explain why nerve cells are long, with branched connections at each end.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Long — allows electrical impulses to be carried over a distance.", marks: 1 },
          { point: "Branched connections — allow the cell to connect with other nerve cells / form a network.", marks: 1 },
        ],
        modelAnswer:
          "They're long so electrical impulses can be carried over a distance, and branched at each end so they can connect to other nerve cells and form a network.",
      },
      {
        id: "4.1.1.3-Q3-b",
        label: "b)",
        prompt: "Explain why muscle cells contain many mitochondria.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Muscle cells need to contract, which requires energy.", marks: 1 },
          { point: "Mitochondria release the energy (via aerobic respiration) needed for contraction.", marks: 1 },
        ],
        modelAnswer:
          "Muscle cells contract, which needs energy. Mitochondria release the energy needed for that contraction through aerobic respiration.",
      },
    ],
  },
  {
    id: "4.1.1.3-Q4",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    gradeBand: "6-7",
    assessmentObjective: "AO2",
    tier: "Both",
    totalMarks: 6,
    parts: [
      {
        id: "4.1.1.3-Q4-a",
        label: "a)",
        prompt: "Explain how the structure of a root hair cell is adapted to its function.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Function: absorbs water and mineral ions from the soil.", marks: 1 },
          { point: "It has a long hair-like projection, which increases its surface area for absorption.", marks: 1 },
        ],
        modelAnswer:
          "Root hair cells absorb water and mineral ions from the soil. Their long hair-like projection increases their surface area, improving absorption.",
      },
      {
        id: "4.1.1.3-Q4-b",
        label: "b)",
        prompt: "Explain how the structure of xylem cells is adapted for transporting water.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Cells form a hollow tube.", marks: 1 },
          { point: "Cells are joined end to end, allowing water to flow through easily.", marks: 1 },
        ],
        modelAnswer: "Xylem cells form a hollow tube, and are joined end to end, so water can flow through them easily.",
      },
      {
        id: "4.1.1.3-Q4-c",
        label: "c)",
        prompt: "Explain how the structure of phloem cells is adapted for transporting dissolved food substances.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Cells form a tube, joined end to end.", marks: 1 },
          { point: "Have very few internal subcellular structures, allowing substances to flow through easily.", marks: 1 },
        ],
        modelAnswer:
          "Phloem cells form a tube, joined end to end, with very few internal subcellular structures, so dissolved food substances can flow through them easily.",
      },
    ],
  },
  {
    id: "4.1.1.4-Q1",
    topicCode: "4.1",
    subpoint: "4.1.1.4",
    gradeBand: "4-6",
    assessmentObjective: "AO1",
    tier: "Both",
    totalMarks: 4,
    parts: [
      {
        id: "4.1.1.4-Q1-a",
        label: "a)",
        prompt: "Define differentiation.",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "The process by which a cell changes to become specialised for its function.", marks: 1 }],
        modelAnswer: "The process by which a cell changes to become specialised to carry out a specific function.",
      },
      {
        id: "4.1.1.4-Q1-b",
        label: "b)",
        prompt: "Compare the ability of plant cells and animal cells to differentiate.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Most animal cells lose the ability to differentiate at an early stage of development.", marks: 1 },
          { point: "Most plant cells keep the ability to differentiate throughout the plant's life.", marks: 1 },
        ],
        modelAnswer:
          "Most animal cells lose the ability to differentiate early in development, whereas most plant cells keep this ability throughout the plant's life.",
      },
      {
        id: "4.1.1.4-Q1-c",
        label: "c)",
        prompt: "What is the main purpose of cell division in a mature (fully grown) animal?",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "Repair and replacement of damaged or worn-out cells (not growth).", marks: 1 }],
        modelAnswer: "Repair and replacement of damaged or worn-out cells.",
      },
    ],
    examTip: "Don't confuse differentiation with division — differentiation is a cell becoming specialised, not a cell splitting into two.",
  },
  {
    id: "4.1.1.5-Q1",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    gradeBand: "4-6",
    assessmentObjective: "AO1",
    tier: "Both",
    totalMarks: 5,
    parts: [
      {
        id: "4.1.1.5-Q1-a",
        label: "a)",
        prompt: "Which type of microscope uses beams of electrons, rather than light, to produce an image? Tick one box.",
        type: "multiple-choice",
        marks: 1,
        options: ["Light microscope", "Electron microscope", "Laser microscope", "Digital microscope"],
        correctOption: 1,
      },
      {
        id: "4.1.1.5-Q1-b",
        label: "b)",
        prompt: "Define the resolution of a microscope.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "How well a microscope can distinguish between two points that are very close together.", marks: 1 },
          { point: "Higher resolution gives a sharper, more detailed image.", marks: 1 },
        ],
        modelAnswer:
          "Resolution is how well a microscope can distinguish between two points that are very close together — higher resolution gives a sharper, more detailed image.",
      },
      {
        id: "4.1.1.5-Q1-c",
        label: "c)",
        prompt: "Give two advantages of using an electron microscope instead of a light microscope.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Higher magnification.", marks: 1 },
          { point: "Higher resolution.", marks: 1 },
        ],
        modelAnswer: "Electron microscopes have both a higher magnification and a higher resolution than light microscopes.",
      },
    ],
  },
  {
    id: "4.1.1.5-Q2",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    gradeBand: "4-6",
    assessmentObjective: "AO2",
    tier: "Both",
    context: "A student draws a cell. The drawing has an image width of 24 mm. The real width of the cell is 30 μm.",
    totalMarks: 2,
    parts: [
      {
        id: "4.1.1.5-Q2-a",
        label: "a)",
        prompt: "Calculate the magnification of the drawing. Use: magnification = size of image ÷ size of real object.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Correctly converts to the same unit, e.g. 24 mm = 24,000 μm.", marks: 1 },
          { point: "Correct final answer: ×800.", marks: 1 },
        ],
        modelAnswer: "24 mm = 24,000 μm. Magnification = 24,000 ÷ 30 = ×800.",
      },
    ],
    examTip: "Keep a close eye on units in calculation questions — check what unit values are given in, and what unit the answer needs to be in.",
  },
  {
    id: "4.1.1.5-Q3",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    gradeBand: "6-7",
    assessmentObjective: "AO2",
    tier: "Both",
    context: "A plant cell is magnified ×1500 using a light microscope. The image length is 9 mm.",
    totalMarks: 3,
    parts: [
      {
        id: "4.1.1.5-Q3-a",
        label: "a)",
        prompt: "Calculate the actual length of the cell in millimetres.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Correct method: real size = image size ÷ magnification (9 ÷ 1500).", marks: 1 },
          { point: "Correct answer: 0.006 mm.", marks: 1 },
        ],
        modelAnswer: "Real size = 9 ÷ 1500 = 0.006 mm.",
      },
      {
        id: "4.1.1.5-Q3-b",
        label: "b)",
        prompt: "Give the length of the cell in micrometres (μm).",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "6 μm (following correctly from part a — allow error carried forward).", marks: 1 }],
        modelAnswer: "0.006 × 1000 = 6 μm.",
      },
    ],
  },
  {
    id: "4.1.1.5-Q4",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    gradeBand: "7-9",
    assessmentObjective: "AO2",
    tier: "Both",
    context: "A red blood cell has a real diameter of approximately 0.008 mm.",
    totalMarks: 3,
    parts: [
      {
        id: "4.1.1.5-Q4-a",
        label: "a)",
        prompt: "Write 0.008 mm in standard form.",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "8 × 10⁻³ mm.", marks: 1 }],
        modelAnswer: "8 × 10⁻³ mm",
      },
      {
        id: "4.1.1.5-Q4-b",
        label: "b)",
        prompt: "The cell is viewed under a microscope at a magnification of ×600. Calculate the size of the image in mm.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Correct method: size of image = magnification × size of real object (600 × 0.008).", marks: 1 },
          { point: "Correct answer: 4.8 mm.", marks: 1 },
        ],
        modelAnswer: "600 × 0.008 = 4.8 mm.",
      },
    ],
  },
  {
    id: "4.1.1.5-Q5",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    gradeBand: "7-9",
    assessmentObjective: "AO3",
    tier: "Both",
    totalMarks: 4,
    parts: [
      {
        id: "4.1.1.5-Q5-a",
        prompt: "Explain how the development of electron microscopy has improved scientific understanding of subcellular structures.",
        type: "free-response",
        marks: 4,
        markScheme: [
          { point: "Electron microscopes have much higher magnification than light microscopes.", marks: 1 },
          { point: "Electron microscopes have much higher resolution than light microscopes.", marks: 1 },
          {
            point:
              "This allows much smaller structures to be seen in far greater detail, e.g. the internal structure of mitochondria and chloroplasts, or tiny structures like ribosomes and plasmids.",
            marks: 1,
          },
          {
            point: "As a result, scientists' understanding of how these subcellular structures are adapted to carry out their functions has increased.",
            marks: 1,
          },
        ],
        modelAnswer:
          "Electron microscopes have a much higher magnification and resolution than light microscopes. This means much smaller structures — like the internal structure of mitochondria and chloroplasts, or tiny structures such as ribosomes and plasmids — can be seen in far greater detail. This has increased scientists' understanding of how these subcellular structures are adapted to their functions.",
      },
    ],
  },
  {
    id: "4.1.1.1-Q3",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    gradeBand: "6-7",
    assessmentObjective: "AO1",
    tier: "Both",
    totalMarks: 3,
    parts: [
      {
        id: "4.1.1.1-Q3-a",
        label: "a)",
        prompt: "Give two subcellular structures found in both eukaryotic animal cells and prokaryotic cells.",
        type: "free-response",
        marks: 2,
        markScheme: [
          { point: "Cytoplasm.", marks: 1 },
          { point: "Cell membrane.", marks: 1 },
        ],
        modelAnswer: "Cytoplasm and a cell membrane.",
      },
      {
        id: "4.1.1.1-Q3-b",
        label: "b)",
        prompt: "Name a structure found in both prokaryotic cells and plant cells, but not in animal cells.",
        type: "free-response",
        marks: 1,
        markScheme: [{ point: "Cell wall.", marks: 1 }],
        modelAnswer: "Cell wall.",
      },
    ],
  },
  {
    id: "4.1.1-QMIX",
    topicCode: "4.1",
    subpoint: "4.1.1",
    gradeBand: "4-6",
    assessmentObjective: "AO1",
    tier: "Both",
    context: "Quickfire recap — five short questions covering the whole of 4.1.1, mixed rather than grouped by sub-point.",
    totalMarks: 5,
    parts: [
      {
        id: "4.1.1-QMIX-a",
        label: "a)",
        prompt: "Which structure controls which substances move into and out of a cell? Tick one box.",
        type: "multiple-choice",
        marks: 1,
        options: ["Nucleus", "Cell membrane", "Cytoplasm", "Ribosome"],
        correctOption: 1,
      },
      {
        id: "4.1.1-QMIX-b",
        label: "b)",
        prompt: "Which structure is the site of protein synthesis in a cell? Tick one box.",
        type: "multiple-choice",
        marks: 1,
        options: ["Mitochondria", "Chloroplast", "Ribosomes", "Nucleus"],
        correctOption: 2,
      },
      {
        id: "4.1.1-QMIX-c",
        label: "c)",
        prompt: "What name is given to the process by which a cell becomes specialised for its function? Tick one box.",
        type: "multiple-choice",
        marks: 1,
        options: ["Division", "Respiration", "Differentiation", "Reproduction"],
        correctOption: 2,
      },
      {
        id: "4.1.1-QMIX-d",
        label: "d)",
        prompt: "Which unit is 1,000 times smaller than a micrometre (μm)? Tick one box.",
        type: "multiple-choice",
        marks: 1,
        options: ["Millimetre", "Centimetre", "Nanometre", "Metre"],
        correctOption: 2,
      },
      {
        id: "4.1.1-QMIX-e",
        label: "e)",
        prompt: "Which type of microscope has the higher resolution? Tick one box.",
        type: "multiple-choice",
        marks: 1,
        options: ["Light microscope", "Electron microscope"],
        correctOption: 1,
      },
    ],
  },
];

/** All question banks currently written, keyed by topic code — same
 *  lookup pattern as flashcardDecks in flashcards-4-1.ts. Add "4.2":
 *  topic42Questions, etc. once further topics are written. */
export const questionBanks: Record<string, ExamQuestion[]> = {
  "4.1": topic41Questions,
};

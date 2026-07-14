import type { Flashcard } from "@/lib/types";

/**
 * AQA GCSE Biology — flashcards for 4.1.1 Cell structure.
 *
 * Every card is derived directly from lib/content/biology/topic-4-1.tsx —
 * no new facts are introduced here that aren't already taught in the notes.
 *
 * Design rules followed when writing this deck (the evidence base for
 * "what makes a good flashcard" for GCSE-style recall):
 *
 * 1. Minimum information principle (Wozniak's 20 rules of formulating
 *    knowledge). Each card tests exactly one atomic fact. Lists (e.g. "the
 *    six specialised cells") are broken into one card per item rather than
 *    one card asking for the whole list — a partially-remembered list
 *    scores as a full miss under old-style cards, which is both
 *    discouraging and imprecise about what's actually not known yet.
 *
 * 2. Free recall over recognition. No multiple choice. Testing-effect
 *    research (Roediger & Karpicke) shows free recall produces
 *    substantially stronger long-term retention than recognition-based
 *    testing, even though recognition feels easier in the moment.
 *
 * 3. Two-directional recall for core vocabulary. Where AQA can ask a
 *    question either way ("what does the nucleus do?" vs "which structure
 *    contains the cell's DNA?"), both directions get a card, since only
 *    drilling one direction leaves a real exam-question blind spot.
 *
 * 4. Mixed card types, matched to the kind of knowledge:
 *    - definition:  vocabulary and structure/function recall
 *    - cloze:       exact wording that must be reproducible (formulae,
 *                   spec phrasing, common-mistake corrections)
 *    - application: structure-to-function reasoning, the actual skill
 *                   AQA six-mark and "explain" questions assess
 *    - comparison:  paired facts that are easy to muddle (eukaryote vs
 *                   prokaryote, light vs electron microscope)
 *    - calculation: the magnification formula, drilled with fresh numbers
 *                   so it isn't just memorised from the notes' worked
 *                   examples
 *
 * 5. Interleaved by default. Cards are NOT grouped by sub-point in this
 *    array's consumption order — the review session shuffles across all
 *    of 4.1.1 rather than blocking by sub-point, because interleaved
 *    practice produces better long-term retention and transfer than
 *    massed practice on one sub-point at a time (Rohrer & Taylor).
 */
export const topic41Flashcards: Flashcard[] = [
  // --- 4.1.1.1 Eukaryotes and prokaryotes -----------------------------
  {
    id: "4.1.1.1-01",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    type: "definition",
    front: "What is a eukaryotic cell?",
    back: "A cell that has its genetic material enclosed within a nucleus. All animal and plant cells are eukaryotic.",
  },
  {
    id: "4.1.1.1-02",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    type: "definition",
    front: "What is a prokaryotic cell?",
    back: "A cell that does not have its genetic material enclosed in a nucleus — e.g. a bacterium.",
  },
  {
    id: "4.1.1.1-03",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    type: "application",
    front: "Explain one way in which a prokaryotic cell differs from a eukaryotic cell.",
    back: "Its genetic material is not enclosed in a nucleus — it's a single loop of DNA free in the cytoplasm. (Prokaryotic cells are also much smaller.)",
  },
  {
    id: "4.1.1.1-04",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    type: "comparison",
    front: "Which type of cell is typically larger: eukaryotic or prokaryotic?",
    back: "Eukaryotic (roughly 10-100 μm) — prokaryotic cells are much smaller, roughly 0.1-5 μm.",
  },
  {
    id: "4.1.1.1-05",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    type: "definition",
    front: "What are plasmids?",
    back: "Small rings of DNA sometimes found in prokaryotic cells, separate from the main DNA loop.",
  },
  {
    id: "4.1.1.1-06",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    type: "cloze",
    front: "A prokaryotic cell's genetic material is a single loop of ___ that floats freely in the cytoplasm.",
    back: "DNA",
  },
  {
    id: "4.1.1.1-07",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    type: "calculation",
    front: "How many micrometres (μm) are there in 1 millimetre (mm)?",
    back: "1,000 μm",
  },
  {
    id: "4.1.1.1-08",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    type: "calculation",
    front: "How many nanometres (nm) are there in 1 micrometre (μm)?",
    back: "1,000 nm",
  },
  {
    id: "4.1.1.1-09",
    topicCode: "4.1",
    subpoint: "4.1.1.1",
    type: "calculation",
    front: "A red blood cell has a diameter of about 0.007 mm. Write this in standard form.",
    back: "7 × 10⁻³ mm",
  },

  // --- 4.1.1.2 Animal and plant cells ----------------------------------
  {
    id: "4.1.1.2-01",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "What is the function of the nucleus?",
    back: "Contains the cell's genetic material (DNA), which controls the cell's activities.",
  },
  {
    id: "4.1.1.2-02",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "Which structure contains a cell's genetic material and controls its activities?",
    back: "The nucleus.",
  },
  {
    id: "4.1.1.2-03",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "What is the function of the cell membrane?",
    back: "Controls what substances move in and out of the cell, and holds the cell together.",
  },
  {
    id: "4.1.1.2-04",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "What is the cytoplasm, and what happens there?",
    back: "A gel-like substance where most of the cell's chemical reactions take place, controlled by enzymes.",
  },
  {
    id: "4.1.1.2-05",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "What is the function of mitochondria?",
    back: "The site of most of the reactions in aerobic respiration, which transfers the energy the cell needs.",
  },
  {
    id: "4.1.1.2-06",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "Which structure is the site of most aerobic respiration reactions in a cell?",
    back: "Mitochondria.",
  },
  {
    id: "4.1.1.2-07",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "What is the function of ribosomes?",
    back: "Where proteins are made (synthesised).",
  },
  {
    id: "4.1.1.2-08",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "What is the function of chloroplasts?",
    back: "The site of photosynthesis. They contain chlorophyll, which absorbs the light needed for photosynthesis.",
  },
  {
    id: "4.1.1.2-09",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "What does a plant cell's permanent vacuole contain?",
    back: "Cell sap — a weak solution of sugars and salts.",
  },
  {
    id: "4.1.1.2-10",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "What is the plant cell wall made of, and what does it do?",
    back: "Made of cellulose. It strengthens and supports the cell.",
  },
  {
    id: "4.1.1.2-11",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "comparison",
    front: "True or false: plant cells don't have a nucleus, cytoplasm or cell membrane, since those are 'animal cell' structures.",
    back: "False — plant cells have all of those plus chloroplasts, a permanent vacuole and a cell wall. This mix-up is a common exam mistake.",
  },
  {
    id: "4.1.1.2-12",
    topicCode: "4.1",
    subpoint: "4.1.1.2",
    type: "definition",
    front: "What is the general term for the named, functional parts inside a cell (e.g. the nucleus, mitochondria)?",
    back: "Subcellular structures.",
  },

  // --- 4.1.1.3 Cell specialisation --------------------------------------
  {
    id: "4.1.1.3-01",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "definition",
    front: "What is the function of a sperm cell?",
    back: "Delivers male DNA to the female DNA (egg cell).",
  },
  {
    id: "4.1.1.3-02",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "application",
    front: "Why does a sperm cell have many mitochondria?",
    back: "To release the energy it needs for the journey to swim to the egg cell.",
  },
  {
    id: "4.1.1.3-03",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "definition",
    front: "What is the function of a nerve cell?",
    back: "Carries electrical impulses between different parts of the body.",
  },
  {
    id: "4.1.1.3-04",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "application",
    front: "Why are nerve cells long, with branched connections at each end?",
    back: "Long, to carry signals over distance; branched connections let it link up with other nerve cells and form a network.",
  },
  {
    id: "4.1.1.3-05",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "definition",
    front: "What is the function of a muscle cell?",
    back: "Contracts (shortens) quickly.",
  },
  {
    id: "4.1.1.3-06",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "application",
    front: "Why do muscle cells have many mitochondria?",
    back: "To release the energy needed for contraction.",
  },
  {
    id: "4.1.1.3-07",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "application",
    front: "Give one way a root hair cell is adapted to absorb water and mineral ions.",
    back: "It has a long hair-like projection, which increases its surface area for absorption.",
  },
  {
    id: "4.1.1.3-08",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "definition",
    front: "What is the function of a xylem cell?",
    back: "Transports water (and dissolved mineral ions) around the plant.",
  },
  {
    id: "4.1.1.3-09",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "application",
    front: "Describe two features of a xylem cell that suit it to transporting water.",
    back: "It forms a hollow tube, and its cells are joined end to end, so water can flow through easily.",
  },
  {
    id: "4.1.1.3-10",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "definition",
    front: "What is the function of a phloem cell?",
    back: "Transports dissolved food substances around the plant.",
  },
  {
    id: "4.1.1.3-11",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "application",
    front: "Why do phloem cells have very few internal subcellular structures?",
    back: "So dissolved food substances can flow through them easily.",
  },
  {
    id: "4.1.1.3-12",
    topicCode: "4.1",
    subpoint: "4.1.1.3",
    type: "definition",
    front: "What does it mean for a cell to be 'specialised'?",
    back: "It is adapted with a structure suited to carrying out one particular job.",
  },

  // --- 4.1.1.4 Cell differentiation -------------------------------------
  {
    id: "4.1.1.4-01",
    topicCode: "4.1",
    subpoint: "4.1.1.4",
    type: "definition",
    front: "Define differentiation.",
    back: "The process by which a cell changes to become specialised to carry out a specific function.",
  },
  {
    id: "4.1.1.4-02",
    topicCode: "4.1",
    subpoint: "4.1.1.4",
    type: "comparison",
    front: "How does the ability of plant cells to differentiate compare with animal cells?",
    back: "Most plant cells keep the ability to differentiate throughout life, whereas most animal cells lose it at an early stage of development.",
  },
  {
    id: "4.1.1.4-03",
    topicCode: "4.1",
    subpoint: "4.1.1.4",
    type: "application",
    front: "What is cell division mainly used for in mature (fully grown) animals?",
    back: "Repair and replacement of damaged or worn-out cells, rather than growth.",
  },
  {
    id: "4.1.1.4-04",
    topicCode: "4.1",
    subpoint: "4.1.1.4",
    type: "cloze",
    front: "Differentiation is a cell becoming ___ — not a cell splitting into two, which is division.",
    back: "specialised",
  },

  // --- 4.1.1.5 Microscopy -------------------------------------------------
  {
    id: "4.1.1.5-01",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "definition",
    front: "What is a light microscope, and what can it show?",
    back: "A microscope that uses light and lenses to produce a magnified image. It lets us see individual cells and larger subcellular structures, like the nucleus.",
  },
  {
    id: "4.1.1.5-02",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "definition",
    front: "What is an electron microscope, and how does it differ from a light microscope?",
    back: "A microscope that uses beams of electrons instead of light. It has much higher magnification and resolution than a light microscope.",
  },
  {
    id: "4.1.1.5-03",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "definition",
    front: "What is meant by the resolution of a microscope?",
    back: "How well it can distinguish between two points that are very close together — higher resolution gives a sharper, more detailed image.",
  },
  {
    id: "4.1.1.5-04",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "application",
    front: "Give two advantages of electron microscopes over light microscopes.",
    back: "Higher magnification and higher resolution, so much smaller structures (e.g. inside mitochondria, ribosomes, plasmids) can be seen in far greater detail.",
  },
  {
    id: "4.1.1.5-05",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "cloze",
    front: "magnification = size of image ÷ ___",
    back: "size of real object",
  },
  {
    id: "4.1.1.5-06",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "cloze",
    front: "size of image = magnification × ___",
    back: "size of real object",
  },
  {
    id: "4.1.1.5-07",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "cloze",
    front: "size of real object = size of image ÷ ___",
    back: "magnification",
  },
  {
    id: "4.1.1.5-08",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "calculation",
    front: "A cell has a real width of 25 μm. Its image measures 5 mm across. Calculate the magnification.",
    back: "Convert to the same unit: 5 mm = 5000 μm. Magnification = 5000 ÷ 25 = ×200.",
  },
  {
    id: "4.1.1.5-09",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "calculation",
    front: "A specimen is viewed at ×500 magnification. Its image measures 12 mm wide. Calculate the real width in μm.",
    back: "Real size = 12 ÷ 500 = 0.024 mm. Convert to μm: 0.024 × 1000 = 24 μm.",
  },
  {
    id: "4.1.1.5-10",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "cloze",
    front: "Before calculating magnification, always check the image size and real size are in the same ___.",
    back: "unit",
  },
  {
    id: "4.1.1.5-11",
    topicCode: "4.1",
    subpoint: "4.1.1.5",
    type: "definition",
    front: "What is standard form, and why is it used for cell measurements?",
    back: "A way of writing a number as a value between 1 and 10 multiplied by a power of 10 — used because cell measurements are often extremely small (e.g. 0.00025 mm = 2.5 × 10⁻⁴ mm).",
  },
];

/** All flashcard decks currently written, keyed by topic code. Only 4.1
 *  has content so far — add further entries here as more topics are
 *  written (e.g. "4.2": topic42Flashcards) and the flashcards pages will
 *  pick them up automatically. */
export const flashcardDecks: Record<string, Flashcard[]> = {
  "4.1": topic41Flashcards,
};

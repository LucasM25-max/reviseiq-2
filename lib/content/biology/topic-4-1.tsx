import React from "react";
import { Term } from "@/components/notes/Term";
import { DiagramPrompt } from "@/components/notes/DiagramPrompt";
import { DiagramImage } from "@/components/notes/DiagramImage";
import { Callout } from "@/components/notes/Callout";
import { SelfCheck } from "@/components/notes/SelfCheck";
import { NoteSection } from "@/components/notes/NoteSection";
import { DataTable } from "@/components/notes/DataTable";

/**
 * AQA GCSE Biology — 4.1.1 Cell structure.
 *
 * Source: AQA specification 4.1.1.1-4.1.1.5 (structure and sub-point order
 * followed exactly) and the equivalent CGP revision guide pages, matched
 * for depth. Specification statements and the magnification formula are
 * kept close to their original wording, as both are meant to be reused
 * directly; all explanatory content, examples and comparisons are original
 * phrasing, not copied from the textbook.
 *
 * Confirmed against the specification excerpt supplied: none of 4.1.1.1-
 * 4.1.1.5 is marked "HT only", so this whole sub-topic applies to both
 * Foundation and Higher tier.
 *
 * The required practical (microscopy) is deliberately not covered here —
 * see the separate Required Practicals module.
 */

const color = "#7C5CBF"; // topic 4.1 accent, matches lib/data/biologyTopics.ts

export function Topic41CellStructureNotes() {
  return (
    <div className="flex flex-col gap-12">
      {/* 4.1.1.1 */}
      <NoteSection id="4.1.1.1" number="4.1.1.1" title="Eukaryotes and prokaryotes" color={color}>
        <div className="text-sm text-slate leading-relaxed">
          All living organisms are made of cells. Cells fall into two types,
          depending on how their genetic material is arranged:{" "}
          <Term definition="A cell that has its genetic material enclosed within a nucleus.">
            eukaryotic
          </Term>{" "}
          and{" "}
          <Term definition="A cell that does not have its genetic material enclosed in a nucleus — e.g. a bacterium.">
            prokaryotic
          </Term>
          .
        </div>

        <ul className="list-disc pl-5 text-sm text-slate leading-relaxed space-y-2">
          <li>
            <strong className="text-graphite dark:text-paper">Eukaryotic cells</strong> are
            complex cells. All animal and plant cells are eukaryotic. They have a cell
            membrane, cytoplasm, and genetic material enclosed in a nucleus.
          </li>
          <li>
            <strong className="text-graphite dark:text-paper">Prokaryotic cells</strong> are
            much smaller and simpler than eukaryotic cells — bacteria are prokaryotes. A
            prokaryotic cell has cytoplasm and a cell membrane surrounded by a cell wall, but
            its genetic material isn't enclosed in a nucleus. Instead, it's a single loop of
            DNA that floats freely in the cytoplasm. Prokaryotic cells may also contain one or
            more small rings of DNA called{" "}
            <Term definition="Small rings of DNA found in prokaryotic cells, separate from the main DNA loop.">
              plasmids
            </Term>
            .
          </li>
        </ul>

        <DataTable
          headers={["", "Eukaryotic cell", "Prokaryotic cell"]}
          rows={[
            ["Typical size", "Larger — roughly 10-100 μm", "Much smaller — roughly 0.1-5 μm"],
            [
              "Genetic material",
              "Enclosed in a nucleus",
              "A single DNA loop, free in the cytoplasm (plus possible plasmids)",
            ],
            ["Examples", "Animal and plant cells", "Bacteria"],
          ]}
        />

        <Callout variant="maths" title="Maths skill — scale and size (MS 1b, 2a, 2h / WS 4.4)">
          <p>
            Cells are measured on a tiny scale, so their sizes are usually given in
            millimetres (mm), micrometres (μm) or nanometres (nm) rather than metres. You
            need to be able to convert between these units, make order-of-magnitude
            comparisons (e.g. "roughly ten times smaller than"), and express very small
            numbers using standard form.
          </p>
        </Callout>

        <DataTable
          headers={["Unit", "Symbol", "Relative to a metre"]}
          rows={[
            ["centimetre", "cm", "1 m = 100 cm"],
            ["millimetre", "mm", "1 m = 1,000 mm"],
            ["micrometre", "μm", "1 mm = 1,000 μm"],
            ["nanometre", "nm", "1 μm = 1,000 nm"],
          ]}
        />

        <Callout variant="mistake">
          <p>
            It's easy to mix these two up. Remember: eukaryotic = nucleus present (think "eu"
            as in "true" nucleus). Prokaryotic = no nucleus, just a loop of DNA free in the
            cytoplasm.
          </p>
        </Callout>

        <DiagramImage
          title="Diagram: prokaryotic cell (bacterium)"
          src="/images/biology/prokaryotic-cell-diagram.png"
          alt="Labelled diagram of a generalised prokaryotic (bacterial) cell in cross-section, showing the cell wall, cell membrane, cytoplasm, a single circular loop of DNA (nucleoid), and a plasmid."
        />

        <SelfCheck
          questions={[
            {
              q: "Explain one way in which a prokaryotic cell differs from a eukaryotic cell.",
              a: "Its genetic material is not enclosed in a nucleus — it's a single DNA loop free in the cytoplasm. (Prokaryotic cells are also much smaller.)",
            },
            {
              q: "A red blood cell has a diameter of about 0.007 mm. Write this in standard form.",
              a: "7 × 10⁻³ mm",
            },
            {
              q: "Name the small rings of DNA sometimes found in prokaryotic cells.",
              a: "Plasmids",
            },
          ]}
        />
      </NoteSection>

      {/* 4.1.1.2 */}
      <NoteSection id="4.1.1.2" number="4.1.1.2" title="Animal and plant cells" color={color}>
        <div className="text-sm text-slate leading-relaxed">
          The parts of a cell are called{" "}
          <Term definition="The named, functional parts inside a cell — e.g. the nucleus, mitochondria or ribosomes.">
            subcellular structures
          </Term>
          . Each one has a specific function that supports how the cell works.
        </div>

        <p className="text-sm font-medium text-graphite dark:text-paper -mb-1">
          Most animal cells have:
        </p>
        <DataTable
          headers={["Structure", "Function"]}
          rows={[
            [
              <Term key="n" definition="Contains the cell's genetic material (DNA), which controls the cell's activities.">
                Nucleus
              </Term>,
              "Contains the cell's genetic material (DNA), which controls the cell's activities.",
            ],
            [
              <Term key="c" definition="A gel-like substance where most chemical reactions happen, controlled by enzymes.">
                Cytoplasm
              </Term>,
              "A gel-like substance where most of the cell's chemical reactions take place, controlled by enzymes.",
            ],
            [
              <Term key="m" definition="Controls what moves in and out of the cell, and holds the cell together.">
                Cell membrane
              </Term>,
              "Controls what substances move in and out of the cell, and holds the cell together.",
            ],
            [
              <Term key="mi" definition="The site of most of the reactions in aerobic respiration, which transfers the energy the cell needs.">
                Mitochondria
              </Term>,
              "The site of most reactions in aerobic respiration, which transfers the energy the cell needs to function.",
            ],
            [
              <Term key="r" definition="Where proteins are made (synthesised) in the cell.">
                Ribosomes
              </Term>,
              "Where proteins are made (synthesised).",
            ],
          ]}
        />

        <p className="text-sm font-medium text-graphite dark:text-paper -mb-1">
          In addition to all of the above, plant cells often have:
        </p>
        <DataTable
          headers={["Structure", "Function"]}
          rows={[
            [
              <Term key="ch" definition="The site of photosynthesis. Contains chlorophyll, which absorbs light for photosynthesis.">
                Chloroplasts
              </Term>,
              "The site of photosynthesis, which makes food for the plant. Contains the green pigment chlorophyll, which absorbs the light needed for photosynthesis.",
            ],
            [
              <Term key="v" definition="Contains cell sap — a weak solution of sugars and salts.">
                Permanent vacuole
              </Term>,
              "Contains cell sap — a weak solution of sugars and salts.",
            ],
            [
              <Term key="cw" definition="A rigid layer made of cellulose that strengthens and supports the cell.">
                Cell wall
              </Term>,
              "Made of cellulose. Strengthens and supports the cell. (Plant and algal cells both have one.)",
            ],
          ]}
        />

        <Callout variant="mistake">
          <p>
            A common slip is listing only the "extra" plant structures (chloroplasts,
            vacuole, cell wall) and forgetting that plant cells also have a nucleus,
            cytoplasm, cell membrane, mitochondria and ribosomes — exactly like animal cells.
          </p>
        </Callout>

        <div className="text-sm text-slate leading-relaxed">
          <span className="font-medium text-graphite dark:text-paper">WS 1.2: </span>
          You should be able to recognise, draw and interpret images of cells — including
          comparing your own drawings against photographs, videos or micrographs, and using
          estimation to judge the relative size of subcellular structures.
        </div>

        <DiagramPrompt
          title="Diagram: animal cell"
          prompt="A clean, flat vector-style scientific diagram of a generalised animal cell, cross-section view. Labelled parts: nucleus, cytoplasm, cell membrane, mitochondria (several small oval shapes), ribosomes (small dots). Simple textbook-style labelling with thin leader lines, muted educational colour palette, no shading, no photorealistic texture, no background."
        />
        <DiagramPrompt
          title="Diagram: plant cell"
          prompt="A clean, flat vector-style scientific diagram of a generalised plant cell, cross-section view. Labelled parts: nucleus, cytoplasm, cell membrane, mitochondria, ribosomes, chloroplasts (green ovals), permanent vacuole (large central shape), cell wall (thick outer border outside the cell membrane). Simple textbook-style labelling with thin leader lines, muted educational colour palette, no shading, no photorealistic texture, no background."
        />

        <SelfCheck
          questions={[
            {
              q: "Name three subcellular structures found in both animal and plant cells.",
              a: "Any three of: nucleus, cytoplasm, cell membrane, mitochondria, ribosomes.",
            },
            {
              q: "Describe the function of the chloroplasts.",
              a: "They're the site of photosynthesis and contain chlorophyll, which absorbs the light needed for photosynthesis.",
            },
            {
              q: "What is contained inside a plant cell's permanent vacuole?",
              a: "Cell sap — a weak solution of sugars and salts.",
            },
          ]}
        />
      </NoteSection>

      {/* 4.1.1.3 */}
      <NoteSection id="4.1.1.3" number="4.1.1.3" title="Cell specialisation" color={color}>
        <div className="text-sm text-slate leading-relaxed">
          Cells can become{" "}
          <Term definition="Adapted with a structure suited to carrying out one particular job.">
            specialised
          </Term>{" "}
          to carry out a particular function. The structure of a specialised cell relates
          directly to that function within a tissue, organ, organ system, or the whole
          organism.
        </div>

        <DataTable
          headers={["Specialised cell", "Function", "Adaptations"]}
          rows={[
            [
              "Sperm cell",
              "Delivers male DNA to the female DNA (egg cell).",
              "A long tail and streamlined head to help it swim to the egg; many mitochondria to release the energy needed for the journey.",
            ],
            [
              "Nerve cell",
              "Carries electrical impulses between different parts of the body.",
              "Long, to carry signals over distance; branched connections at each end so it can link up with other nerve cells and form a network.",
            ],
            [
              "Muscle cell",
              "Contracts (shortens) quickly.",
              "Long, giving it room to contract; many mitochondria to release the energy needed for contraction.",
            ],
            [
              "Root hair cell",
              "Absorbs water and mineral ions from the soil.",
              "A long hair-like projection that increases surface area, improving absorption.",
            ],
            [
              "Xylem cell",
              "Transports water (and dissolved mineral ions) around the plant.",
              "Forms a hollow tube; cells are joined end to end so water can flow through easily.",
            ],
            [
              "Phloem cell",
              "Transports dissolved food substances around the plant.",
              "Forms a tube; cells joined end to end with very few internal subcellular structures, so substances can flow through easily.",
            ],
          ]}
        />

        <DiagramPrompt
          title="Diagram: six specialised cells"
          prompt="A clean, flat vector-style scientific illustration showing six labelled specialised cells side by side in a simple grid: a sperm cell (oval head, long tail), a nerve cell (star-shaped body with a long branching fibre), a muscle cell (long thin fibre), a root hair cell (cell body with a long thin hair-like projection), a xylem cell (hollow tube segment) and a phloem cell (tube segment with small internal dots). Each cell labelled with its name underneath. Simple textbook-style, muted educational colour palette, no shading, no photorealistic texture, no background."
        />

        <SelfCheck
          questions={[
            {
              q: "Explain how the structure of a sperm cell relates to its function.",
              a: "Its long tail and streamlined head help it swim to the egg, and its many mitochondria release the energy it needs for the journey.",
            },
            {
              q: "Give one way a root hair cell is adapted to absorb water and mineral ions.",
              a: "It has a long hair-like projection, which increases its surface area for absorption.",
            },
            {
              q: "Describe two features of a xylem cell that suit it to transporting water.",
              a: "It forms a hollow tube, and its cells are joined end to end, so water can flow through easily.",
            },
          ]}
        />
      </NoteSection>

      {/* 4.1.1.4 */}
      <NoteSection id="4.1.1.4" number="4.1.1.4" title="Cell differentiation" color={color}>
        <div className="text-sm text-slate leading-relaxed">
          <Term definition="The process by which a cell changes to become specialised for its function.">
            Differentiation
          </Term>{" "}
          is the process by which a cell changes to become specialised for its function. As a
          cell differentiates, it develops the subcellular structures it needs to do its job —
          this is what makes it a specialised cell.
        </div>

        <ul className="list-disc pl-5 text-sm text-slate leading-relaxed space-y-2">
          <li>Most differentiation takes place as an organism develops.</li>
          <li>
            In most types of animal cell, the ability to differentiate is lost at an early
            stage of development. Many types of plant cell, by contrast, keep the ability to
            differentiate throughout the plant's life.
          </li>
          <li>
            In mature (fully grown) animals, cell division is mainly restricted to repair and
            replacement of damaged or worn-out cells, rather than growth.
          </li>
        </ul>

        <Callout variant="mistake">
          <p>
            Don't confuse differentiation with division — differentiation is about a cell
            changing to become specialised, not about a cell splitting into two.
          </p>
        </Callout>

        <SelfCheck
          questions={[
            { q: "Define differentiation.", a: "The process by which a cell changes to become specialised to carry out a specific function." },
            {
              q: "How does the ability of plant cells to differentiate compare with that of animal cells?",
              a: "Most plant cells keep the ability to differentiate throughout life, whereas most animal cells lose it at an early stage of development.",
            },
            {
              q: "What is cell division mainly used for in mature animals?",
              a: "Repair and replacement of damaged or worn-out cells.",
            },
          ]}
        />
      </NoteSection>

      {/* 4.1.1.5 */}
      <NoteSection id="4.1.1.5" number="4.1.1.5" title="Microscopy" color={color}>
        <div className="text-sm text-slate leading-relaxed">
          Microscopy techniques have developed considerably as technology and scientific
          understanding have improved.
        </div>

        <ul className="list-disc pl-5 text-sm text-slate leading-relaxed space-y-2">
          <li>
            <Term definition="A microscope that uses light and lenses to produce a magnified image.">
              Light microscopes
            </Term>{" "}
            use light and lenses to produce a magnified image of a specimen. They let us see
            individual cells and larger subcellular structures, such as the nucleus.
          </li>
          <li>
            <Term definition="A microscope that uses beams of electrons instead of light, giving much higher magnification and resolution.">
              Electron microscopes
            </Term>{" "}
            use beams of electrons rather than light. They have a much higher magnification
            and{" "}
            <Term definition="How well a microscope can distinguish between two points that are very close together. Higher resolution gives a sharper, more detailed image.">
              resolution
            </Term>{" "}
            than light microscopes.
          </li>
          <li>
            Because of this, electron microscopes let us see much smaller structures in far
            greater detail than light microscopes can — including the internal structure of
            mitochondria and chloroplasts, and even tiny structures like ribosomes and
            plasmids. This has greatly increased scientists' understanding of subcellular
            structures.
          </li>
        </ul>

        <Callout variant="maths" title="Magnification formula (MS 1a, 1b, 2h, 3b / WS 4.4)">
          <p className="font-mono text-graphite dark:text-paper">
            magnification = size of image ÷ size of real object
          </p>
          <p>Rearranged forms you may need:</p>
          <p className="font-mono text-graphite dark:text-paper">
            size of image = magnification × size of real object
          </p>
          <p className="font-mono text-graphite dark:text-paper">
            size of real object = size of image ÷ magnification
          </p>
        </Callout>

        <Callout variant="example" title="Worked example 1 — finding magnification">
          <p>
            A cell has a real width of 20 μm. Viewed under a microscope, its image measures 6
            mm across. Calculate the magnification used.
          </p>
          <p>1. Convert to the same unit: 6 mm = 6000 μm.</p>
          <p>2. magnification = image size ÷ real size = 6000 ÷ 20 = <strong>×300</strong></p>
        </Callout>

        <Callout variant="example" title="Worked example 2 — finding real size">
          <p>
            A specimen is viewed at a magnification of ×250. Its image measures 15 mm wide.
            Calculate the real width of the specimen in μm.
          </p>
          <p>1. Rearrange the formula: real size = image size ÷ magnification.</p>
          <p>2. real size = 15 ÷ 250 = 0.06 mm.</p>
          <p>3. Convert to μm: 0.06 × 1000 = <strong>60 μm</strong></p>
        </Callout>

        <div className="text-sm text-slate leading-relaxed">
          Because cell measurements are often extremely small, answers are sometimes best
          given in <Term definition="A way of writing numbers as a value between 1 and 10 multiplied by a power of 10 — useful for very large or very small numbers.">standard form</Term>{" "}
          — a number between 1 and 10 multiplied by a power of 10. E.g. 0.00025 mm = 2.5 ×
          10⁻⁴ mm.
        </div>

        <Callout variant="mistake">
          <p>
            The most common mistake in magnification questions is forgetting to convert
            measurements into the same unit before calculating. Always check the image size
            and real size are in the same unit first.
          </p>
        </Callout>

        <DiagramPrompt
          title="Diagram: light microscope vs electron microscope"
          prompt="A clean, flat vector-style side-by-side comparison diagram of a light microscope and an electron microscope, simple labelled illustrations of each instrument, with a caption under each: 'lower magnification, lower resolution' under the light microscope, and 'higher magnification, higher resolution' under the electron microscope. Muted educational colour palette, no shading, no photorealistic texture, no background."
        />

        <SelfCheck
          questions={[
            { q: "What is meant by the resolution of a microscope?", a: "How well it can distinguish between two points that are very close together — higher resolution gives a sharper image." },
            {
              q: "Give two advantages of electron microscopes over light microscopes.",
              a: "Higher magnification and higher resolution, so much smaller structures can be seen in more detail.",
            },
            {
              q: "A specimen has a real size of 0.05 mm and is viewed at ×400 magnification. Calculate the size of the image in mm.",
              a: "image size = magnification × real size = 400 × 0.05 = 20 mm",
            },
          ]}
        />
      </NoteSection>
    </div>
  );
}

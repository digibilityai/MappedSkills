import { Fit, Mark, NotPromised, Plate, PlateRow, Section, Statement, TLink } from '@/components/direction-c/primitives';

/**
 * UI REVAMP GATE 2 — DIRECTION C — homepage ACCOUNTABILITY, EVIDENCE and FIT.
 *
 * COPY: production `HomepageAccountability`, verbatim, in production order:
 * the boundary (h2), the evidence chapter (h2) and fit (h2), with every link.
 *
 * LIVE-2 / DEC-031: "We have no case studies to show you." is LOCKED copy and
 * is reproduced unchanged. The prototype withheld it pending an authorised
 * correction; the application may not change copy, so the contradiction with
 * /work remains exactly as it is in production and stays tracked as LIVE-2.
 * The prototype's Ameba case-study plate is NOT added: it is not homepage
 * content, and placing it under that headline would sharpen the
 * contradiction rather than resolve it.
 *
 * THE EVIDENCE PLATE: production's claim, method sentence and limitation
 * sentence, verbatim, set as Claim + Evidence/Method/Limitation (the Gate 1
 * proof taxonomy). The Evidence row is the 28-run field — one open mark per
 * run, none filled — with the conditionally approved key line (DEC-034
 * ruling 3), which is literally true here. NOT used, for accuracy: the
 * prototype's "Outcome: 15 of 28" row (not homepage content), its
 * "0 of 28 runs named MappedSkills" caption and "First-party · published ·
 * dated" status (new copy; no date is published on this page), and the
 * "How to read the marks" legend, whose "not measured / unattributed" entry
 * would mislabel the run marks, which mean "did not name us".
 */

const NOT_PROMISED = ['rankings', 'a position in AI answers', 'a number of enquiries', 'revenue', 'a return on spend'];

export function HomeBoundary() {
  return (
    <Section labelledBy="dc-h-bd">
      <h2 id="dc-h-bd" className="dc-label">
        What we are accountable for, and where that stops
      </h2>
      <div className="dc-g12 dc-gap-top-sm">
        <div className="dc-c-rev-side">
          <NotPromised label="we do not promise" items={NOT_PROMISED} closing="None of that is ours to control." />
        </div>
        <div className="dc-c-rev-main dc-ours">
          <h3 className="dc-statement dc-ours-h">
            <Mark state="owned" />
            <span>
              We are accountable for <span className="dc-k-named">the qualified enquiry.</span>
            </span>
          </h3>
          <p className="dc-lede" style={{ marginTop: 18 }}>
            Real, reachable, from a business context, with a stated need. What counts as one is published, and it
            is measured against a starting point we capture first.
          </p>
        </div>
      </div>
      <TLink href="/how-it-works" className="dc-gap-top-sm">
        See what can and cannot be attributed
      </TLink>
    </Section>
  );
}

export function HomeEvidence() {
  return (
    <Section id="proof" tone="paper" labelledBy="dc-h-proof">
      <div className="dc-g12">
        <div className="dc-c-main dc-stack-md">
          <h2 id="dc-h-proof" className="dc-label">
            What you can check before you commit
          </h2>
          <Statement>We have no case studies to show you.</Statement>
          <p className="dc-lede">
            Writing around that would be the first thing you should not trust us on. What we do have is published,
            dated and checkable.
          </p>
        </div>
      </div>

      <div className="dc-g12 dc-gap-top-sm">
        <div className="dc-p-claim dc-claim dc-stack-md">
          <p className="dc-label dc-claim-tag">
            <Mark state="named" />
            Claim
          </p>
          <Statement>
            We ran the test on ourselves, and <span className="dc-k-named">we were named in none of them.</span>
          </Statement>
          <TLink href="/how-it-works">The method, in full — including what cannot be attributed</TLink>
        </div>
        <Plate label="What the claim stands on" className="dc-p-plate">
          <PlateRow term="Evidence">
            <span className="dc-runs" aria-hidden="true">
              {Array.from({ length: 28 }).map((_, i) => (
                <i key={i} className="dc-mk open" />
              ))}
            </span>
            <span className="dc-runs-key">
              <Mark state="open" />
              One mark per run. A named run would be filled.
            </span>
          </PlateRow>
          <PlateRow term="Method">
            We asked four AI assistants for agencies like us, 28 times, on one day, from Pune, in English, signed
            out.
          </PlateRow>
          <PlateRow term="Limitation" limit>
            28 runs on one day, one location, signed out. Counts, not rates.{' '}
            <b>No confidence interval is claimed and none is available.</b> Two systems could not be tested at all —
            they are named as untested, and not characterised.
          </PlateRow>
        </Plate>
      </div>
    </Section>
  );
}

export function HomeFit() {
  return (
    <Section labelledBy="dc-h-fit">
      <h2 id="dc-h-fit" className="dc-label">
        Who this is built for
      </h2>
      <Fit
        works={
          <>
            A customer takes time to decide, one good enquiry is worth real money, and you are willing to let us
            measure the path properly. <b>That last one is not negotiable.</b>
          </>
        }
        poor={
          <>
            Demand has to be created from nothing, what you sell is bought on impulse or price alone, or you need
            the outcome guaranteed.
          </>
        }
      />
      <TLink href="/pricing" className="dc-gap-top-sm">
        What this costs, and what moves the number
      </TLink>
    </Section>
  );
}

import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import { committee } from '../data/conferenceData'

function CommitteePage() {
  return (
    <section className="section-space pt-10">
      <div className="content-grid space-y-10">
        <PageHero
          kicker="Committee"
          title="Leadership, conveners, and advisory experts behind SRES-26."
          description="The brochure committee structure includes chief patrons, patrons, conference leadership, conveners, organizing members, and a broad advisory committee."
        />

        <Reveal>
          <div className="glass-panel page-hero-band px-5 py-7 text-white sm:px-8 sm:py-8">
            <p className="text-sm uppercase tracking-[0.22em] text-teal-200">Chief Patrons</p>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {committee.chiefPatrons.map((person) => (
                <div key={person.name} className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-5">
                  <h3 className="font-display text-2xl sm:text-3xl">{person.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-200/78">{person.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card">
                <h3 className="font-display text-2xl text-slate-950 sm:text-3xl">Patrons</h3>
              <div className="mt-5 space-y-3">
                {committee.patrons.map((patron) => (
                  <div key={patron} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                    {patron}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-card">
              <h3 className="font-display text-2xl text-slate-950 sm:text-3xl">Conference Chair</h3>
              <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">{committee.conferenceChair}</p>
              <h3 className="mt-8 font-display text-2xl text-slate-950 sm:text-3xl">Conference Secretary</h3>
              <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">{committee.conferenceSecretary}</p>
              <h3 className="mt-8 font-display text-2xl text-slate-950 sm:text-3xl">Conveners</h3>
              <div className="mt-5 space-y-3">
                {committee.conveners.map((convener) => (
                  <div key={convener} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                    {convener}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="surface-card">
            <h3 className="font-display text-2xl text-slate-950 sm:text-3xl">Organizing Committee</h3>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {committee.organizingCommittee.map((member) => (
                <div key={member} className="rounded-2xl border border-slate-200 bg-white px-5 py-5 text-sm leading-7 text-slate-600">
                  {member}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="surface-card">
            <h3 className="font-display text-2xl text-slate-950 sm:text-3xl">Advisory Committee</h3>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {committee.advisoryCommittee.map((member) => (
                <div key={member} className="rounded-2xl border border-slate-200 bg-white px-5 py-5 text-sm leading-7 text-slate-600">
                  {member}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CommitteePage

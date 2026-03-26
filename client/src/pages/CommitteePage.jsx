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
          title="Academic leadership and execution teams behind CIVICON 2026."
          description="The conference committee combines institutional leadership, publication management, technical review oversight, and event delivery expertise."
        />

        <Reveal>
          <div className="glass-panel page-hero-band px-8 py-8 text-white">
            <p className="text-sm uppercase tracking-[0.22em] text-teal-200">{committee.chiefPatron.role}</p>
            <h3 className="mt-4 font-display text-4xl lg:text-5xl">{committee.chiefPatron.name}</h3>
            <p className="mt-4 text-slate-200/78">{committee.chiefPatron.detail}</p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card">
              <h3 className="font-display text-3xl text-slate-950">Patrons</h3>
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
              <h3 className="font-display text-3xl text-slate-950">Convener</h3>
              <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">{committee.convener}</p>
              <h3 className="mt-8 font-display text-3xl text-slate-950">Organizing Chairs</h3>
              <div className="mt-5 space-y-3">
                {committee.chairs.map((chair) => (
                  <div key={chair} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                    {chair}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="surface-card">
            <h3 className="font-display text-3xl text-slate-950">Committee Members</h3>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {committee.members.map((member) => (
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

import { ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import SurfaceCard from '../components/SurfaceCard'
import { speakers } from '../data/conferenceData'

function SpeakersPage() {
  return (
    <section className="section-space pt-10">
      <div className="content-grid">
        <Reveal>
          <SurfaceCard variant="glass" className="page-hero-band overflow-hidden px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <SectionHeader
              kicker="Keynote Speakers"
              title="Keynote speakers and featured invited talks will be announced soon."
              description="The conference themes, committees, submission guidelines, and important dates are already available. Keynote speaker details will be updated after final confirmation."
              light
            />
          </SurfaceCard>
        </Reveal>

        {speakers.length ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {speakers.map((speaker, index) => (
              <Reveal key={speaker.name} delay={index * 0.08}>
                <SurfaceCard as="article" variant="light" className="h-full overflow-hidden p-0">
                  <div className={`h-52 bg-gradient-to-br ${speaker.accent} p-5 sm:h-60 sm:p-6`}>
                    <div className="flex h-full items-end">
                      <div className="rounded-[26px] bg-white/18 p-4 text-5xl font-display text-white backdrop-blur-md sm:p-5 sm:text-6xl">
                        {speaker.name
                          .split(' ')
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join('')}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display text-slate-950 sm:text-2xl">{speaker.name}</h3>
                    <p className="mt-2 text-sm font-semibold text-teal-600">{speaker.designation}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{speaker.expertise}</p>
                    <a href={speaker.linkedin} target="_blank" rel="noreferrer" className="button-ghost mt-6 inline-flex">
                      <ExternalLink size={16} className="mr-2" />
                      LinkedIn
                    </a>
                  </div>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <SurfaceCard variant="dark" className="mt-12 overflow-hidden">
              <div className="grid min-h-[320px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="max-w-2xl">
                  <span className="section-kicker border-white/10 bg-white/8 text-teal-200">Keynote Speakers</span>
                  <h2 className="mt-5 font-display text-4xl text-white sm:text-5xl">Speakers to be announced</h2>
                  <p className="mt-5 text-base leading-8 text-slate-200/78">
                    This section will be updated once the keynote and invited speaker lineup is finalized by the organizing committee.
                  </p>
                </div>
                <div className="relative rounded-[28px] border border-white/10 bg-white/6 p-6">
                  <div className="glow-divider absolute left-6 right-6 top-10" />
                  <span className="grid-node left-6 top-9" />
                  <span className="grid-node left-1/2 top-9 -translate-x-1/2" />
                  <span className="grid-node right-6 top-9" />
                  <div className="pt-10 text-sm leading-8 text-slate-200/74">
                    Keynote slots will be announced after final expert confirmation and programme scheduling. The section is already structured to accommodate a high-visibility international speaker lineup.
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export default SpeakersPage

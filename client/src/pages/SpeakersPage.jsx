import { ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { speakers } from '../data/conferenceData'

function SpeakersPage() {
  return (
    <section className="section-space pt-10">
      <div className="content-grid">
        <Reveal>
          <div className="glass-panel page-hero-band overflow-hidden px-8 py-10 text-white lg:px-10 lg:py-12">
            <SectionHeader
              kicker="Keynote Speakers"
              title="Global thinkers shaping the next era of resilient civil infrastructure."
              description="Curated keynote sessions highlight advanced materials, smart infrastructure, sustainability, mobility, and engineering systems leadership."
              light
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {speakers.map((speaker, index) => (
            <Reveal key={speaker.name} delay={index * 0.08}>
              <article className="surface-card h-full overflow-hidden p-0">
                <div className={`h-60 bg-gradient-to-br ${speaker.accent} p-6`}>
                  <div className="flex h-full items-end">
                    <div className="rounded-[26px] bg-white/18 p-5 text-6xl font-display text-white backdrop-blur-md">
                      {speaker.name
                        .split(' ')
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join('')}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-display text-slate-950">{speaker.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-teal-600">{speaker.designation}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{speaker.expertise}</p>
                  <a href={speaker.linkedin} target="_blank" rel="noreferrer" className="button-ghost mt-6 inline-flex">
                    <ExternalLink size={16} className="mr-2" />
                    LinkedIn
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpeakersPage

import { ImageIcon } from 'lucide-react'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import SectionFrame from '../components/SectionFrame'
import SurfaceCard from '../components/SurfaceCard'
import { committee } from '../data/conferenceData'

const parseMember = (value) => {
  const [name, ...detailParts] = value.split(' - ')
  return {
    name,
    detail: detailParts.join(' - '),
  }
}

const getInitials = (name) =>
  name
    .replaceAll(/[^A-Za-z.\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

function LeadershipCard({ name, detail, cardClass, avatarClass }) {
  return (
    <div className={`${cardClass} flex flex-col gap-4 sm:flex-row sm:items-start`}>
      <div className={`${avatarClass} shrink-0`}>
        <div className="portrait-initials">{getInitials(name)}</div>
        <div className="portrait-frame" />
        <ImageIcon size={26} strokeWidth={1.8} />
        <span className="portrait-label">Photo Placeholder</span>
      </div>
      <div>
        <h3 className="font-display text-2xl text-slate-950 sm:text-3xl">{name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{detail}</p>
      </div>
    </div>
  )
}

function CommitteePage() {
  const patronCards = committee.patrons.map(parseMember)
  const chair = parseMember(committee.conferenceChair)
  const secretary = parseMember(committee.conferenceSecretary)
  const convenerCards = committee.conveners.map(parseMember)

  return (
    <section className="section-space pt-10">
      <div className="content-grid space-y-10">
        <PageHero
          kicker="Committee"
          title="Leadership, conveners, and advisory experts behind SRES-26."
          description="The brochure committee structure includes chief patrons, patrons, conference leadership, conveners, organizing members, and a broad advisory committee."
        />

        <Reveal>
          <SurfaceCard variant="glass" className="page-hero-band engineering-panel relative overflow-hidden px-5 py-7 text-white sm:px-8 sm:py-8">
            <div className="pointer-events-none absolute inset-0 hero-grid-overlay opacity-30" />
            <p className="text-sm uppercase tracking-[0.22em] text-teal-200">Chief Patrons</p>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {committee.chiefPatrons.map((person, index) => (
                <LeadershipCard
                  key={person.name}
                  name={person.name}
                  detail={person.detail}
                  cardClass={index % 2 === 0 ? 'leadership-card-teal' : 'leadership-card-cyan'}
                  avatarClass={index % 2 === 0 ? 'avatar-teal' : 'avatar-cyan'}
                />
              ))}
            </div>
          </SurfaceCard>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <SurfaceCard variant="light">
              <h3 className="font-display text-2xl text-slate-950 sm:text-3xl">Patrons</h3>
              <div className="mt-5 space-y-4">
                {patronCards.map((patron, index) => (
                  <LeadershipCard
                    key={patron.name}
                    name={patron.name}
                    detail={patron.detail}
                    cardClass={index % 3 === 0 ? 'leadership-card-amber' : index % 3 === 1 ? 'leadership-card-teal' : 'leadership-card-cyan'}
                    avatarClass={index % 3 === 0 ? 'avatar-amber' : index % 3 === 1 ? 'avatar-teal' : 'avatar-cyan'}
                  />
                ))}
              </div>
            </SurfaceCard>
          </Reveal>

          <Reveal delay={0.08}>
            <SurfaceCard variant="light">
              <h3 className="font-display text-2xl text-slate-950 sm:text-3xl">Conference Leadership</h3>
              <div className="mt-5 space-y-4">
                <LeadershipCard
                  name={chair.name}
                  detail={chair.detail}
                  cardClass="leadership-card-cyan"
                  avatarClass="avatar-cyan"
                />
                <LeadershipCard
                  name={secretary.name}
                  detail={secretary.detail}
                  cardClass="leadership-card-amber"
                  avatarClass="avatar-amber"
                />
              </div>
              <h3 className="mt-8 font-display text-2xl text-slate-950 sm:text-3xl">Conveners</h3>
              <div className="mt-5 space-y-4">
                {convenerCards.map((convener, index) => (
                  <LeadershipCard
                    key={convener.name}
                    name={convener.name}
                    detail={convener.detail}
                    cardClass={index % 2 === 0 ? 'leadership-card-teal' : 'leadership-card-cyan'}
                    avatarClass={index % 2 === 0 ? 'avatar-teal' : 'avatar-cyan'}
                  />
                ))}
              </div>
            </SurfaceCard>
          </Reveal>
        </div>

        <Reveal>
          <SurfaceCard variant="dark">
            <h3 className="font-display text-2xl text-white sm:text-3xl">Organizing Committee</h3>
            <div className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-5">
              {committee.organizingCommittee.map((member) => (
                <div
                  key={member}
                  className="committee-chip"
                >
                  {member}
                </div>
              ))}
            </div>
          </SurfaceCard>
        </Reveal>

        <Reveal>
          <SectionFrame variant="light">
            <h3 className="font-display text-2xl text-slate-950 sm:text-3xl">Advisory Committee</h3>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {committee.advisoryCommittee.map((member) => (
                <div key={member} className="advisory-card">
                  <div className="mb-4 h-px w-16 bg-gradient-to-r from-teal-400/80 to-amber-300/70" />
                  {member}
                </div>
              ))}
            </div>
          </SectionFrame>
        </Reveal>
      </div>
    </section>
  )
}

export default CommitteePage

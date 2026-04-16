import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import SurfaceCard from '../components/SurfaceCard'

function PublicationsPage() {
  return (
    <section className="section-space pt-10">
      <div className="content-grid">
        <PageHero
          kicker="Publications"
          title="Publication pathways and indexing details will be announced soon."
          description="Publication partners, indexing details, and camera-ready instructions will be published after final review board confirmation."
        />

        <Reveal>
          <SurfaceCard variant="dark" className="mt-10 grid min-h-[320px] place-items-center text-center">
            <div className="max-w-xl">
              <span className="section-kicker border-white/10 bg-white/8 text-teal-200">Publications</span>
              <h1 className="mt-5 font-display text-5xl text-white">Publications to be announced soon</h1>
              <p className="mt-5 text-base leading-8 text-slate-200/76">
                Publication partners, indexing details, and camera-ready instructions will be published after final review board confirmation.
              </p>
            </div>
          </SurfaceCard>
        </Reveal>
      </div>
    </section>
  )
}

export default PublicationsPage


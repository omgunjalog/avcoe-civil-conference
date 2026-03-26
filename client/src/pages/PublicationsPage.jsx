import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'

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
          <div className="surface-card mt-10 grid min-h-[320px] place-items-center text-center">
            <div className="max-w-xl">
              <span className="section-kicker !text-teal-600">Publications</span>
              <h1 className="mt-5 font-display text-5xl text-slate-950">Publications to be announced soon</h1>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Publication partners, indexing details, and camera-ready instructions will be published after final review board confirmation.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default PublicationsPage

import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

function PageHero({ kicker, title, description, children }) {
  return (
    <Reveal>
      <div className="glass-panel page-hero-band relative overflow-hidden px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0 hero-grid-overlay opacity-40" />
        <div className="pointer-events-none absolute -left-12 top-8 h-28 w-28 rounded-full bg-teal-300/14 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-cyan-300/12 blur-3xl" />
        <div className="relative">
        <SectionHeader kicker={kicker} title={title} description={description} light />
        {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </Reveal>
  )
}

export default PageHero


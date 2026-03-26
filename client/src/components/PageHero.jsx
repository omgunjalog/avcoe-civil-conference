import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

function PageHero({ kicker, title, description, children }) {
  return (
    <Reveal>
      <div className="glass-panel page-hero-band overflow-hidden px-8 py-10 text-white lg:px-10 lg:py-12">
        <SectionHeader kicker={kicker} title={title} description={description} light />
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </Reveal>
  )
}

export default PageHero

function SectionHeader({ kicker, title, description, light = false }) {
  return (
    <div className="max-w-3xl">
      <span className={`section-kicker ${light ? 'border-white/15 bg-white/8 text-teal-200' : ''}`}>
        {kicker}
      </span>
      <h2 className={`mt-5 font-display text-3xl leading-[0.96] sm:mt-6 sm:text-5xl lg:text-6xl ${light ? 'text-white' : 'text-slate-950'}`}>
        {title}
      </h2>
      <p className={`mt-5 max-w-2xl text-sm leading-7 sm:mt-6 sm:text-[1.02rem] sm:leading-8 ${light ? 'text-slate-200/80' : 'text-slate-600'}`}>
        {description}
      </p>
    </div>
  )
}

export default SectionHeader

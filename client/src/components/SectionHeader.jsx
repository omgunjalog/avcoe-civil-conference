function SectionHeader({ kicker, title, description, light = false }) {
  return (
    <div className="max-w-3xl">
      <span className={`section-kicker ${light ? 'border-white/15 bg-white/8 text-teal-200' : ''}`}>
        {kicker}
      </span>
      <h2 className={`mt-6 font-display text-4xl leading-[0.94] sm:text-5xl lg:text-6xl ${light ? 'text-white' : 'text-slate-950'}`}>
        {title}
      </h2>
      <p className={`mt-6 max-w-2xl text-sm leading-8 sm:text-[1.02rem] ${light ? 'text-slate-200/80' : 'text-slate-600'}`}>
        {description}
      </p>
    </div>
  )
}

export default SectionHeader

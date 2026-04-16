function SectionFrame({ variant = 'light', className = '', children }) {
  const variants = {
    light: 'section-alt-light rounded-[40px] border border-white/50 p-6 shadow-[0_22px_60px_rgba(7,18,33,0.06)] sm:p-8',
    dark: 'section-alt-dark rounded-[40px] border border-white/10 p-6 shadow-[0_24px_70px_rgba(3,10,20,0.24)] sm:p-8',
    steel: 'section-alt-steel rounded-[38px] border border-white/50 p-6 shadow-[0_22px_60px_rgba(7,18,33,0.06)] sm:p-8',
    plain: '',
  }

  return <div className={`${variants[variant] || ''} ${className}`.trim()}>{children}</div>
}

export default SectionFrame


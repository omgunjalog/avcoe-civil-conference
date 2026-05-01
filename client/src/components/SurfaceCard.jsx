function SurfaceCard({ as = 'div', variant = 'light', className = '', children }) {
  const Tag = as
  const variants = {
    light: 'surface-card',
    dark: 'surface-card-dark engineering-panel',
    steel: 'surface-card section-alt-steel',
    soft: 'surface-card section-alt-light',
    glass: 'glass-panel',
  }

  return <Tag className={`${variants[variant] || variants.light} ${className}`.trim()}>{children}</Tag>
}

export default SurfaceCard

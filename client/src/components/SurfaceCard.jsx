function SurfaceCard({ as: Component = 'div', variant = 'light', className = '', children }) {
  const variants = {
    light: 'surface-card',
    dark: 'surface-card-dark engineering-panel',
    steel: 'surface-card section-alt-steel',
    soft: 'surface-card section-alt-light',
    glass: 'glass-panel',
  }

  return <Component className={`${variants[variant] || variants.light} ${className}`.trim()}>{children}</Component>
}

export default SurfaceCard


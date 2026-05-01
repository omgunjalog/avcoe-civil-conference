import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { externalForms, navigationLinks, siteMeta } from '../data/conferenceData'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClass = ({ isActive }) =>
    `relative whitespace-nowrap text-[0.92rem] font-medium transition after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:via-teal-300 after:to-transparent after:transition-transform after:duration-300 ${
      isActive
        ? 'text-teal-200 after:scale-x-100'
        : 'text-slate-200/80 hover:text-white hover:after:scale-x-100'
    }`

  return (
    <header className="sticky top-0 z-50 pt-3 sm:pt-4">
      <div className="content-grid">
        <div className={`nav-shell grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[auto_auto_auto_1fr_auto] ${scrolled ? 'nav-shell-scrolled' : ''}`}>
          <Link to="/" className="flex items-center gap-2 sm:gap-3 lg:col-start-1">
            <div className="brand-badge hidden lg:block">
              <img
                src="/brand/amrutvahini-wordmark.svg"
                alt="Amrutvahini"
                className="h-8 w-auto"
                width="166"
                height="32"
                decoding="async"
              />
            </div>
            <div className="mobile-brand-badge lg:hidden">
              <img
                src="/brand/amrutvahini-wordmark.svg"
                alt="Amrutvahini"
                className="h-5 w-auto"
                width="104"
                height="20"
                decoding="async"
              />
            </div>
          </Link>

          <div className="hidden h-12 w-px bg-white/10 lg:col-start-2 lg:block" />

          <div className="min-w-0 lg:col-start-3">
            <p className="text-sm font-semibold text-white sm:text-[0.95rem]">{siteMeta.conferenceName}</p>
            <p className="hidden text-[0.62rem] uppercase tracking-[0.24em] text-slate-300/78 sm:block lg:text-[0.68rem] lg:tracking-[0.28em]">
              {siteMeta.theme}
            </p>
          </div>

          <nav className="hidden items-center justify-end gap-5 xl:gap-6 lg:col-start-4 lg:flex">
            {navigationLinks.map((item) => (
              <NavLink key={item.href} to={item.href} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:col-start-5 lg:block">
            <a href={externalForms.abstractSubmission} target="_blank" rel="noreferrer" className="button-primary">
              Submit Abstract
            </a>
          </div>

          <button
            type="button"
            className="col-start-3 grid h-10 w-10 place-items-center rounded-2xl border border-white/12 bg-white/6 text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="content-grid lg:hidden">
          <div className="nav-shell mobile-menu-shell mt-3 flex flex-col gap-4 py-5">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `rounded-2xl px-3 py-2 text-base font-medium transition ${isActive ? 'bg-white/10 text-teal-300' : 'text-slate-100/85 hover:bg-white/6 hover:text-white'}`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={externalForms.abstractSubmission}
              target="_blank"
              rel="noreferrer"
              className="button-primary w-full"
              onClick={() => setOpen(false)}
            >
              Submit Abstract
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

import { Link } from 'react-router-dom'
import { footerLinks, siteMeta, socialLinks } from '../data/conferenceData'

function Footer() {
  return (
    <footer className="mt-24 overflow-hidden bg-navy-950 text-white">
      <div className="content-grid py-16">
        <div className="glass-panel bg-radial-premium relative overflow-hidden p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 hero-grid-overlay opacity-25" />
          <div className="pointer-events-none absolute -left-8 top-0 h-28 w-28 rounded-full bg-teal-300/16 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_0.9fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="brand-badge">
                  <img
                    src="/brand/amrutvahini-wordmark.svg"
                    alt="Amrutvahini Sanstha"
                    className="h-10 w-auto"
                    width="208"
                    height="40"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <p className="font-semibold">Amrutvahini College of Engineering</p>
                  <p className="text-sm text-slate-300/80">{siteMeta.conferenceName} | {siteMeta.subtitle}</p>
                </div>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-8 text-slate-300/75">{siteMeta.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">Quick Links</h3>
              <div className="mt-5 flex flex-col gap-3">
                {footerLinks.map((item) => (
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-slate-300/75 transition hover:translate-x-1 hover:text-teal-200"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.href} to={item.href} className="text-sm text-slate-300/75 transition hover:translate-x-1 hover:text-teal-200">
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">Contact</h3>
              <div className="mt-5 space-y-3 text-sm text-slate-300/75">
                <p>{siteMeta.venue}</p>
                <p>{siteMeta.contactEmail}</p>
                <p>{siteMeta.contactPhone}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/12 px-4 py-2 text-sm text-slate-200 transition hover:-translate-y-1 hover:border-teal-300/40 hover:text-teal-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

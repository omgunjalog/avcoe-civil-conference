import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-navy-950 px-5 text-center text-white">
      <div>
        <p className="section-kicker border-white/10 bg-white/8 text-teal-200">404</p>
        <h1 className="mt-6 font-display text-6xl">Page not found</h1>
        <p className="mt-4 text-slate-300/78">The page you requested does not exist in the SRES-26 site map.</p>
        <Link to="/" className="button-primary mt-8">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage

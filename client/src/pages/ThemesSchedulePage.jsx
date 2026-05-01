import { CalendarDays, Clock3, Layers3, MapPinned, Sparkles } from 'lucide-react'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionFrame from '../components/SectionFrame'
import SurfaceCard from '../components/SurfaceCard'
import {
  conferenceSchedule,
  externalForms,
  scheduleAnnouncement,
  scheduleHighlights,
  themesOverview,
  tracks,
} from '../data/conferenceData'

const segmentButtonClass = (isActive) =>
  `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
    isActive
      ? 'bg-[linear-gradient(135deg,#0ea5b6,#41d3bd)] text-white shadow-[0_18px_40px_rgba(14,165,182,0.24)]'
      : 'text-slate-500 hover:text-slate-900'
  }`

const scheduleCardAccent = {
  keynote: 'border-teal-300/70 bg-teal-50/70',
  plenary: 'border-sky-300/70 bg-sky-50/70',
  break: 'border-amber-300/70 bg-amber-50/80',
  parallel: 'border-emerald-300/70 bg-emerald-50/70',
}

function ThemesSchedulePage() {
  const [activeView, setActiveView] = useState('themes')
  const hasSchedule = conferenceSchedule.length > 0

  return (
    <section className="section-space pt-10">
      <div className="content-grid">
        <PageHero
          kicker="Themes & Schedule"
          title={
            activeView === 'themes'
              ? 'Research themes framed for future-ready civil engineering conversations.'
              : 'Conference schedule and session-level agenda updates will be shared after final review.'
          }
          description={
            activeView === 'themes'
              ? 'Explore the official conference themes covering resilient infrastructure, renewable energy, smart grids, intelligent sensing, sustainable materials, and integrated engineering systems.'
              : 'The themes, milestones, and venue are confirmed. The detailed session schedule will be published separately once the committee finalizes the programme.'
          }
        >
          <div className="mx-auto max-w-xl rounded-[32px] border border-white/12 bg-white/8 p-2 shadow-[0_24px_70px_rgba(5,14,26,0.2)] backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={segmentButtonClass(activeView === 'themes')} onClick={() => setActiveView('themes')}>
                <Layers3 size={16} />
                Themes
              </button>
              <button type="button" className={segmentButtonClass(activeView === 'schedule')} onClick={() => setActiveView('schedule')}>
                <CalendarDays size={16} />
                Schedule
              </button>
            </div>
          </div>
        </PageHero>

        {activeView === 'themes' ? (
          <div className="mt-14 space-y-10">
            <Reveal>
              <SurfaceCard variant="light" className="overflow-hidden">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                  <div>
                    <div className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-600 shadow-[0_16px_36px_rgba(65,211,189,0.18)]">
                      <Sparkles size={22} />
                    </div>
                    <h2 className="mt-5 font-display text-3xl text-slate-950 sm:text-4xl">About the conference themes</h2>
                    <div className="mt-6 space-y-4">
                      {themesOverview.map((item) => (
                        <p key={item} className="text-sm leading-8 text-slate-600 sm:text-[1.02rem]">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {scheduleHighlights.map((item) => (
                      <div key={item} className="rounded-[24px] border border-white/70 bg-white/88 px-5 py-5 text-sm leading-7 text-slate-600 shadow-[0_18px_44px_rgba(7,18,33,0.06)]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </SurfaceCard>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {tracks.map((track, index) => {
                const Icon = track.icon
                return (
                  <Reveal key={track.title} delay={index * 0.05}>
                    <SurfaceCard as="article" variant="light" className="h-full overflow-hidden border-t-4 border-t-teal-400/85">
                      <div className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-600 shadow-[0_16px_36px_rgba(65,211,189,0.18)]">
                        <Icon size={22} />
                      </div>
                      <div className="mt-6 flex items-start justify-between gap-3">
                        <h3 className="font-display text-3xl text-slate-950">{track.title}</h3>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Track {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-600">{track.description}</p>
                    </SurfaceCard>
                  </Reveal>
                )
              })}
            </div>
          </div>
        ) : hasSchedule ? (
          <div className="mt-14 space-y-8">
            {conferenceSchedule.map((day, dayIndex) => (
              <Reveal key={day.day} delay={dayIndex * 0.08}>
                <SurfaceCard as="section" variant="light" className="overflow-hidden p-0">
                  <div className="flex flex-col gap-5 bg-[linear-gradient(135deg,#1098a5,#0a6f86)] px-6 py-6 text-white lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/12">
                        <CalendarDays size={24} />
                      </div>
                      <div>
                        <p className="font-semibold uppercase tracking-[0.18em] text-teal-100">{day.day}</p>
                        <h2 className="mt-2 font-display text-3xl sm:text-4xl">{day.date}</h2>
                        <p className="mt-2 text-sm text-white/78">{day.label}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-semibold text-white/92">
                        {day.mode}
                      </span>
                      <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-semibold text-white/92">
                        {day.sections.length} programme blocks
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6 px-6 py-6">
                    {day.sections.map((section) => (
                      <div key={`${day.day}-${section.title}`} className={`rounded-[28px] border px-5 py-5 ${scheduleCardAccent[section.type] || 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex flex-col gap-3 border-b border-slate-200/70 pb-4 lg:flex-row lg:items-center lg:justify-between">
                          <div>
                            <h3 className="font-display text-2xl text-slate-950 sm:text-3xl">{section.title}</h3>
                            {section.coordinator ? (
                              <p className="mt-2 text-sm font-medium text-slate-600">{section.coordinator}</p>
                            ) : null}
                          </div>
                          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600">
                            <MapPinned size={15} />
                            {section.type === 'parallel' ? 'Parallel sessions' : section.type === 'break' ? 'Networking interval' : 'Featured session'}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-4">
                          {section.entries.map((entry) => (
                            <div key={`${section.title}-${entry.time}-${entry.title}`} className="grid gap-4 rounded-[22px] bg-white/85 px-4 py-4 lg:grid-cols-[200px_1fr] lg:items-start">
                              <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <Clock3 size={15} className="text-teal-600" />
                                {entry.time}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900">{entry.title}</p>
                                <p className="mt-2 text-sm leading-7 text-slate-600">{entry.speaker}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <SurfaceCard variant="light" className="mt-14">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-6 sm:px-6">
                <p className="section-kicker !border-teal-200 !bg-teal-50 !text-teal-700">Schedule Update</p>
                <h2 className="mt-5 font-display text-3xl text-slate-950 sm:text-4xl">{scheduleAnnouncement.title}</h2>
                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-[1.02rem]">{scheduleAnnouncement.description}</p>
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {scheduleAnnouncement.checkpoints.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </SurfaceCard>
          </Reveal>
        )}

        <Reveal>
          <SectionFrame variant="steel" className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a href={externalForms.abstractSubmission} target="_blank" rel="noreferrer" className="button-primary">
              Submit Abstract
            </a>
            <a href={externalForms.authorRegistration} target="_blank" rel="noreferrer" className="button-ghost">
              Register Now
            </a>
          </SectionFrame>
        </Reveal>
      </div>
    </section>
  )
}

export default ThemesSchedulePage

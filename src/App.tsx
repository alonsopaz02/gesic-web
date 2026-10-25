import { useEffect, useRef, useState, type FormEvent, type ReactNode, type PointerEvent } from 'react'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, FileText,
  Loader2, Mail, MapPin, Menu, Phone, Scale, Settings, ShieldCheck, Wallet, Wrench, X,
} from 'lucide-react'
import { company } from './data/content'
import { contactEndpoint, founders, pillars, processSteps, results, stats, team, whatsapp, phones, type PillarIcon } from './data/site'

const iconMap: Record<PillarIcon, typeof Wallet> = {
  finance: Wallet,
  maintenance: Wrench,
  legal: FileText,
  security: ShieldCheck,
}

const wrap = 'mx-auto w-full max-w-7xl px-5 md:px-8'

/* ───────────────────────── Animación al hacer scroll ───────────────────────── */

function useInView<T extends Element>(threshold = 0.15, immediate = false) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (immediate) { const id = requestAnimationFrame(() => setInView(true)); return () => cancelAnimationFrame(id) }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) { setInView(true); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold, rootMargin: '0px 0px -60px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, immediate])
  return { ref, inView }
}

type RevealProps = { children: ReactNode; delay?: number; className?: string; from?: 'up' | 'left' | 'right' | 'zoom'; immediate?: boolean }

function Reveal({ children, delay = 0, className = '', from = 'up', immediate = false }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15, immediate)
  const hidden = { up: 'translate-y-10', left: '-translate-x-12', right: 'translate-x-12', zoom: 'scale-95' }[from]
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${inView ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : `opacity-0 ${hidden}`} ${className}`}
    >
      {children}
    </div>
  )
}

function Counter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.6)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || value === 0) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1600, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return <span ref={ref}>{prefix}{n}{suffix}</span>
}

/* ───────────────────────── Piezas comunes ───────────────────────── */

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-5 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] ${light ? 'text-brand-mint' : 'text-brand-green'}`}>
      <span className={`h-px w-10 ${light ? 'bg-brand-mint' : 'bg-brand-green'}`} />
      {children}
    </p>
  )
}

function SectionTitle({ eyebrow, title, light = false, compact = false }: { eyebrow: string; title: ReactNode; light?: boolean; compact?: boolean }) {
  return (
    <Reveal>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl ${compact ? 'lg:text-[3.25rem]' : 'lg:text-6xl'} ${light ? 'text-white' : 'text-brand-navy'}`}>{title}</h2>
    </Reveal>
  )
}

const btnBase = 'group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4'
const btnPrimary = `${btnBase} bg-brand-green text-white shadow-[0_10px_30px_-10px_rgba(19,154,108,0.7)] hover:-translate-y-0.5 hover:bg-[#0f8a60] hover:shadow-[0_18px_40px_-12px_rgba(19,154,108,0.8)] focus-visible:ring-brand-green/30`
const btnGhostLight = `${btnBase} border border-white/30 text-white hover:border-white hover:bg-white hover:text-brand-navy focus-visible:ring-white/30`

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-3" aria-label="GESIC Perú, ir al inicio">
      <img src="/images/gesic/logo.png" alt="" className="h-11 w-auto" />
      <span className="leading-tight">
        <strong className={`block text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-brand-navy'}`}>GESIC PERÚ</strong>
        <small className={`block text-[11px] font-semibold uppercase tracking-[0.16em] ${light ? 'text-white/60' : 'text-slate-500'}`}>Gestión de condominios</small>
      </span>
    </a>
  )
}

/* ───────────────────────── Secciones ───────────────────────── */

const navLinks = [
  ['Nosotros', '#nosotros'], ['Servicios', '#servicios'], ['Resultados', '#resultados'], ['Trayectoria', '#equipo'], ['Contacto', '#contacto'],
] as const

const HEADER_H = 80 // alto del header (h-20) para alinear las secciones al navegar

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${scrolled || open ? 'shadow-[0_8px_30px_rgba(20,40,75,0.10)]' : 'border-b border-slate-100'}`}>
      <div className={`${wrap} flex h-20 items-center justify-between`}>
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} className="group relative text-[15px] font-semibold text-brand-ink transition-colors hover:text-brand-blue">
              {label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-brand-green transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a href="#contacto" className={`${btnPrimary} px-5 py-2.5 text-sm`}>Diagnóstico sin costo <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
        </nav>
        <button
          className="rounded-full p-2 text-brand-navy lg:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <div className={`overflow-hidden transition-[max-height] duration-500 ease-out lg:hidden ${open ? 'max-h-[460px]' : 'max-h-0'}`}>
        <nav className={`${wrap} flex flex-col gap-1 pb-6`} aria-label="Navegación móvil">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-lg font-semibold text-brand-ink hover:bg-brand-mist">{label}</a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} className={`${btnPrimary} mt-3`}>Solicitar diagnóstico sin costo <ArrowUpRight size={18} /></a>
        </nav>
      </div>
    </header>
  )
}

/* Navegación del menú: lleva cada sección exactamente debajo del header */
function useAnchorScroll() {
  useEffect(() => {
    const onClick = (e: globalThis.MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')!.slice(1)
      const target = id ? document.getElementById(id) : null
      if (!target) return
      e.preventDefault()
      const top = id === 'inicio' ? 0 : target.getBoundingClientRect().top + window.scrollY - HEADER_H
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
      history.replaceState(null, '', `#${id}`)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

function Hero() {
  return (
    <section id="inicio" className="relative flex flex-col overflow-hidden bg-brand-navy pt-28 text-white md:pt-36 lg:min-h-[100svh] lg:pt-20">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-brand-blue/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 h-[460px] w-[460px] rounded-full bg-brand-green/25 blur-3xl" />

      <div className={`${wrap} relative grid items-center gap-14 pb-20 lg:flex-1 lg:grid-cols-12 lg:gap-12 lg:py-[5vh]`}>
        <div className="lg:col-span-7">
          <Reveal immediate>
            <span className="mb-7 inline-flex items-center gap-2 rounded-full lg:mb-[3vh] border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-mint" /> Administración integral de condominios
            </span>
          </Reveal>
          <Reveal immediate delay={120}>
            <h1 className="text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[clamp(2.75rem,min(8vh,5.2vw),4.75rem)]">
              Tu propiedad, mejor administrada. <span className="text-brand-mint">Tu inversión, mejor cuidada.</span>
            </h1>
          </Reveal>
          <Reveal immediate delay={240}>
            <p className="mt-7 max-w-xl text-xl leading-relaxed text-white/75 md:text-2xl lg:mt-[3vh] lg:text-[clamp(1.125rem,2.7vh,1.5rem)]">
              Finanzas, mantenimiento, asesoría legal y seguridad en una sola gestión transparente.
            </p>
          </Reveal>
          <Reveal immediate delay={360}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:mt-[4.5vh]">
              <a href="#contacto" className={btnPrimary}>Solicita tu diagnóstico sin costo <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
              <a href="#servicios" className={btnGhostLight}>Ver servicios <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" /></a>
            </div>
          </Reveal>
          <Reveal immediate delay={480}>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-base font-semibold text-white/80 lg:mt-[4.5vh]">
              {['Transparencia total', 'Respuesta inmediata', 'Valorización de tu inmueble'].map(t => (
                <li key={t} className="flex items-center gap-2"><Check size={18} className="text-brand-mint" />{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal immediate from="right" delay={200} className="lg:col-span-5">
          <div className="relative">
            <div className="h-[440px] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10 md:h-[560px] lg:h-[min(560px,62vh)]">
              <img src="/images/gesic/edificio.jpg" alt="Condominio residencial administrado por GESIC" className="h-full w-full animate-kenburns object-cover motion-reduce:animate-none" fetchPriority="high" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl bg-white p-5 text-brand-navy shadow-xl sm:left-auto sm:right-[-1.5rem] sm:w-80">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-green/10 text-brand-green"><ShieldCheck size={24} /></span>
              <span>
                <strong className="block text-lg font-bold">Diagnóstico inicial</strong>
                <span className="text-sm text-slate-500">Visita técnica sin compromiso</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-white py-24 md:py-32">
      <div className={`${wrap} grid gap-16 lg:grid-cols-2 lg:items-center`}>
        <div>
          <SectionTitle eyebrow="Quiénes somos" title={<>Nacimos del otro lado <span className="text-brand-blue">de la mesa.</span></>} />
          <Reveal delay={150}>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-slate-600">
              Nuestros fundadores fueron parte de juntas directivas: enfrentaron la morosidad, ordenaron presupuestos y cuidaron la convivencia. Hoy llevamos esa experiencia a tu condominio.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <blockquote className="mt-10 border-l-4 border-brand-green pl-6 text-2xl font-bold italic leading-snug text-brand-navy md:text-3xl">
              “Tu realidad es nuestra realidad.”
            </blockquote>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120} from="zoom" className={i === 0 ? 'sm:col-span-2' : ''}>
              <div className="group h-full rounded-3xl bg-brand-mist p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-brand-navy hover:shadow-2xl">
                <p className="text-6xl font-extrabold tracking-tight text-brand-blue transition-colors duration-500 group-hover:text-brand-mint md:text-7xl">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-600 transition-colors duration-500 group-hover:text-white/80">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

const pad = (n: number) => String(n).padStart(2, '0')

function Services() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const perView = isDesktop ? 2 : 1
  const positions = pillars.length - perView + 1
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const swipe = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => { setIndex(i => Math.min(i, positions - 1)) }, [positions])

  const go = (dir: 1 | -1) => setIndex(i => (i + dir + positions) % positions)

  // Rotación automática cada 6 s; se pausa con el mouse encima o al usar las flechas
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => { if (!document.hidden) setIndex(i => (i + 1) % positions) }, 6000)
    return () => window.clearInterval(id)
  }, [paused, positions, index])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => { swipe.current = { x: e.clientX, y: e.clientY } }
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!swipe.current) return
    const dx = e.clientX - swipe.current.x
    const dy = e.clientY - swipe.current.y
    swipe.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
  }

  const arrow = 'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-navy shadow-[0_10px_30px_-8px_rgba(20,40,75,0.45)] ring-1 ring-brand-navy/10 transition-all duration-300 hover:scale-110 hover:bg-brand-navy hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/30 active:scale-95 md:h-14 md:w-14'

  const dots = (
    <div className="flex justify-center gap-2">
      {Array.from({ length: positions }, (_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          aria-label={`Ir a la posición ${i + 1}`}
          aria-current={i === index}
          className={`h-2 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-brand-blue' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
        />
      ))}
    </div>
  )

  return (
    <section id="servicios" className="scroll-mt-20 overflow-hidden bg-brand-mist py-24 md:py-32">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16`}>
        <div className="lg:col-span-4">
          <SectionTitle compact eyebrow="Nuestros servicios" title={<>Cuatro pilares. <span className="text-brand-blue">Una gestión integral.</span></>} />
          <Reveal delay={120}>
            <p className="mt-6 text-xl leading-relaxed text-slate-600">
              Finanzas, mantenimiento, respaldo legal y seguridad coordinados por un solo equipo, para que tu junta directiva tenga orden y control.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-8">
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
          <button className={`${arrow} left-3 md:-left-7`} onClick={() => go(-1)} aria-label="Pilar anterior"><ArrowLeft size={22} /></button>
          <button className={`${arrow} right-3 md:-right-7`} onClick={() => go(1)} aria-label="Siguiente pilar"><ArrowRight size={22} /></button>
          <div
            role="region"
            aria-roledescription="carrusel"
            aria-label="Nuestros cuatro pilares"
            className="select-none overflow-hidden rounded-[1.75rem]"
            style={{ touchAction: 'pan-y' }}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { swipe.current = null }}
          >
            <div
                className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{
                  transform: `translateX(calc(${index} * -1 * ((100% + 24px) / ${perView})))`,
                }}
              >
              {pillars.map((p, i) => {
                const Icon = iconMap[p.icon]
                const visible = i >= index && i < index + perView
                return (
                  <article
                    key={p.number}
                    aria-hidden={!visible}
                    className={`group relative h-[480px] w-full shrink-0 overflow-hidden rounded-[1.75rem] bg-brand-navy shadow-[0_20px_50px_-20px_rgba(20,40,75,0.45)] transition-opacity duration-700 md:h-[540px] md:w-[calc((100%-24px)/2)] ${visible ? 'opacity-100' : 'opacity-40'}`}
                  >
                    <img src={p.image} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1631] via-[#0a1631]/65 to-[#0a1631]/10" />
                    <div className="absolute inset-0 bg-brand-blue/0 transition-colors duration-700 group-hover:bg-brand-blue/25" />

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-7 text-white">
                      <span className="text-sm font-bold tracking-[0.2em] text-white/70">{p.number} / {pad(pillars.length)}</span>
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-brand-green"><Icon size={22} /></span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-8">
                      <h3 className="text-3xl font-extrabold leading-tight">{p.title}</h3>
                      <p className="mt-2 text-lg text-white/80">{p.tagline}</p>
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <ul className="mt-5 space-y-3 border-t border-white/20 pt-5">
                            {p.items.map(item => (
                              <li key={item} className="flex gap-3 text-base text-white/90"><Check size={18} className="mt-0.5 shrink-0 text-brand-mint" />{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
          </div>
          <div className="mt-8">{dots}</div>
        </Reveal>
      </div>
    </section>
  )
}

function Results() {
  return (
    <section id="resultados" className="scroll-mt-20 bg-white py-24 md:py-32">
      <div className={wrap}>
        <SectionTitle eyebrow="Resultados reales" title={<>Nuestra gestión <span className="text-brand-blue">en imágenes.</span></>} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r, i) => (
            <Reveal key={r.title} delay={i * 120}>
              <figure className="group relative h-80 overflow-hidden rounded-3xl md:h-96">
                <img src={r.image} alt={r.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/20 to-transparent transition-opacity duration-500 group-hover:from-brand-blue/95" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <strong className="block text-xl font-bold leading-snug">{r.title}</strong>
                  <span className="mt-1 block translate-y-2 text-base text-white/85 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">{r.text}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-24 text-white md:py-32">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-brand-blue/40 blur-3xl" />
      <div className={`${wrap} relative`}>
        <SectionTitle light eyebrow="Cómo trabajamos" title={<>Un proceso claro, <span className="text-brand-mint">desde el día uno.</span></>} />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <Reveal key={s.number} delay={i * 140}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-brand-mint/40 hover:bg-white/[0.08]">
                <span className="text-5xl font-extrabold text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.45)] transition-all duration-500 group-hover:[-webkit-text-stroke:1.5px_#3DD6A0]">{s.number}</span>
                <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-lg text-white/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const strengthIcon = { operations: Settings, legal: Scale }

function Team() {
  return (
    <section id="equipo" className="scroll-mt-20 bg-white py-24 md:py-32">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionTitle eyebrow="Respaldo y trayectoria" title={<>Rigor corporativo. <span className="text-brand-blue">Blindaje legal.</span></>} />
          </div>
          <Reveal delay={150} className="lg:col-span-6">
            <p className="text-xl leading-relaxed text-slate-600">{founders.intro}</p>
            <p className="mt-4 text-xl leading-relaxed text-slate-600">{founders.detail}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {founders.strengths.map((s, i) => {
            const Icon = strengthIcon[s.icon]
            const dark = i === 0
            return (
              <Reveal key={s.title} delay={i * 150} from={i === 0 ? 'left' : 'right'}>
                <div className={`group h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(20,40,75,0.4)] md:p-10 ${dark ? 'bg-brand-navy text-white' : 'border border-slate-200 bg-brand-mist text-brand-navy'}`}>
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${dark ? 'bg-brand-mint/15 text-brand-mint' : 'bg-brand-blue/10 text-brand-blue'}`}><Icon size={26} /></span>
                  <h3 className="mt-6 text-3xl font-extrabold">{s.title}</h3>
                  <p className={`mt-3 text-lg ${dark ? 'text-white/75' : 'text-slate-600'}`}>{s.text}</p>
                  <ul className={`mt-6 space-y-3 border-t pt-6 ${dark ? 'border-white/15' : 'border-slate-200'}`}>
                    {s.items.map(item => (
                      <li key={item} className={`flex gap-3 text-base font-medium ${dark ? 'text-white/90' : 'text-slate-700'}`}>
                        <Check size={18} className={`mt-0.5 shrink-0 ${dark ? 'text-brand-mint' : 'text-brand-green'}`} />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <p className="mb-8 mt-20 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Quiénes lideran GESIC</p>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={i * 150}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-brand-mist transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(20,40,75,0.35)] sm:flex-row">
                <div className="h-80 overflow-hidden sm:h-auto sm:w-2/5">
                  <img src={p.photo} alt={p.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col justify-center p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">{p.role}</p>
                  <h3 className="mt-2 text-3xl font-extrabold text-brand-navy">{p.name}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600">{p.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="bg-white pb-24 md:pb-32">
      <div className={wrap}>
        <Reveal from="zoom">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-blue px-8 py-16 text-white md:px-16 md:py-20">
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-brand-green/40 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
              <div>
                <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">Tu condominio merece una gestión a la altura de su valor.</h2>
                <p className="mt-4 text-xl text-white/80">Visita técnica y diagnóstico inicial sin compromiso.</p>
              </div>
              <a href="#contacto" className={`${btnBase} shrink-0 bg-white text-brand-navy hover:-translate-y-0.5 hover:shadow-2xl focus-visible:ring-white/40`}>
                Solicitar visita técnica <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

type ContactForm = { name: string; phone: string; email: string; building: string; apartments: string; need: string; message: string; privacy: boolean }
const initialForm: ContactForm = { name: '', phone: '', email: '', building: '', apartments: '', need: 'Administración integral', message: '', privacy: false }
const field = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base text-brand-ink placeholder:text-slate-400 transition focus:border-brand-blue focus:outline-none focus:ring-4 focus:ring-brand-blue/10'
const labelCls = 'block text-sm font-semibold text-slate-700'

function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [honey, setHoney] = useState('')

  const update = (key: keyof ContactForm, value: string | boolean) => {
    setForm(current => ({ ...current, [key]: value }))
    setError('')
    setStatus('idle')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.privacy) { setError('Debes aceptar la política de privacidad para continuar.'); return }
    if (honey) return // anti-spam: campo oculto rellenado por bots
    setStatus('sending')
    try {
      const res = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Nueva solicitud web GESIC — ${form.building}`,
          _template: 'table',
          _replyto: form.email,
          Nombre: form.name,
          Teléfono: form.phone,
          Correo: form.email,
          Condominio: form.building,
          'N.º de departamentos': form.apartments || 'No indicado',
          'Necesidad principal': form.need,
          Mensaje: form.message || 'Sin mensaje adicional',
          'Acepta privacidad': 'Sí',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || String(data.success) === 'false') throw new Error('envío fallido')
      setStatus('sent')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const contactRow = 'group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-lg'
  const contactIcon = 'grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white'

  return (
    <section id="contacto" className="scroll-mt-20 bg-brand-mist py-24 md:py-32">
      <div className={`${wrap} grid gap-14 lg:grid-cols-5`}>
        <div className="lg:col-span-2">
          <SectionTitle eyebrow="Contacto" title={<>Conversemos sobre <span className="text-brand-blue">tu condominio.</span></>} />
          <Reveal delay={150}>
            <p className="mt-6 text-xl text-slate-600">Cuéntanos qué necesita tu edificio y te contactamos.</p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-10 space-y-4">
              <a href={`mailto:${company.email}`} className={contactRow}>
                <span className={contactIcon}><Mail size={20} /></span>
                <span className="flex-1"><small className="block text-sm text-slate-500">Correo</small><strong className="text-lg text-brand-navy">{company.email}</strong></span>
                <ArrowUpRight size={18} className="text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className={contactRow}>
                <span className={`${contactIcon} !bg-[#25D366]/10 !text-[#1a9e4b] group-hover:!bg-[#25D366] group-hover:!text-white`}><WhatsAppIcon size={20} /></span>
                <span className="flex-1"><small className="block text-sm text-slate-500">WhatsApp</small><strong className="text-lg text-brand-navy">{phones.whatsapp}</strong></span>
                <ArrowUpRight size={18} className="text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a href={`tel:${phones.callHref}`} className={contactRow}>
                <span className={contactIcon}><Phone size={20} /></span>
                <span className="flex-1"><small className="block text-sm text-slate-500">Llamadas</small><strong className="text-lg text-brand-navy">{phones.call}</strong></span>
                <ArrowUpRight size={18} className="text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} from="right" className="lg:col-span-3">
          <div className="rounded-[2rem] bg-white p-7 shadow-[0_30px_70px_-35px_rgba(20,40,75,0.35)] md:p-10">
            <h3 className="text-3xl font-extrabold text-brand-navy">Solicita una visita técnica</h3>
            <p className="mt-2 text-lg text-slate-500">Diagnóstico inicial sin compromiso.</p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelCls}>Nombre completo *<input className={field} required autoComplete="name" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Tu nombre" /></label>
                <label className={labelCls}>Teléfono *<input className={field} required type="tel" autoComplete="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="Tu número" /></label>
                <label className={labelCls}>Correo electrónico *<input className={field} required type="email" autoComplete="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="nombre@correo.com" /></label>
                <label className={labelCls}>Condominio o edificio *<input className={field} required value={form.building} onChange={e => update('building', e.target.value)} placeholder="Nombre del condominio" /></label>
                <label className={labelCls}>N.º de departamentos<input className={field} inputMode="numeric" value={form.apartments} onChange={e => update('apartments', e.target.value.replace(/[^0-9]/g, ''))} placeholder="Opcional" /></label>
                <label className={labelCls}>Necesidad principal *
                  <select className={field} required value={form.need} onChange={e => update('need', e.target.value)}>
                    <option>Administración integral</option><option>Finanzas y cobranza</option><option>Mantenimiento técnico</option><option>Asesoría legal</option><option>Seguridad y prevención</option><option>Otro</option>
                  </select>
                </label>
                <label className={`${labelCls} sm:col-span-2`}>Mensaje<textarea className={field} rows={3} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Cuéntanos brevemente qué necesitas (opcional)" /></label>
              </div>
              <label className="mt-6 flex items-start gap-3 text-sm text-slate-600">
                <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded accent-brand-green" checked={form.privacy} onChange={e => update('privacy', e.target.checked)} required />
                <span>Acepto el tratamiento de mis datos para atender esta consulta. He leído la <a className="font-semibold text-brand-blue underline-offset-4 hover:underline" href="/politica-de-privacidad.html" target="_blank" rel="noreferrer">política de privacidad</a>.</span>
              </label>
              {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">{error}</p>}
              <input type="text" name="_honey" value={honey} onChange={e => setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              {status === 'sent' && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-base font-medium text-emerald-800" role="status">¡Gracias! Recibimos tu solicitud y te contactaremos muy pronto.</p>}
              {status === 'error' && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-bold underline">WhatsApp</a>.</p>}
              <button type="submit" disabled={status === 'sending'} className={`${btnPrimary} mt-7 w-full disabled:cursor-wait disabled:opacity-70`}>
                {status === 'sending'
                  ? <>Enviando… <Loader2 size={18} className="animate-spin" /></>
                  : <>Enviar solicitud <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></>}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-brand-ink text-white">
      <div className={`${wrap} grid gap-12 py-16 md:grid-cols-3`}>
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-base text-white/60">Transparencia total, respuesta inmediata y valorización de tu inmueble.</p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-white/50">Explora</h4>
          <ul className="mt-5 space-y-3">
            {navLinks.map(([label, href]) => <li key={href}><a href={href} className="text-white/80 transition-colors hover:text-brand-mint">{label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-white/50">Contacto</h4>
          <ul className="mt-5 space-y-3 text-white/80">
            <li><a href={`mailto:${company.email}`} className="transition-colors hover:text-brand-mint">{company.email}</a></li>
            <li className="flex items-center gap-2"><WhatsAppIcon size={17} className="shrink-0 text-white/40" /><span>{phones.whatsapp}</span><span className="sr-only">(WhatsApp)</span></li>
            <li className="flex items-center gap-2"><Phone size={17} className="shrink-0 text-white/40" /><span>{phones.call}</span><span className="sr-only">(llamadas)</span></li>
            <li className="flex gap-2"><MapPin size={18} className="mt-0.5 shrink-0 text-brand-mint" />Alameda Ñaña – Condominio Mirador El Golf</li>
          </ul>
        </div>
      </div>
      <div className={`${wrap} flex flex-col gap-3 border-t border-white/10 py-6 pb-28 text-sm text-white/50 md:flex-row md:justify-between md:pb-6 md:pr-28`}>
        <span>© {new Date().getFullYear()} {company.name} · Todos los derechos reservados.</span>
        <a href="/politica-de-privacidad.html" className="hover:text-white">Política de privacidad</a>
      </div>
    </footer>
  )
}

// api.whatsapp.com conserva los emojis (wa.me los rompe al redirigir)
const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsapp.number}&text=${encodeURIComponent(whatsapp.message)}`

function WhatsAppIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex h-16 items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5b] md:bottom-7 md:right-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s] group-hover:hidden motion-reduce:hidden" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-base font-bold opacity-0 transition-all duration-500 ease-out group-hover:max-w-[170px] group-hover:pl-6 group-hover:opacity-100">¿Conversamos?</span>
      <span className="grid h-16 w-16 shrink-0 place-items-center"><WhatsAppIcon size={32} /></span>
    </a>
  )
}

export default function App() {
  useAnchorScroll()
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Services />
        <Results />
        <Process />
        <Team />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

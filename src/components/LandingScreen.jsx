import { useEffect, useState } from 'react';
import {
    Heart, Music, Download, Upload, Sparkles, Play, Shield,
    ArrowRight, ImagePlus, Wand2, CheckCircle2, Lock, Clock, Globe,
} from 'lucide-react';
import useVideoStore from '../store/useVideoStore';

export default function LandingScreen() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(t);
    }, []);

    const goTo = (screen) => useVideoStore.setState({ currentScreen: screen });

    return (
        <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-b from-[#FFF8FA] via-white to-[#FFF1F2] text-ink-900">
            {/* Soft animated aurora */}
            <div className="aurora" aria-hidden />

            {/* Subtle dot grid behind hero */}
            <div
                aria-hidden
                className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[640px] opacity-40 [mask-image:linear-gradient(180deg,black,transparent_85%)]"
            />

            <div className={`relative z-10 transition-all duration-700 ease-spring ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {/* ===== Top nav ===== */}
                <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 sm:px-8">
                    <div className="flex items-center gap-2.5">
                        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow-soft">
                            <Heart className="h-4.5 w-4.5 text-white" fill="white" size={16} />
                        </span>
                        <div className="leading-tight">
                            <p className="text-[13px] font-semibold tracking-tight text-ink-900">Wendy's Song</p>
                            <p className="text-[11px] font-medium text-ink-500">A charitable project</p>
                        </div>
                    </div>
                    <button
                        onClick={() => goTo('sync')}
                        className="hidden items-center gap-2 rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-xs font-semibold text-ink-700 backdrop-blur hover:border-brand-200 hover:text-brand-600 sm:inline-flex"
                    >
                        <Wand2 className="h-3.5 w-3.5" />
                        Sync Lyrics
                    </button>
                </nav>

                {/* ===== Hero ===== */}
                <section className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 text-center sm:px-8 sm:pt-24">
                    {/* Eyebrow badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3.5 py-1.5 text-[12px] font-semibold text-ink-700 shadow-sm backdrop-blur animate-rise-in">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
                        </span>
                        A Mother's Day charitable project
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    </div>

                    {/* Headline */}
                    <h1 className="mx-auto mt-7 max-w-4xl text-balance text-[44px] font-extrabold leading-[1.02] tracking-display text-ink-900 sm:text-[68px] md:text-[80px]">
                        <span className="block animate-rise-in">A tribute to Mom,</span>
                        <span
                            className="mt-2 block text-brand-gradient-animated animate-rise-in"
                            style={{ animationDelay: '120ms' }}
                        >
                            made just for her.
                        </span>
                    </h1>

                    {/* Subhead */}
                    <p
                        className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600 sm:text-xl animate-rise-in"
                        style={{ animationDelay: '220ms' }}
                    >
                        Drop in your favorite photos and we'll weave them into a heartfelt video set to{' '}
                        <span className="font-semibold text-ink-800">Wendy's Song</span> — ready to share in minutes.
                    </p>

                    {/* CTAs */}
                    <div
                        className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 animate-rise-in"
                        style={{ animationDelay: '320ms' }}
                    >
                        <button
                            onClick={() => goTo('storyboard')}
                            className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-orange-500 px-8 text-base font-semibold text-white shadow-glow-brand transition-spring hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-20px_rgba(225,29,85,0.55)] active:translate-y-0"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
                            <Play className="h-5 w-5" fill="white" />
                            <span>Start Creating</span>
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>

                        <button
                            onClick={() => {
                                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ink-200 bg-white/70 px-7 text-base font-semibold text-ink-800 backdrop-blur hover:border-ink-300 hover:bg-white"
                        >
                            See how it works
                        </button>
                    </div>

                    {/* Trust strip */}
                    <ul
                        className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] font-medium text-ink-500 animate-rise-in"
                        style={{ animationDelay: '420ms' }}
                    >
                        <li className="inline-flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% free
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <Lock className="h-4 w-4 text-emerald-500" /> Private — runs in your browser
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-emerald-500" /> Ready in minutes
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <Globe className="h-4 w-4 text-emerald-500" /> No sign-up
                        </li>
                    </ul>

                    {/* Hero preview card */}
                    <div
                        className="relative mx-auto mt-20 max-w-3xl animate-scale-in"
                        style={{ animationDelay: '480ms' }}
                    >
                        {/* Glow */}
                        <div
                            aria-hidden
                            className="absolute -inset-x-12 -inset-y-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(244,63,118,0.22),transparent_60%)] blur-2xl"
                        />
                        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-card backdrop-blur-xl">
                            {/* Window chrome */}
                            <div className="flex items-center justify-between border-b border-ink-100 bg-gradient-to-b from-white to-ink-50/70 px-4 py-3">
                                <div className="flex gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                                </div>
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                                    Your video preview
                                </p>
                                <span className="w-12" />
                            </div>

                            {/* Video frame */}
                            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand-50 via-rose-50 to-amber-50">
                                {/* Ambient hearts */}
                                <Heart className="absolute left-8 top-8 h-5 w-5 text-brand-400/60" fill="currentColor" />
                                <Heart className="absolute right-12 top-16 h-7 w-7 text-amber-400/50" fill="currentColor" />
                                <Heart className="absolute bottom-12 left-16 h-4 w-4 text-rose-400/60" fill="currentColor" />
                                <Heart className="absolute bottom-8 right-8 h-6 w-6 text-brand-300/60" fill="currentColor" />

                                <div className="relative grid h-full place-items-center">
                                    <div className="text-center">
                                        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-card">
                                            <Heart className="h-7 w-7 text-brand-500" fill="currentColor" />
                                        </div>
                                        <p className="mt-4 font-display text-3xl italic text-ink-800">For Mom, with love</p>
                                        <p className="mt-1 text-sm text-ink-500">Your memories, beautifully timed to music</p>
                                    </div>
                                </div>

                                {/* Corner play button */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-ink-700 shadow-sm backdrop-blur">
                                    <Play className="h-3 w-3" fill="currentColor" />
                                    2:05
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="grid grid-cols-12 gap-1 p-4">
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-1.5 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 opacity-60"
                                        style={{
                                            opacity: 0.15 + (i / 11) * 0.7,
                                            animation: `rise-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.6 + i * 0.04}s both`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== How it works ===== */}
                <section id="how-it-works" className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Three simple steps</p>
                        <h2 className="mt-3 text-balance text-4xl font-extrabold tracking-display text-ink-900 sm:text-5xl">
                            From photos to a finished tribute.
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-base text-ink-600 sm:text-lg">
                            Everything happens right in your browser. Your photos stay on your device.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                n: '01',
                                icon: ImagePlus,
                                tint: 'from-brand-50 to-brand-100 text-brand-700 ring-brand-100',
                                accent: 'from-brand-500 to-brand-700',
                                title: 'Upload your photos',
                                body: 'Add 18 favorite moments — one for each lyric. Drop them in all at once or one by one.',
                            },
                            {
                                n: '02',
                                icon: Music,
                                tint: 'from-purple-50 to-fuchsia-100 text-purple-700 ring-purple-100',
                                accent: 'from-fuchsia-500 to-purple-600',
                                title: 'Preview the magic',
                                body: 'Watch your photos perfectly synced to Wendy\'s Song with smooth, cinematic transitions.',
                            },
                            {
                                n: '03',
                                icon: Download,
                                tint: 'from-amber-50 to-orange-100 text-amber-700 ring-amber-100',
                                accent: 'from-amber-500 to-orange-500',
                                title: 'Download & share',
                                body: 'Get a high-quality MP4 ready to text, email, or post. Share the love with Mom.',
                            },
                        ].map((step, i) => (
                            <article
                                key={step.n}
                                className="group relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white/80 p-7 shadow-card backdrop-blur transition-spring hover:-translate-y-1 hover:shadow-card-hover animate-rise-in"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                {/* Hover glow */}
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-brand-100 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                                />

                                <div className="flex items-center justify-between">
                                    <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ring-1 ring-inset ${step.tint}`}>
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    <span className="font-display text-3xl italic text-ink-200">{step.n}</span>
                                </div>

                                <h3 className="mt-6 text-xl font-bold tracking-tight text-ink-900">{step.title}</h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{step.body}</p>

                                {/* Bottom accent */}
                                <div
                                    className={`absolute inset-x-7 bottom-0 h-1 origin-left scale-x-0 rounded-t-full bg-gradient-to-r ${step.accent} transition-transform duration-500 group-hover:scale-x-100`}
                                />
                            </article>
                        ))}
                    </div>
                </section>

                {/* ===== Quote ===== */}
                <section className="relative mx-auto max-w-3xl px-5 pb-20 text-center sm:px-8">
                    <div aria-hidden className="font-display text-[160px] leading-none text-brand-200/60">"</div>
                    <p className="-mt-16 font-display text-3xl italic text-ink-800 sm:text-4xl">
                        Because every mom deserves to know how much she means to you.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <Sparkles key={i} className="h-4 w-4 text-amber-400" fill="currentColor" />
                        ))}
                    </div>
                </section>

                {/* ===== Privacy strip ===== */}
                <section className="relative mx-auto max-w-4xl px-5 pb-24 sm:px-8">
                    <div className="flex flex-col items-center gap-5 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 p-7 text-center backdrop-blur sm:flex-row sm:text-left">
                        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100">
                            <Shield className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold tracking-tight text-ink-900">
                                Your photos never leave your device
                            </h3>
                            <p className="mt-1 text-sm text-ink-600">
                                Everything is processed locally in your browser. Nothing uploaded, nothing stored.
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                            <Lock className="h-3.5 w-3.5" /> 100% Secure
                        </span>
                    </div>
                </section>

                {/* ===== Final CTA ===== */}
                <section className="relative mx-auto max-w-5xl px-5 pb-28 sm:px-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-500 to-orange-500 p-10 text-center text-white shadow-glow-brand sm:p-16">
                        {/* Decorative grid */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 opacity-20"
                            style={{
                                backgroundImage:
                                    'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
                                backgroundSize: '24px 24px',
                                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                            }}
                        />
                        {/* Floating hearts */}
                        <Heart className="absolute left-8 top-8 h-6 w-6 text-white/30 animate-float" fill="currentColor" />
                        <Heart className="absolute right-12 top-12 h-8 w-8 text-white/20 animate-float" fill="currentColor" style={{ animationDelay: '1.4s' }} />
                        <Heart className="absolute bottom-10 left-14 h-5 w-5 text-white/25 animate-float" fill="currentColor" style={{ animationDelay: '2.6s' }} />
                        <Heart className="absolute bottom-8 right-8 h-7 w-7 text-white/30 animate-float" fill="currentColor" style={{ animationDelay: '0.6s' }} />

                        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-display sm:text-5xl">
                            Make this Mother's Day unforgettable.
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
                            Takes about 5 minutes. Lasts a lifetime.
                        </p>
                        <button
                            onClick={() => goTo('storyboard')}
                            className="group mx-auto mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-brand-700 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.25)] transition-spring hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.3)]"
                        >
                            <Upload className="h-5 w-5" />
                            Start your tribute
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

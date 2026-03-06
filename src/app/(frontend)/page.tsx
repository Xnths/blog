import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  if (process.env.IS_BUILDING === 'true') return null

  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    limit: 4,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      meta: true,
    },
  })

  return (
    <>
      <div className="bg-hero-sand bg-noise font-sans text-hero-dark min-h-screen">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 pb-24">
          {/* NAV */}
          <nav className="flex justify-between items-center py-6 md:py-8 flex-wrap gap-4">
            <Link href="/" className="font-serif text-2xl font-black tracking-tight text-hero-dark">
              xnths
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-2 list-none flex-wrap">
              <li>
                <a
                  href="#research"
                  className="text-hero-dark font-bold text-sm px-4 py-2 rounded-full bg-hero-surface shadow-clay-sm hover:translate-y-[-2px] hover:translate-x-[-1px] hover:shadow-clay-sm-hover transition-all block"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#posts"
                  className="text-hero-dark font-bold text-sm px-4 py-2 rounded-full bg-hero-surface shadow-clay-sm hover:translate-y-[-2px] hover:translate-x-[-1px] hover:shadow-clay-sm-hover transition-all block"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-hero-dark font-bold text-sm px-4 py-2 rounded-full bg-hero-surface shadow-clay-sm hover:translate-y-[-2px] hover:translate-x-[-1px] hover:shadow-clay-sm-hover transition-all block"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-hero-dark font-bold text-sm px-4 py-2 rounded-full bg-hero-surface shadow-clay-sm hover:translate-y-[-2px] hover:translate-x-[-1px] hover:shadow-clay-sm-hover transition-all block"
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Mobile Nav */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-hero-dark">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-hero-sand border-none shadow-clay text-hero-dark p-8"
                >
                  <div className="flex flex-col gap-8 mt-12">
                    <a href="#research" className="text-2xl font-serif font-black tracking-tight">
                      Projects
                    </a>
                    <a href="#posts" className="text-2xl font-serif font-black tracking-tight">
                      Blog
                    </a>
                    <a href="#skills" className="text-2xl font-serif font-black tracking-tight">
                      Skills
                    </a>
                    <a href="#contact" className="text-2xl font-serif font-black tracking-tight">
                      Contact
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>

          {/* HERO */}
          <div className="flex items-center p-6 md:p-12 my-4 mb-10 bg-hero-sky rounded-[32px] md:rounded-[40px] shadow-clay overflow-hidden relative animate-fade-in-up min-h-[400px]">
            <Image
              src="/hero-image.png"
              alt="Hero background"
              fill
              className="object-cover absolute inset-0 z-0 pointer-events-none"
              priority
            />
            <div className="relative z-10 bg-white/30 backdrop-blur-md p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-white/50 max-w-xl">
              <Badge
                variant="secondary"
                className="bg-white/60 hover:bg-white/70 shadow-sm border border-white/40 text-hero-dark rounded-full mb-4 px-3 py-1 text-xs font-extrabold tracking-wider uppercase"
              >
                🎓 CS @ USP
              </Badge>
              <h1 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-black leading-[1.05] tracking-tight mb-4 text-hero-dark">
                Jonathas
                <br />
                Castilho
                <br /> <em className="italic opacity-80">Software Engineer</em>.
              </h1>
              <p className="text-[1rem] md:text-[1.05rem] text-hero-dark border-hero-dark/20 leading-relaxed font-semibold">
                Building high-performance systems at the intersection of Software Engineering,
                Design and Radical Behaviorism.
              </p>
            </div>
          </div>

          {/* ABOUT STRIP */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="bg-hero-green rounded-[24px] md:rounded-[28px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-6 md:p-7 [--clay-sh:#4e7a43]">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-serif text-lg font-bold mb-2 text-hero-dark">Behavioral Tech</h3>
              <p className="text-sm text-hero-dark/70 leading-relaxed">
                Applying B.F. Skinner’s Radical Behaviorism to Agile methodologies and user
                experience design.
              </p>
            </div>
            <div className="bg-hero-wood rounded-[24px] md:rounded-[28px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-6 md:p-7 [--clay-sh:#725e43]">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-serif text-lg font-bold mb-2 text-hero-dark">Performance</h3>
              <p className="text-sm text-hero-dark/70 leading-relaxed">
                Specialized in scalable architectures using Next.js, Django, and Elasticsearch for
                data-heavy applications.
              </p>
            </div>
            <div className="bg-hero-red rounded-[24px] md:rounded-[28px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-6 md:p-7 [--clay-sh:#824433]">
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="font-serif text-lg font-bold mb-2 text-hero-dark">
                Academic Background
              </h3>
              <p className="text-sm text-hero-dark/70 leading-relaxed">
                Final year Computer Science student at IME-USP, focusing on software engineering.
              </p>
            </div>
          </div>

          {/* PROJECTS */}
          <section className="mb-16" id="research">
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="font-serif text-3xl font-black tracking-tight text-hero-dark">
                Featured Projects
              </h2>
              <Badge
                variant="secondary"
                className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm bg-hero-green text-hero-dark hover:bg-hero-green/80 border-none"
              >
                Active
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 md:gap-6">
              <a
                href="https://uspaberta.ime.usp.br/"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col h-full bg-hero-wood rounded-[24px] md:rounded-[28px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-6 md:p-8 [--clay-sh:#725e43] outline-none"
              >
                <Badge
                  variant="secondary"
                  className="self-start text-[0.7rem] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-4 bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                >
                  Engineering
                </Badge>
                <h3 className="font-serif text-xl font-bold mb-2 leading-tight text-hero-dark">
                  USP Aberta
                </h3>
                <p className="text-sm text-hero-dark/80 font-medium leading-relaxed mb-5 flex-grow">
                  Developing a high-fidelity replica of the Lattes platform for USP. Focusing on
                  data analysis, complex statistics generation, and scalable backend architecture.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Next.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    DevOps
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    GitOps
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Data Analytics
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    AWS
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Django
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Elasticsearch
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    PostgreSQL
                  </Badge>
                </div>
                <div className="mt-auto pt-4 border-t border-hero-dark/10 flex items-center justify-between text-hero-dark font-bold text-sm">
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgba(34,197,94,0.6)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[rgba(34,197,94,0.8)]"></span>
                    </span>
                    View Live Deployment
                  </span>
                  <ExternalLink className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a
                href="https://xnths.github.io/tcc-page/"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col h-full bg-hero-sky rounded-[24px] md:rounded-[28px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-6 md:p-8 [--clay-sh:#72a0b1] outline-none"
              >
                <Badge
                  variant="secondary"
                  className="self-start text-[0.7rem] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-4 bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                >
                  Research (Capstone Project)
                </Badge>
                <h3 className="font-serif text-xl font-bold mb-2 leading-tight text-hero-dark">
                  Agile as Rule-Governed Behavior
                </h3>
                <p className="text-sm text-hero-dark/80 font-medium leading-relaxed mb-5 flex-grow">
                  Investigating software development practices through the lens of Radical
                  Behaviorism, specifically analyzing Agile rituals in AR environments.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Behaviorism
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Agile
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    AR
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Unity
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    SOLID
                  </Badge>
                </div>
                <div className="mt-auto pt-4 border-t border-hero-dark/10 flex items-center justify-between text-hero-dark font-bold text-sm">
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgba(34,197,94,0.6)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[rgba(34,197,94,0.8)]"></span>
                    </span>
                    View Live Deployment
                  </span>
                  <ExternalLink className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a
                href="https://psicologojoaofernandes.com/"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col h-full bg-hero-green rounded-[24px] md:rounded-[28px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-6 md:p-8 [--clay-sh:#4e7a43] outline-none"
              >
                <Badge
                  variant="secondary"
                  className="self-start text-[0.7rem] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-4 bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                >
                  Full Stack
                </Badge>
                <h3 className="font-serif text-xl font-bold mb-2 leading-tight text-hero-dark">
                  Psychology Clinic System
                </h3>
                <p className="text-sm text-hero-dark/80 font-medium leading-relaxed mb-5 flex-grow">
                  Custom SEO-optimized platform for a behaviorist psychology clinic. Integrated
                  scheduling and patient management with a focus on high-conversion UI for ads. It
                  includes an administration page for blog and patient data management.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Next.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    PayloadCMS
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    MongoDB
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Google Ads
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Google Analytics (GA4)
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    Tailwind
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[0.72rem] font-bold px-3 py-1 rounded-full bg-white/40 shadow-sm text-hero-dark group-hover:bg-white/50 border-none transition-colors"
                  >
                    SEO
                  </Badge>
                </div>
                <div className="mt-auto pt-4 border-t border-hero-dark/10 flex items-center justify-between text-hero-dark font-bold text-sm">
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgba(34,197,94,0.6)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[rgba(34,197,94,0.8)]"></span>
                    </span>
                    View Live Deployment
                  </span>
                  <ExternalLink className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </section>

          {/* BLOG POSTS */}
          <section className="mb-16" id="posts">
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="font-serif text-3xl font-black tracking-tight text-hero-dark">
                Insights
              </h2>
              <Badge
                variant="secondary"
                className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm bg-hero-red text-hero-surface hover:bg-hero-red/80 border-none"
              >
                Latest
              </Badge>
              <Link
                href="/posts"
                className="ml-auto text-sm font-bold text-hero-dark/60 hover:text-hero-dark transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 md:gap-6">
              {posts.docs.length > 0 &&
                posts.docs.map((post, index) => {
                  const configs = [
                    { bg: 'bg-hero-sky', sh: '[--clay-sh:#72a0b1]' },
                    { bg: 'bg-hero-green', sh: '[--clay-sh:#4e7a43]' },
                    { bg: 'bg-hero-wood', sh: '[--clay-sh:#725e43]' },
                    { bg: 'bg-hero-red', sh: '[--clay-sh:#824433]' },
                  ]
                  const c = configs[index % configs.length]
                  return (
                    <div
                      key={post.id}
                      className={`rounded-[24px] md:rounded-[28px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-6 md:p-8 flex flex-col gap-2 ${c.bg} ${c.sh}`}
                    >
                      <h3 className="font-serif text-xl font-bold leading-snug text-hero-dark">
                        {post.title}
                      </h3>
                      {post.meta?.description && (
                        <p className="text-sm text-hero-dark/70 leading-relaxed line-clamp-2">
                          {post.meta.description}
                        </p>
                      )}
                      <Link
                        className="self-start mt-2 text-[0.82rem] font-extrabold text-hero-dark flex items-center gap-1 group"
                        href={`/posts/${post.slug}`}
                      >
                        Read post{' '}
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  )
                })}
            </div>
          </section>

          {/* SKILLS */}
          <section className="mb-16" id="skills">
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="font-serif text-3xl font-black tracking-tight text-hero-dark">
                Stack
              </h2>
              <Badge
                variant="secondary"
                className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm bg-hero-sky text-hero-dark hover:bg-hero-sky/80 border-none"
              >
                Proficiency
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 md:gap-6">
              <div className="rounded-[24px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-5 md:p-6 flex flex-col gap-3 bg-hero-sky [--clay-sh:#72a0b1]">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[0.9rem] text-hero-dark">
                    Next.js / React
                  </span>
                  <span className="text-xs font-bold text-hero-dark/60">95%</span>
                </div>
                <Progress value={95} className="h-3 bg-white/40 [&>div]:bg-black/20 shadow-inner" />
              </div>
              <div className="rounded-[24px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-5 md:p-6 flex flex-col gap-3 bg-hero-green [--clay-sh:#4e7a43]">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[0.9rem] text-hero-dark">
                    Django / Python
                  </span>
                  <span className="text-xs font-bold text-hero-dark/60">90%</span>
                </div>
                <Progress value={90} className="h-3 bg-white/40 [&>div]:bg-black/20 shadow-inner" />
              </div>
              <div className="rounded-[24px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-5 md:p-6 flex flex-col gap-3 bg-hero-wood [--clay-sh:#725e43]">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[0.9rem] text-hero-dark">
                    PostgreSQL / ES
                  </span>
                  <span className="text-xs font-bold text-hero-dark/60">85%</span>
                </div>
                <Progress value={85} className="h-3 bg-white/40 [&>div]:bg-black/20 shadow-inner" />
              </div>
              <div className="rounded-[24px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-5 md:p-6 flex flex-col gap-3 bg-hero-red [--clay-sh:#824433]">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[0.9rem] text-hero-dark">
                    Flutter / Mobile
                  </span>
                  <span className="text-xs font-bold text-hero-dark/60">75%</span>
                </div>
                <Progress value={75} className="h-3 bg-white/40 [&>div]:bg-black/20 shadow-inner" />
              </div>
              <div className="rounded-[24px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-5 md:p-6 flex flex-col gap-3 bg-hero-sand [--clay-sh:#b8a38b]">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[0.9rem] text-hero-dark">
                    Linux / DevOps
                  </span>
                  <span className="text-xs font-bold text-hero-dark/60">88%</span>
                </div>
                <Progress value={88} className="h-3 bg-white/40 [&>div]:bg-black/20 shadow-inner" />
              </div>
              <div className="rounded-[24px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card p-5 md:p-6 flex flex-col gap-3 bg-hero-surface [--clay-sh:#c8c0b8]">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[0.9rem] text-hero-dark">Refactoring</span>
                  <span className="text-xs font-bold text-hero-dark/60">80%</span>
                </div>
                <Progress value={80} className="h-3 bg-white/40 [&>div]:bg-black/20 shadow-inner" />
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <div
            className="bg-hero-green rounded-[32px] md:rounded-[36px] p-8 md:p-12 flex justify-between items-center gap-6 md:gap-8 shadow-clay bg-noise flex-col lg:flex-row [--clay-sh:#4e7a43]"
            id="contact"
          >
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-[1.8rem] md:text-[2rem] font-black tracking-tight mb-2 text-hero-surface">
                Let&rsquo;s collaborate.
              </h2>
              <p className="text-hero-surface text-[0.95rem]">
                Interested in behavioral-driven software design or full-stack architecture? Hit me
                up!
              </p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <Button
                asChild
                className="rounded-full font-bold text-[0.9rem] text-hero-dark bg-hero-surface shadow-clay-sm hover:bg-hero-surface hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-sm-hover transition-all"
              >
                <a href="mailto:jonathas@xnths.com">✉️ Email</a>
              </Button>
              <Button
                asChild
                className="rounded-full font-bold text-[0.9rem] text-hero-dark bg-hero-surface shadow-clay-sm hover:bg-hero-surface hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-sm-hover transition-all"
              >
                <a href="https://github.com/Xnths" target="_blank" rel="noreferrer">
                  💻 GitHub
                </a>
              </Button>
              <Button
                asChild
                className="rounded-full font-bold text-[0.9rem] text-hero-dark bg-hero-surface shadow-clay-sm hover:bg-hero-surface hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-sm-hover transition-all"
              >
                <a href="https://linkedin.com/in/xnths" target="_blank" rel="noreferrer">
                  💼 LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

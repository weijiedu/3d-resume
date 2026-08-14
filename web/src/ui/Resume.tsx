import { motion } from 'framer-motion'
import { ZooopLogo } from './ZooopLogo'
import { SOCIAL_ICONS } from './SocialIcons'
import { FOCUS_POINTS } from '../data/focusPoints'

const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/weijiedu',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/weijie-du/',
  },
  // {
  //   id: 'portfolio',
  //   label: 'Portfolio',
  //   href: '#',
  // },
]

// 履历数据（双语）。英文为译稿，可按需润色。
interface ResumeGroup {
  heading?: string
  logo?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface Course {
  code?: string
  name: string
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  courses?: Course[]
  groups?: ResumeGroup[]
}
const ENTRIES: ResumeEntry[] = [
  {
    period: '2020 – 2024',
    place: 'University of California, Irvine',
    role: 'Bachelor of Science in Computer Science · Intelligent Systems Track',
    courses: [
      { code: 'ICS 46', name: 'Data Structures' },
      { code: 'CS 161', name: 'Algorithms' },
      { code: 'CS 175', name: 'Deep Learning' },
      { code: 'CS 178', name: 'Machine Learning' },
      { code: 'INF 115', name: 'Software Testing' },
      { code: 'INF 131', name: 'Human Computer Interaction' },
      { code: 'INF 133', name: 'User Interaction Software' },
    ],
  },
  {
    period: 'Sep 2022 – Jun 2024',
    place: 'UC Irvine STAR Lab',
    role: 'Research Assistant',
    points: [
      'Co-authored research published at PACMHCI 2025 and ASSETS 2024, analyzing 200+ qualitative data points on noise sensitivity and social support in autistic communities.',
      'Conducted 10+ interviews and co-design sessions with autistic participants, translating findings into design recommendations for mobile and wearable technologies.',
      'Contributed to a Samsung Galaxy Watch research prototype using Android APIs and the Samsung Health SDK to support sensory-management studies.',
    ],
  },
  {
    period: 'Oct 2024 – Jan 2025',
    place: 'Fact Finders Pro',
    role: 'Software Engineer Intern',
    points: [
      'Built an AI-powered fact-checking platform with React and TypeScript, making verification workflows easier for non-technical users.',
      'Developed Python REST APIs for real-time data retrieval and analysis.',
      'Worked with product and design teammates to turn requirements into production-ready features across the frontend and backend.',
    ],
  },
  {
    period: '2024 – 2026',
    place: 'Carnegie Mellon University',
    role: 'Master of Science in Software Engineering',
    courses: [
      { name: 'Foundations of Software Engineering' },
      { name: 'Computer Architecture and Design' },
      { name: 'Software Requirements & Interaction Design' },
      { name: 'Cloud Infrastructure and Services' },
      { name: 'Data Science in Software Engineering' },
      { name: 'Mobile & Embedded Software Design' },
      { name: 'Functional Programming' },
    ],
  },
  {
    period: 'Aug 2025 – Dec 2025',
    place: 'Bosch',
    role: 'Software Engineer Intern',
    points: [
      'Engineered a semantic 3D mapping pipeline that achieved centimeter-level localization accuracy for autonomous parking.',
      'Integrated vision-language models (CLIP and LSeg) with point-cloud algorithms to automate the detection of lanes, curbs, and road markings.',
      'Built a compression pipeline that reduced map asset size from 700 MB to 130 MB and improved map load times by 80%.',
      'Implemented caching and warm-start optimizations that reduced asset-loading latency by 99% during interactive 3D visualization.'
    ],
    groups: [
      {
        heading: 'Connect',
        links: SOCIAL_LINKS,
      },
    ],
  },

  
]

const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Résumé',
    entries: ENTRIES,
  },
  zh: {
    title: 'Résumé',
    entries: ENTRIES,
  },
}

// 履历条目依次对应 glb 里的聚焦锚点（相机停靠点），顺序须与 entries 一致。
// 名单是唯一真源，见 data/focusPoints.ts（Scene.tsx 也从那里取）。
const POINT_ORDER = FOCUS_POINTS

const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Coursework({ courses }: { courses: Course[] }) {
  return (
    <motion.div className="tl-courses" variants={itemV}>
      <div className="tl-courses-label">Selected Coursework</div>
      <ul className="tl-course-list">
        {courses.map((c) => (
          <li key={c.code ? `${c.code}-${c.name}` : c.name} className="tl-course">
            {c.code && <span className="tl-course-code">{c.code}</span>}
            <span className="tl-course-name">{c.name}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function Group({ group }: { group: ResumeGroup }) {
  const heading =
    group.logo === 'zooop' ? (
      <a
        className="zooop-logo-link"
        href={group.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ZOOOP"
      >
        <ZooopLogo className="zooop-logo" animated />
      </a>
    ) : group.link ? (
      <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
        {group.heading}
      </a>
    ) : (
      <span>{group.heading}</span>
    )

  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.logoImg && (
          <span className="tl-group-logo">
            <img src={group.logoImg} alt={group.heading || ''} loading="lazy" />
          </span>
        )}
        {heading}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
        <div className="tl-logos">
          {group.links.map((l) => {
            const Icon = SOCIAL_ICONS[l.id as keyof typeof SOCIAL_ICONS]
            return (
              <a
                key={l.id}
                className="tl-logo"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容（点保持在外做时间轴标记）：移动端可给它加卡片衬底，
          且它紧贴内容高度，不含 tl-entry 用于排布的大 padding。
          用普通 div（非 motion）：framer 变体经 React context 穿透它，叶子元素仍是
          tl-entry 的直接 stagger 子级，入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.courses && entry.courses.length > 0 && <Coursework courses={entry.courses} />}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}

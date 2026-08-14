// 作品集数据（双语）。5 大板块 → 点击展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.jsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…'05'
//   title     板块标题
//   link      可选外链（标题可点；无则纯文本）
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  link?: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

const SECTIONS: WorkSection[] = [
  {
    id: 'ScottyConnect',
    no: '01',
    title: 'ScottyConnect',
    tagline: 'React TypeScript · Vite · Python · Flask · MongoDB',
    link: 'https://github.com/weijiedu/ScottyConnect',
    items: [
      {
        name: 'Designed an event lifecycle backend with the State Pattern, enforcing valid transitions from draft to published to ended/cancelled',
        slug: 'ai-apps',
      },
      {
        name: 'Implemented lifecycle APIs for create, update, delete, and state transitions, with schedule validation and owner-only permissions',
        slug: 'llm-rag',
      },
      {
        name: 'Integrated lifecycle workflows into the React/TypeScript frontend, including event publishing and the public events feed',
      },
    ],
  },
  {
    id: 'Automated Code Quality Pipeline',
    no: '02',
    title: 'Automated Code Quality Pipeline',
    tagline: 'Terraform · Jenkins · SonarQube · Hadoop MapReduce · GitHub · GCP',
    link: 'https://github.com/weijiedu/Automated-Code-Quality-Pipeline-',
    items: [
      {
        name: 'Built a Terraform-based cloud workflow deploying Jenkins, SonarQube, and Hadoop on GCP',
        slug: 'notification-pipelines',
      },
      {
        name: 'Created a GitHub-triggered CI pipeline that gated Hadoop MapReduce jobs using SonarQube quality checks',
        slug: 'websocket-webpush',
      },
      {
        name: 'Implemented a MapReduce job to compute per-file line counts and output results through the command line',
        slug: 'mapreduce-line-counts',
      },
    ],
  },
  {
    id: 'Emergency Social Network',
    no: '03',
    title: 'Emergency Social Network',
    tagline: 'Bootstrap · Node.js · Express · Socket.IO · PostgreSQL',
    link: 'https://github.com/weijiedu/Emergency-Social-Network',
    items: [
      {
        name: 'Developed a disaster-response platform allowing real-time communication using Node.js/Express and PostgreSQL',
        slug: 'notification-pipelines',
      },
      {
        name: 'Implemented low-latency, bi-directional messaging with Socket.IO, enabling instant alerts and private communications',
        slug: 'websocket-webpush',
      },
      {
        name: 'Improved reliability by writing 190+ automated tests (71% coverage) and creating a CI/CD pipeline under an Agile workflow',
        slug: 'mapreduce-line-counts',
      },
    ],
  },
  {
    id: 'skills',
    no: '04',
    title: 'Technical Skills',
    tagline: 'Languages · Frameworks · Tools',
    groups: [
      {
        heading: 'Languages',
        items: ['Python, JavaScript, TypeScript, Java, SQL, C++, HTML/CSS, Bash, F#'],
      },
      {
        heading: 'Frameworks & Libraries',
        items: ['React, Next.js, Node.js, Express, Redux, Bootstrap, TensorFlow, PyTorch, CLIP, LSeg'],
      },
      {
        heading: 'Tools',
        items: ['Docker, Git, Firebase, PostgreSQL, MongoDB, MySQL, Terraform, Kubernetes, Kafka, Jenkins, SonarQube, Hadoop, OpenAI API'],
      },
    ],
  },
]

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: 'Projects',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Awards',
    visitLabel: 'Visit site',
    detailPlaceholder: 'Project details coming soon.',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link button',
    countLabel: (n) => `${n} works`,
    sections: SECTIONS,
  },
  en: {
    title: 'Projects',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Awards',
    visitLabel: 'Visit site',
    detailPlaceholder: 'Project details coming soon.',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link button',
    countLabel: (n) => `${n} works`,
    sections: SECTIONS,
  },
}

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位，放入图片后自动点亮。
export const SECTION_COVERS: Record<string, string> = {
  ScottyConnect: `${import.meta.env.BASE_URL}works/covers/scottyconnect.png`,
  'Automated Code Quality Pipeline': `${import.meta.env.BASE_URL}works/covers/pipeline.jpg`,
}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}

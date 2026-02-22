import { useRef, useEffect, useState } from 'react'

// ── 常數 ──
const ACCENT = '#00BFFF' // 強調色

/**
 * ── 專案資料數據庫 ──
 * 將資料與 UI 分離，方便未來透過 CMS 或 API 介接
 */
const PROJECTS = [
  {
    title: '魔方攻略網站',
    desc: '整理魔方還原步驟的靜態教學網站，包含詳細圖解與分步說明。',
    tags: ['HTML', 'CSS', 'JavaScript'],
    featured: true, // 標記為精選專案，會呈現不同邊框色與標籤
    demo: 'https://xnerv15step.github.io/Magic-Cube-2.0/',
    repo: 'https://github.com/Xnerv15step/Magic-Cube-2.0',
  },
  {
    title: '心情播放器',
    desc: '根據當下心情推薦音樂氛圍與曲目，使用 Web Audio API 生成環境音效，搭配 Canvas 粒子背景。',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Audio API'],
    featured: false,
    demo: 'https://xnerv15step.github.io/Music-Feeling/',
    repo: 'https://github.com/Xnerv15step/Music-Feeling',
  },
  {
    title: 'Weather App',
    desc: '串接天氣 API，查詢各城市即時天氣資訊。',
    tags: ['JavaScript', 'API'],
    featured: false,
    demo: 'https://xnerv15step.github.io/Weather-API/',
    repo: 'https://github.com/Xnerv15step/Weather-API',
  },
  {
    title: 'Technical Documentation Page',
    desc: '以魔方攻略為主題的技術文件頁面，具備固定側邊導覽列，結構清晰易讀。',
    tags: ['HTML', 'CSS'],
    featured: false,
    demo: 'https://xnerv15step.github.io/Cube-List/',
    repo: 'https://github.com/Xnerv15step/Cube-List',
  },
  {
    title: 'Book Inventory App',
    desc: '書籍庫存管理應用，支援欄位排序與狀態分類，使用 CSS 屬性選取器實作視覺樣式。',
    tags: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
    demo: 'https://xnerv15step.github.io/Reading-List/',
    repo: 'https://github.com/Xnerv15step/Reading-List',
  },
]

/**
 * ── FadeSection ──
 * 滾動偵測容器，當區塊進入視窗時觸發淡入動畫
 */
function FadeSection({ children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 } // 偵測靈敏度：10% 出現即觸發
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}>
      {children}
    </div>
  )
}

/**
 * ── ProjectCard 單一卡片元件 ──
 */
function ProjectCard({ project, dark }) {
  const [hovered, setHovered] = useState(false) // 追蹤滑鼠懸浮狀態

  // 根據 dark 模式計算動態顏色
  const border = dark ? '#2a2a2a' : '#e0e0e0'
  const bg2 = dark ? '#1a1a1a' : '#ffffff'
  const sub = dark ? '#888' : '#666'
  const text = dark ? '#e5e5e5' : '#1a1a1a'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg2,
        // 如果是精選專案 (featured)，邊框改為強調色
        border: `1px solid ${project.featured ? ACCENT : border}`,
        borderRadius: 12,
        padding: 24,
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s, background 0.3s',
        // Hover 時向上位移 4px 並產生發光陰影
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 32px ${ACCENT}22` : 'none', 
      }}
    >
      {/* 主打標籤：僅在 featured 為 true 時顯示 */}
      {project.featured && (
        <span style={{
          position: 'absolute', top: 16, right: 16,
          background: ACCENT, color: '#000',
          fontSize: 11, fontWeight: 700,
          borderRadius: 4, padding: '2px 8px',
        }}>
          主打
        </span>
      )}

      {/* 專案標題 */}
      <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: text }}>
        {project.title}
      </h3>

      {/* 專案描述 */}
      <p style={{ color: sub, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
        {project.desc}
      </p>

      {/* 技術標籤：自動換行排列 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {project.tags.map(tag => (
          <span
            key={tag}
            style={{
              border: `1px solid ${ACCENT}`,
              color: ACCENT,
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: 12,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 連結按鈕：Demo 與 GitHub 原始碼 */}
      <div style={{ display: 'flex', gap: 12 }}>
        {[['Live Demo', project.demo], ['GitHub', project.repo]].map(([label, url]) => (
          <a
            key={label}
            href={url || '#'}
            target={url ? '_blank' : undefined}
            rel="noreferrer"
            style={{
              background: 'none',
              border: `1px solid ${border}`,
              borderRadius: 6,
              padding: '6px 14px',
              color: url ? text : sub,
              fontSize: 13,
              cursor: url ? 'pointer' : 'default',
              textDecoration: 'none',
              transition: 'all 0.2s',
              opacity: url ? 1 : 0.4, // 若無網址則降低透明度
            }}
            onMouseEnter={e => {
              if (url) {
                e.currentTarget.style.borderColor = ACCENT
                e.currentTarget.style.color = ACCENT
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = border
              e.currentTarget.style.color = url ? text : sub
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}

/**
 * ── Projects 主區塊 ──
 */
export default function Projects({ dark }) {
  const border = dark ? '#2a2a2a' : '#e0e0e0'

  return (
    <section
      id="projects"
      style={{ 
        padding: '100px 10vw', 
        borderTop: `1px solid ${border}`,
        maxWidth: 1400, // 限制寬度
        margin: '0 auto' 
      }}
    >
      <FadeSection>
        {/* 區塊標題 */}
        <p style={{ color: ACCENT, fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>
          PROJECTS
        </p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 40 }}>
          作品集
        </h2>

        {/* 響應式網格佈局 (Grid) ──
          repeat(auto-fill, minmax(280px, 1fr)) 
          能讓卡片在手機版自動垂直堆疊，在大螢幕自動橫向填滿
        */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {PROJECTS.map(p => (
            <ProjectCard key={p.title} project={p} dark={dark} />
          ))}
        </div>
      </FadeSection>
    </section>
  )
}

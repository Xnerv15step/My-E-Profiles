import { useRef, useEffect, useState } from 'react'

/** 
 * ── 常數配置 ──
 * 將重複使用的顏色抽離，方便未來維護或擴充 Dark/Light Mode 
 */
const ACCENT = '#00BFFF' // 強調色（亮藍色）
const sub = '#888'        // 次要文字顏色（灰色）
const border = '#2a2a2a'  // 邊框顏色（深灰）
const bg2 = '#1a1a1a'     // 卡片背景顏色

/**
 * ── FadeSection 元件 ──
 * 作用：當使用者捲動到該區塊時，產生「淡入並向上移動」的動畫效果。
 * 使用技術：Intersection Observer API
 */
function FadeSection({ children }) {
  const ref = useRef(null)           // 用於抓取 DOM 節點
  const [visible, setVisible] = useState(false) // 追蹤元件是否已進入視窗

  useEffect(() => {
    // 建立觀察器：監控 ref.current 是否出現在視窗中
    const obs = new IntersectionObserver(
      ([entry]) => {
        // 當 threshold (比例) 超過 0.15 時，將 visible 設為 true
        if (entry.isIntersecting) {
          setVisible(true)
          // 觸發後可取消觀察，若想反覆觸發則拿掉 obs.disconnect()
          obs.disconnect() 
        }
      },
      { threshold: 0.15 } // 代表元件有 15% 進入畫面時就觸發
    )

    if (ref.current) obs.observe(ref.current)
    
    // Cleanup function：元件卸載時切斷連線，避免記憶體洩漏
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        // 動態樣式切換
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease', // 過渡動畫 0.7 秒
      }}
    >
      {children}
    </div>
  )
}

/** 
 * ── 靜態資料 ──
 * 抽離資訊，使主元件結構更乾淨，方便擴充 
 */
const INFO_ITEMS = [
  ['🎓', '資工系畢業'],
  ['🎵', '聽音樂、閱讀'],
  ['💻', '前端開發'],
  ['📍', 'Taiwan'],
]

/**
 * ── About 主元件 ──
 */
export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '100px 10vw',      // 上下 100px，左右 10% 的間距
        borderTop: `1px solid ${border}`,
        maxWidth: 1200,             // 限制最大寬度防止在大螢幕上太寬
        margin: '0 auto'            // 區塊置中
      }}
    >
      <FadeSection>
        {/* 小標題 */}
        <p style={{ color: ACCENT, fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>
          ABOUT
        </p>

        {/* 大標題：使用 clamp 實現響應式字體大小 */}
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 32 }}>
          關於我
        </h2>

        {/* 雙欄佈局：內容與資訊卡片 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // 預設兩欄等寬
            gap: 48,                        // 欄位間距
            maxWidth: 900,
          }}
        >
          {/* 左側：自我介紹文字 */}
          <p style={{ color: sub, lineHeight: 2, fontSize: 16 }}>
            資工系畢業，擁有強大的自主學習能力，目前主要學習 React，對於AI工具也有些許的使用經驗。
            若貴司有要求，十分願意致力於透過持續進修掌握最新技術（如 Vue 3, Next.js,Figma,TypeScript等）。
            <br /><br />
            平時喜歡聽音樂、閱讀。
          </p>

          {/* 右側：個人資訊列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {INFO_ITEMS.map(([icon, label]) => (
              <div
                key={label} // 使用 label 作為 React 渲染的 Key
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: bg2,
                  border: `1px solid ${border}`,
                  borderRadius: 8,
                  padding: '12px 16px',
                }}
              >
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ color: sub, fontSize: 14 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>
    </section>
  )
}

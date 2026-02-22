import { useRef, useEffect, useState } from 'react'

/** 
 * ── 常數設定 ──
 * 統一管理個人資訊，若未來變更 Email 或帳號只需改這裡
 */
const ACCENT = '#00BFFF' // 主題強調色
const EMAIL = 'bbaabb0424@gmail.com'
const GITHUB = 'https://github.com/Xnerv15step'

/**
 * ── FadeSection 元件 ──
 * 實作滾動偵測動畫（Scroll-reveal），讓區塊進入視線時才淡入
 */
function FadeSection({ children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // 建立 IntersectionObserver 實例
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 } // 15% 內容出現在螢幕上時觸發
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect() // 清除觀察器
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
 * ── Contact 聯絡元件 ──
 * @param {boolean} dark - 由父元件傳入的布林值，決定深色或淺色樣式
 */
export default function Contact({ dark }) {
  // ── 動態樣式分配 ──
  // 根據 dark prop 自動切換配色方案
  const bg2 = dark ? '#1a1a1a' : '#ffffff'     // 區塊背景
  const border = dark ? '#2a2a2a' : '#e0e0e0'  // 邊框
  const sub = dark ? '#888' : '#666'           // 次要輔助文字
  const text = dark ? '#e5e5e5' : '#1a1a1a'    // 主要文字顏色

  return (
    <>
      {/* Contact 區塊主體 */}
      <section
        id="contact"
        style={{
          padding: '100px 10vw',
          borderTop: `1px solid ${border}`,
          background: bg2,
          textAlign: 'center',
          transition: 'background 0.3s', // 切換模式時有平滑背景過渡
        }}
      >
        <FadeSection>
          {/* 區塊標題語 */}
          <p style={{ color: ACCENT, fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>
            CONTACT
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>
            聯絡我
          </h2>
          <p style={{ color: sub, fontSize: 16, marginBottom: 40 }}>
            有任何機會或想法，歡迎聯絡！
          </p>

          {/* 連結按鈕容器 - flexWrap 確保在手機版自動換行 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
            
            {/* Email 按鈕 - 使用 mailto 協議 */}
            <a
              href={`mailto:${EMAIL}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: ACCENT,
                color: '#000', // 按鈕文字設為黑色提高對比
                borderRadius: 8,
                padding: '14px 28px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: 15,
                transition: 'opacity 0.2s',
              }}
              // Inline Hover 效果：改變透明度
              onMouseEnter={e => e.currentTarget.style.opacity = 0.85}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              ✉️ {EMAIL}
            </a>

            {/* GitHub 按鈕 - 使用外連協議 */}
            <a
              href={GITHUB}
              target="_blank"     // 新分頁開啟
              rel="noreferrer"    // 安全性考慮
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'none',
                color: text,
                border: `1px solid ${border}`,
                borderRadius: 8,
                padding: '14px 28px',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: 15,
                transition: 'border-color 0.2s, color 0.2s',
              }}
              // Inline Hover 效果：邊框與文字變色
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = ACCENT
                e.currentTarget.style.color = ACCENT
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = border
                e.currentTarget.style.color = text
              }}
            >
              GitHub →
            </a>
          </div>
        </FadeSection>
      </section>

      {/* Footer 頁尾區塊 */}
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: sub,
        fontSize: 13,
        borderTop: `1px solid ${border}`,
        background: bg2,
        transition: 'background 0.3s, color 0.3s',
      }}>
        © 2025 蔡樂弦 · Built with React
      </footer>
    </>
  )
}

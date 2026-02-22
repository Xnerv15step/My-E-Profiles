import { useState, useEffect } from 'react'

// ── 常數：定義主題色 ──
const ACCENT = '#00BFFF'

/**
 * ── useTypewriter 客製化 Hook ──
 * 處理文字打出、停頓、刪除及循環切換的狀態機
 */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')      // 當前渲染於畫面的字串
  const [wordIdx, setWordIdx] = useState(0)       // 指向陣列中第幾個單字
  const [charIdx, setCharIdx] = useState(0)       // 指向當前單字的第幾個字元
  const [deleting, setDeleting] = useState(false) // 標記目前是在「打字中」還是「刪除中」

  useEffect(() => {
    const word = words[wordIdx]
    let timer

    // 邏輯 1：打字中 (還沒打完單字長度)
    if (!deleting && charIdx < word.length) {
      timer = setTimeout(() => setCharIdx(c => c + 1), speed)
    } 
    // 邏輯 2：打完單字 (進入停頓期)
    else if (!deleting && charIdx === word.length) {
      timer = setTimeout(() => setDeleting(true), pause)
    } 
    // 邏輯 3：刪除中 (字元索引遞減)
    else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(c => c - 1), speed / 2) // 刪除通常比打字快
    } 
    // 邏輯 4：刪除完畢 (切換到下一個單字)
    else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length) // 循環陣列索引
    }

    // 根據索引切換顯示內容
    setDisplay(word.slice(0, charIdx))
    
    // 清除計時器以避免 Effect 衝突
    return () => clearTimeout(timer)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

// ── 欲展示的文字陣列 ──
const TYPED_WORDS = ['Front-End Developer', '把想法變成網頁', '用程式解決生活中的小麻煩']

export default function Hero({ dark }) {
  // 呼叫打字動效 Hook
  const typed = useTypewriter(TYPED_WORDS)

  // ── 根據 Dark Mode 判斷顏色變數 ──
  const sub = dark ? '#888' : '#666'
  const border = dark ? '#2a2a2a' : '#e0e0e0'
  const text = dark ? '#e5e5e5' : '#1a1a1a'

  /**
   * 平滑捲動至指定錨點
   * @param {string} id - 目標區塊的 ID
   */
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '0 10vw',
      paddingTop: 56, // 預留 Navbar 高度避開遮擋
      maxWidth: 1200,
      margin: '0 auto',
    }}>
      {/* 標籤小標題 */}
      <p style={{ color: ACCENT, fontSize: 14, letterSpacing: 3, marginBottom: 12 }}>
        HI, I'M
      </p>

      {/* 主標題：使用 clamp 實現響應式字體 */}
      <h1 style={{
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        fontWeight: 800,
        margin: '0 0 16px',
        lineHeight: 1.1,
      }}>
        蔡樂弦
      </h1>

      {/* 打字機展示區塊 */}
      <div style={{
        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
        color: sub,
        marginBottom: 32,
        minHeight: '2.5rem', // 固定高度防止文字消失時佈局跳動 (CLS 優化)
      }}>
        <span style={{ color: ACCENT }}>{typed}</span>
        {/* 閃爍游標：透過 CSS Animation 控制 */}
        <span style={{
          borderRight: `2px solid ${ACCENT}`,
          marginLeft: 2,
          animation: 'blink 1s step-end infinite',
        }} />
      </div>

      {/* 互動按鈕區 */}
      <div style={{ display: 'flex', gap: 16 }}>
        {/* 主要按鈕 (CTA) */}
        <button
          onClick={() => scrollTo('projects')}
          style={{
            background: ACCENT,
            color: '#000',
            border: 'none',
            borderRadius: 6,
            padding: '12px 28px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: 15,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
          onMouseLeave={e => e.currentTarget.style.opacity = 1}
        >
          看作品
        </button>

        {/* 次要按鈕 */}
        <button
          onClick={() => scrollTo('contact')}
          style={{
            background: 'none',
            color: text,
            border: `1px solid ${border}`,
            borderRadius: 6,
            padding: '12px 28px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 15,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = ACCENT
            e.currentTarget.style.color = ACCENT
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = border
            e.currentTarget.style.color = text
          }}
        >
          聯絡我
        </button>
      </div>

      {/* 底部捲動提示 */}
      <div style={{ marginTop: 40 }}>
        <span style={{ color: sub, fontSize: 13, textTransform: 'uppercase' }}>scroll</span>
        <span style={{ color: ACCENT, fontSize: 18, marginLeft: 8 }}>↓</span>
      </div>

      {/* 游標閃爍動畫定義 */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}

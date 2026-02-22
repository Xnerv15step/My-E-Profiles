import { useRef, useEffect, useState } from 'react'

// ── 常數 ──
const ACCENT = '#00BFFF' // 強調色

/** 
 * ── 技能資料數據結構 ──
 * 使用物件分組，方便擴充不同類別的技術（如：工具、框架、語文）
 */
const SKILLS = {
  '技能': ['HTML', 'CSS', 'JavaScript', 'Git', 'React'],
  '也碰過': ['後端基礎', '資料庫基礎'],
}

/**
 * ── FadeSection ──
 * 滾動偵測容器：利用 Intersection Observer 實作進入視野時的位移動畫
 */
function FadeSection({ children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 } // 元件出現 15% 時觸發
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
 * ── Skills 元件 ──
 * @param {boolean} dark - 接收來自父層的主題狀態
 */
export default function Skills({ dark }) {
  // ── 動態樣式分配 ──
  const bg2 = dark ? '#1a1a1a' : '#ffffff'
  const border = dark ? '#2a2a2a' : '#e0e0e0'
  const sub = dark ? '#888' : '#666'

  return (
    /* 外層容器：負責撐開全寬背景色 */
    <section id="skills" style={{ background: bg2, borderTop: `1px solid ${border}` }}>
      
      {/* 內層限制寬度容器：確保在大螢幕內容不靠邊 */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 10vw' }}>
        <FadeSection>
          {/* 小標題 */}
          <p style={{ color: ACCENT, fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>
            SKILLS
          </p>
          
          {/* 主標題：使用 clamp 確保字體在手機/電腦版之間縮放 */}
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 40 }}>
            技術能力
          </h2>

          {/* 技能網格：預設兩欄佈局 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 700 }}>
            
            {/* 迭代 SKILLS 物件：將 Key(group) 與 Value(items) 取出渲染 */}
            {Object.entries(SKILLS).map(([group, items]) => (
              <div key={group}>
                
                {/* 分組標題 (例如：技能、也碰過) */}
                <p style={{ color: sub, fontSize: 13, marginBottom: 16, letterSpacing: 1 }}>
                  {group}
                </p>

                {/* 技能標籤雲 (Flexbox 佈局) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {items.map(skill => (
                    <span
                      key={skill}
                      style={{
                        /** 
                         * 背景色處理：
                         * ${ACCENT}22 代表在十六進位顏色後加上 22 (約 13% 的透明度)
                         * 這種技巧常用於實作具有主題色的淺色背景
                         */
                        background: group === '技能' ? `${ACCENT}22` : 'transparent',
                        border: `1px solid ${group === '技能' ? ACCENT : border}`,
                        color: group === '技能' ? ACCENT : sub,
                        borderRadius: 6,
                        padding: '6px 14px',
                        fontSize: 14,
                        transition: 'border-color 0.3s, color 0.3s',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  )
}

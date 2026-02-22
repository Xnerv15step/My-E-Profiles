// ── 常數設定 ──
const ACCENT = '#00BFFF' // 全域強調色（藍色）
const NAV_LINKS = ['about', 'skills', 'projects', 'contact'] // 導覽選單項目

/**
 * ── Navbar 導覽列元件 ──
 * @param {boolean} dark - 當前是否為深色模式
 * @param {function} setDark - 用於切換 dark 狀態的 setter 函式（狀態提升至 App.js 管理）
 */
export default function Navbar({ dark, setDark }) {
  
  // ── 根據 Dark/Light Mode 決定樣式變數 ──
  // 使用 rgba 配合 backdropFilter 達到半透明毛玻璃質感
  const bg = dark ? 'rgba(15,15,15,0.85)' : 'rgba(245,245,245,0.85)'
  const border = dark ? '#2a2a2a' : '#e0e0e0'
  const sub = dark ? '#888' : '#666'
  const text = dark ? '#e5e5e5' : '#1a1a1a'

  /**
   * 平滑捲動至目標區塊
   * 使用原生 [scrollIntoView](https://developer.mozilla.org) 實作
   */
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      // 固定在最上方，不隨捲動消失
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100, // 確保層級在所有內容（如 FadeSection）之上
      
      background: bg,
      backdropFilter: 'blur(10px)',      // [現代瀏覽器特效](https://developer.mozilla.org)：背景模糊，增加質感
      borderBottom: `1px solid ${border}`,
      
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      height: 56, // 對應 Hero 元件的 paddingTop 防止內容重疊
      transition: 'background 0.3s, border-color 0.3s', // 切換模式時平滑過渡
    }}>
      
      {/* Logo 區塊 */}
      <span style={{ 
        color: ACCENT, 
        fontWeight: 700, 
        fontSize: 18, 
        letterSpacing: 1,
        cursor: 'default'
      }}>
        蔡樂弦
      </span>

      {/* 右側：導覽連結 + 模式切換按鈕 */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        
        {/* 動態渲染導覽清單 */}
        {NAV_LINKS.map(s => (
          <button
            key={s}
            onClick={() => scrollTo(s)}
            style={{
              background: 'none',
              border: 'none',
              color: sub,
              cursor: 'pointer',
              fontSize: 14,
              textTransform: 'capitalize', // 讓首字母大寫
              transition: 'color 0.2s',
            }}
            // Hover 效果：變更顏色為強調色
            onMouseEnter={e => e.target.style.color = ACCENT}
            onMouseLeave={e => e.target.style.color = sub}
          >
            {s}
          </button>
        ))}

        {/* 主題切換按鈕：控制全域的 dark 狀態 */}
        <button
          onClick={() => setDark(d => !d)} // 觸發父元件狀態更新
          style={{
            background: 'none',
            border: `1px solid ${border}`,
            borderRadius: 20, // 藥丸型狀外觀
            padding: '4px 12px',
            cursor: 'pointer',
            color: text,
            fontSize: 13,
            transition: 'all 0.3s ease',
          }}
        >
          {/* 根據當前模式切換圖示與文字 */}
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  )
}

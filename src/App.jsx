import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

/**
 * ── App 主進入點 ──
 * 核心職責：
 * 1. 定義全域深淺色狀態 (Theme State)
 * 2. 統整並渲染所有頁面區塊 (Layout Composition)
 */
function App() {
  // ── 全域狀態：深色模式 ──
  // 預設為 true (深色)，此狀態會透過 Props 傳遞給所有子元件
  const [dark, setDark] = useState(true)

  return (
    /* 最外層容器：負責全螢幕背景色切換 */
    <div style={{
      // 根據狀態動態切換背景與文字主色
      background: dark ? '#0f0f0f' : '#f5f5f5',
      color: dark ? '#e5e5e5' : '#1a1a1a',
      
      minHeight: '100vh',      // 確保內容不夠多時，背景依然撐滿整個視窗
      transition: 'all 0.3s', // 讓深淺色切換時，顏色變化具有平滑的過渡感
    }}>
      
      {/* 
        ── Navbar 導覽列 ──
        特別傳入 setDark，讓導覽列上的按鈕能修改父元件(App)的狀態 
      */}
      <Navbar dark={dark} setDark={setDark} />

      {/* 
        ── 內容區塊 ──
        所有元件皆接收 dark prop，以維持視覺風格的一致性
      */}
      <Hero dark={dark} />
      <About dark={dark} />
      <Skills dark={dark} />
      <Projects dark={dark} />
      <Contact dark={dark} />
      
    </div>
  )
}

export default App

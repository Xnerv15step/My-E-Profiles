import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // 引入全域樣式（重置樣式與基礎字體）
import App from './App.jsx' // 引入根元件

/**
 * ── 應用程式掛載點 ──
 * 1. [document.getElementById('root')]: 抓取 index.html 中唯一的 div 容器。
 * 2. [createRoot]: 初始化 React 18 的並行渲染引擎。
 * 3. [render]: 將元件轉換為 DOM 節點並渲染至畫面。
 */
createRoot(document.getElementById('root')).render(
  /**
   * [StrictMode]: 開發模式下的輔助工具
   * - 會故意執行兩次渲染來檢查是否有不正確的副作用 (Side Effects)。
   * - 幫助開發者提早發現過時的 API 或潛在的邏輯錯誤。
   * - ⚠️ 注意：這只會在「開發環境」生效，正式上線後不會執行兩次。
   */
  <StrictMode>
    <App />
  </StrictMode>,
)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/My-E-Profiles/', // 務必確保斜線與大小寫與 Repo 名稱一致
})

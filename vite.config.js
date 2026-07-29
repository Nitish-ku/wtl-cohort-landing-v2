import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  // Fail loudly instead of silently shipping a bundle that builds
  // "undefined/api/register" URLs (see src/lib/api.js). VITE_API_BASE_URL
  // must come from a real .env file (.env.production for `vite build`) or
  // be set in the build environment.
  if (command === 'build' && !env.VITE_API_BASE_URL) {
    throw new Error(
      'VITE_API_BASE_URL is not set. Create a .env.production file (or set ' +
        'the variable in the build environment) before running `vite build`.'
    )
  }

  return {
    plugins: [react(), tailwindcss()],
    // wtl-backend's CORS allowlist (src/index.js) only permits
    // http://localhost:3000 in non-production mode. Vite's default dev
    // port is 5173, so without this pin, npm run dev is unreachable by the
    // local backend. 3000 is chosen to match that hardcoded allowlist
    // entry, not an arbitrary preference.
    server: {
      port: 3000,
      strictPort: true,
    },
    test: {
      passWithNoTests: true,
      environment: 'jsdom',
    },
  }
})

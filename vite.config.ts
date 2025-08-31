import { defineConfig, loadEnv  } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
// })

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [tailwindcss(), react()],
    define: {
      'process.env': env,
    },
  });
}
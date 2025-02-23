import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_URL || '/';

  return {
    base,
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
  };
});

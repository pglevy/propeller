/// <reference types="vitest/config" />
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vite.dev/config/
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

export default defineConfig(({ mode }) => {
  // Library build configuration
  if (mode === 'library') {
    return {
      plugins: [
        react(),
        dts({
          tsconfigPath: './tsconfig.lib.json',
        }),
      ],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src")
        }
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          formats: ['es'],
          fileName: 'index',
        },
        rollupOptions: {
          external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            /^@radix-ui\/.*/,
            'lucide-react',
            'wouter',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'cmdk',
            'date-fns',
            'embla-carousel-react',
            'input-otp',
            'next-themes',
            'react-day-picker',
            'react-hook-form',
            'react-resizable-panels',
            'recharts',
            'sonner',
            'vaul',
            'zod',
            '@hookform/resolvers',
          ],
          output: {
            preserveModules: true,
            preserveModulesRoot: 'src',
            entryFileNames: '[name].js',
          },
        },
        outDir: 'dist',
      },
    }
  }

  // Development/Storybook configuration
  return {
    base: mode === 'production' ? '/propeller/' : '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    test: {
      projects: [
        // Unit tests project
        {
          test: {
            name: 'unit',
            include: ['tests/**/*.test.ts', 'src/**/*.test.ts'],
            environment: 'node',
          }
        },
        // Component tests project (React components with jsdom)
        {
          extends: true,
          test: {
            name: 'component',
            include: ['src/**/*.test.tsx'],
            environment: 'jsdom',
          }
        },
        // Storybook tests project
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(dirname, '.storybook')
            })
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [{
                browser: 'chromium'
              }]
            },
            setupFiles: ['.storybook/vitest.setup.ts']
          }
        }
      ]
    }
  }
});


import { presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import { VitePluginConfig } from '@unocss/vite';

const unoCSSConfig: VitePluginConfig = {
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'margin-right': '0.5rem',
      },
    }),
    presetUno({
      dark: "media",
      theme: {
        colors: {
          primary: {
            800: '#1E429F',
            600: '#1C64F2',
          },
          gray: {
            900: '#111928',
            500: '#6B7280',
            300: '#D1D5DB',
            200: '#E5E7EB',
          },
          blue: {
            50: '#E2E4EB',
          },
        },
      },
    })
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|stories.ts)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    }
  }
}

export default unoCSSConfig;
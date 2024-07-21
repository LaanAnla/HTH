import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        mint: {
          '50': '#f5f5f9',
          '100': '#e7e8f2',
          '200': '#d5d6e8',
          '300': '#b8bbd8',
          '400': '#9598c5',
          '500': '#7c7cb5',
          '600': '#6e6aa6',
          '700': '#655e97',
          '800': '#56507d',
          '900': '#474365',
          '950': '#302d40',
        },
      },
    },
  },
}

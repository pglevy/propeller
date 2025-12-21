import type { Preview } from '@storybook/react-vite'
import type { ReactRenderer } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/index.css'
import React from 'react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    backgrounds: {
      disable: true,
    },
  },

  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => (
      <div className="bg-background text-foreground p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview;

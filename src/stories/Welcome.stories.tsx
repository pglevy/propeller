import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Welcome',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Propeller Component Library
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          A collection of accessible, composable React components built with
          Radix UI, Tailwind CSS, and shadcn/ui patterns.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Getting Started
            </h2>
            <p className="text-muted-foreground mb-4">
              Browse the components in the sidebar to explore available UI
              primitives and domain-specific components.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Key Features
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Fully accessible with semantic ARIA</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Built on Radix UI primitives</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Themable with CSS variables</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Composable and flexible</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  ),
}

import { describe, it, expect } from "vitest"
import fc from "fast-check"
import { render, cleanup, act } from "@testing-library/react"
import { StoryMapRelease } from "./StoryMapRelease"
import type { ReleaseStatus } from "./story-map-release-types"

// Feature: story-map-release, Property 1: Header renders all required elements
describe("StoryMapRelease", () => {
  const releaseStatusArb = fc.constantFrom<ReleaseStatus>(
    "not started",
    "checking readiness",
    "ready for build",
    "building",
  )

  const statusLabelMap: Record<ReleaseStatus, string> = {
    "not started": "Not Started",
    "checking readiness": "Checking Readiness",
    "ready for build": "Ready for Build",
    "building": "Building",
  }

  /**
   * **Validates: Requirements 1.1, 1.3**
   *
   * For any valid combination of title, status, and storyCount props,
   * the rendered StoryMapRelease contains: a title element with the provided text,
   * a badge element, a text element containing the storyCount number,
   * a menu button, and a collapse toggle button.
   */
  it("Property 1: Header renders all required elements with correct story count", () => {
    // Feature: story-map-release, Property 1: Header renders all required elements
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
        releaseStatusArb,
        fc.nat({ max: 1000 }),
        (title, status, storyCount) => {
          cleanup()
          const { container, getByLabelText } = render(
            <StoryMapRelease title={title} status={status} storyCount={storyCount} />,
          )

          // Title element is present with correct text
          const titleEl = container.querySelector('[data-slot="release-title"]')
          expect(titleEl).not.toBeNull()
          expect(titleEl!.textContent).toBe(title)

          // Status badge is present with correct label
          const badgeEl = container.querySelector('[data-slot="badge"]')
          expect(badgeEl).not.toBeNull()
          expect(badgeEl!.textContent).toBe(statusLabelMap[status])

          // Story count text is present
          const countEl = container.querySelector('[data-slot="release-story-count"]')
          expect(countEl).not.toBeNull()
          const expectedCount = storyCount === 1 ? "1 story" : `${storyCount} stories`
          expect(countEl!.textContent).toContain(String(storyCount))
          expect(countEl!.textContent?.trim()).toBe(expectedCount)

          // Menu button with aria-label "Release actions"
          expect(getByLabelText("Release actions")).not.toBeNull()

          // Collapse toggle button
          expect(getByLabelText("Collapse release")).not.toBeNull()
        },
      ),
      { numRuns: 100 },
    )
  })
})

// Feature: story-map-release, Property 3: Collapse round-trip
describe("StoryMapRelease collapse toggle", () => {
  /**
   * **Validates: Requirements 3.1, 3.2**
   *
   * For any initial open state (expanded or collapsed), toggling the
   * collapse button twice returns the content area to its original
   * visibility state.
   */
  it("Property 3: Collapse toggle round-trip preserves visibility", () => {
    fc.assert(
      fc.property(fc.boolean(), (initialOpen) => {
        cleanup()
        const { container } = render(
          <StoryMapRelease
            status="not started"
            storyCount={0}
            defaultOpen={initialOpen}
          >
            <div data-testid="child-content">Content</div>
          </StoryMapRelease>,
        )

        const isContentVisible = () =>
          container.querySelector('[data-slot="release-columns"]') !== null

        // Check initial visibility
        expect(isContentVisible()).toBe(initialOpen)

        // Find the toggle button via data-slot
        const toggleBtn = container.querySelector('[data-slot="collapsible-trigger"]') as HTMLElement

        // First toggle: flip the state
        act(() => { toggleBtn.click() })
        expect(isContentVisible()).toBe(!initialOpen)

        // Second toggle: flip back to original
        act(() => { toggleBtn.click() })
        expect(isContentVisible()).toBe(initialOpen)
      }),
      { numRuns: 100 },
    )
  })
})


// Feature: story-map-release, Property 4: Children rendered
describe("StoryMapRelease children rendering", () => {
  /**
   * **Validates: Requirements 4.2**
   *
   * For any set of React children passed to StoryMapRelease,
   * all children appear within the collapsible content area
   * when the component is expanded.
   */
  it("Property 4: Children are rendered in the content area", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        (childCount) => {
          cleanup()
          const children = Array.from({ length: childCount }, (_, i) => (
            <div key={i} data-testid={`child-${i}`}>
              Child {i}
            </div>
          ))

          const { getByTestId } = render(
            <StoryMapRelease status="not started" storyCount={0} defaultOpen={true}>
              {children}
            </StoryMapRelease>,
          )

          for (let i = 0; i < childCount; i++) {
            expect(getByTestId(`child-${i}`)).not.toBeNull()
          }
        },
      ),
      { numRuns: 100 },
    )
  })
})


// Feature: story-map-release, Property 5: className forwarding
describe("StoryMapRelease className forwarding", () => {
  /**
   * **Validates: Requirements 6.1**
   *
   * For any className string passed to StoryMapRelease,
   * the root element includes that className in its class list.
   */
  it("Property 5: className is forwarded to the root element", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9-]{0,29}$/),
        (generatedClass) => {
          cleanup()
          const { container } = render(
            <StoryMapRelease status="not started" storyCount={0} className={generatedClass} />,
          )

          const root = container.querySelector('[data-slot="story-map-release"]')
          expect(root).not.toBeNull()
          expect(root!.classList.contains(generatedClass)).toBe(true)
        },
      ),
      { numRuns: 100 },
    )
  })
})

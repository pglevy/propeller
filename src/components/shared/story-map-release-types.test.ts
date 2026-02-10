import { describe, it, expect } from "vitest"
import fc from "fast-check"
import { getStatusBadgeProps, type ReleaseStatus } from "./story-map-release-types"

// Feature: story-map-release, Property 2: Status badge mapping
describe("getStatusBadgeProps", () => {
  const expectedMapping: Record<ReleaseStatus, { variant: "default" | "secondary" | "outline"; label: string }> = {
    "not started": { variant: "secondary", label: "Not Started" },
    "checking readiness": { variant: "outline", label: "Checking Readiness" },
    "ready for build": { variant: "default", label: "Ready for Build" },
    "building": { variant: "default", label: "Building" },
  }

  /**
   * **Validates: Requirements 1.4**
   *
   * For any ReleaseStatus value, getStatusBadgeProps returns the correct
   * badge variant and label string that uniquely identifies that status.
   */
  it("Property 2: returns correct variant and label for all statuses", () => {
    // Feature: story-map-release, Property 2: Status badge mapping
    const releaseStatusArb = fc.constantFrom<ReleaseStatus>(
      "not started",
      "checking readiness",
      "ready for build",
      "building"
    )

    fc.assert(
      fc.property(releaseStatusArb, (status) => {
        const result = getStatusBadgeProps(status)
        const expected = expectedMapping[status]

        expect(result.variant).toBe(expected.variant)
        expect(result.label).toBe(expected.label)
      }),
      { numRuns: 100 }
    )
  })
})

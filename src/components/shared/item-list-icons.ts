import {
  FileText,
  Workflow,
  Database,
  HardDrive,
  Layout,
  Ruler,
  Calculator,
  Variable,
} from "lucide-react"
import type { ObjectTypeKey, IconConfig } from "./item-list-types"

/**
 * Canonical Icon Set - Product Brand Definition
 *
 * This defines the visual brand identity for object types across the entire product.
 * Each object type has a unique Aurora Design System color pairing:
 * - Background: Light shade (-1) for subtle, accessible backgrounds
 * - Foreground: Dark shade (-4) for strong contrast and readability
 *
 * Color Semantics:
 * - Green: Documents, content (natural, growth)
 * - Purple: Process models, workflows (logic, transformation)
 * - Orange: Record types, data structures (warm, foundational)
 * - Sky: Data stores, databases (reliable, stable)
 * - Teal: Interfaces, connections (bridging, communication)
 * - Blue: Rules, logic (technical, precise)
 * - Pink: Expressions, calculations (dynamic, computed)
 * - Gray: Constants, utilities (neutral, unchanging)
 */
export const ITEM_LIST_ICONS: Record<ObjectTypeKey, IconConfig> = {
  document: {
    icon: FileText,
    bg: "var(--aurora-green-1)",
    fg: "var(--aurora-green-4)",
  },
  processModel: {
    icon: Workflow,
    bg: "var(--aurora-purple-1)",
    fg: "var(--aurora-purple-4)",
  },
  recordType: {
    icon: Database,
    bg: "var(--aurora-orange-1)",
    fg: "var(--aurora-orange-4)",
  },
  dataStore: {
    icon: HardDrive,
    bg: "var(--aurora-sky-1)",
    fg: "var(--aurora-sky-4)",
  },
  interface: {
    icon: Layout,
    bg: "var(--aurora-teal-1)",
    fg: "var(--aurora-teal-4)",
  },
  rule: {
    icon: Ruler,
    bg: "var(--aurora-blue-1)",
    fg: "var(--aurora-blue-4)",
  },
  expression: {
    icon: Calculator,
    bg: "var(--aurora-pink-1)",
    fg: "var(--aurora-pink-4)",
  },
  constant: {
    icon: Variable,
    bg: "var(--aurora-gray-1)",
    fg: "var(--aurora-gray-4)",
  },
} as const

/**
 * Get icon configuration for a specific object type
 *
 * @param objectType - The object type key
 * @returns Icon configuration with Aurora color pairing
 *
 * @example
 * const config = getItemIcon("document")
 * // Returns: { icon: FileText, bg: "var(--aurora-green-1)", fg: "var(--aurora-green-4)" }
 */
export function getItemIcon(objectType: ObjectTypeKey): IconConfig {
  return ITEM_LIST_ICONS[objectType]
}

/**
 * Expansion Guide:
 *
 * When adding new object types to the canonical icon set:
 *
 * 1. Choose an unused Aurora color from the palette:
 *    - Red, Orange, Yellow (warm tones - warnings, alerts, high-priority)
 *    - Green, Teal (success, data, natural objects)
 *    - Sky, Blue, Purple (technical, processes, logic)
 *    - Pink (special cases, highlights)
 *    - Gray (neutral, constants, utilities)
 *
 * 2. Use consistent shade pairing:
 *    - Background: Lightest shade (-1) for subtle, accessible backgrounds
 *    - Foreground: Darker shade (-4 or -35) for strong contrast
 *
 * 3. Update the ObjectTypeKey type in item-list-types.ts
 *
 * 4. Add the new mapping to ITEM_LIST_ICONS with color semantics documented
 *
 * 5. Update the IconShowcase story to display the new object type
 */

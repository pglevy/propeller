#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Hex to OKLCH conversion
function hexToOklch(hex) {
  // Remove # if present
  hex = hex.replace('#', '')

  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255
  const g = parseInt(hex.substr(2, 2), 16) / 255
  const b = parseInt(hex.substr(4, 2), 16) / 255

  // Convert RGB to linear RGB
  const toLinear = (c) => {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }

  const rl = toLinear(r)
  const gl = toLinear(g)
  const bl = toLinear(b)

  // Linear RGB to XYZ (D65 illuminant)
  const x = 0.4124564 * rl + 0.3575761 * gl + 0.1804375 * bl
  const y = 0.2126729 * rl + 0.7151522 * gl + 0.0721750 * bl
  const z = 0.0193339 * rl + 0.1191920 * gl + 0.9503041 * bl

  // XYZ to OKLab
  const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
  const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
  const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z)

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

  // OKLab to OKLCH
  const C = Math.sqrt(a * a + b_ * b_)
  let H = Math.atan2(b_, a) * 180 / Math.PI
  if (H < 0) H += 360

  // Round to reasonable precision
  const lightness = Math.round(L * 10000) / 10000
  const chroma = Math.round(C * 10000) / 10000
  const hue = Math.round(H * 100) / 100

  return { L: lightness, C: chroma, H: hue }
}

function formatOklch({ L, C, H }) {
  // Format for CSS
  return `oklch(${L.toFixed(2)} ${C.toFixed(2)} ${H.toFixed(0)})`
}

// Simple YAML parser for our specific colors.yml format
function parseColorsYaml(yamlContent) {
  const colors = {}
  let currentColor = null

  const lines = yamlContent.split('\n')

  for (const line of lines) {
    // Match color family (e.g., "  red:")
    const familyMatch = line.match(/^  (\w+):/)
    if (familyMatch) {
      currentColor = familyMatch[1]
      colors[currentColor] = []
      continue
    }

    // Match name (e.g., '    - name: "Red 0"')
    const nameMatch = line.match(/- name:\s*"([^"]+)"/)
    if (nameMatch && currentColor) {
      colors[currentColor].push({ name: nameMatch[1] })
      continue
    }

    // Match hex (e.g., '      hex: "#FDEDF0"')
    const hexMatch = line.match(/hex:\s*"?(#[A-Fa-f0-9]{6})"?/)
    if (hexMatch && currentColor && colors[currentColor].length > 0) {
      const lastShade = colors[currentColor][colors[currentColor].length - 1]
      lastShade.hex = hexMatch[1]
    }
  }

  return { colors }
}

async function syncColors(command = 'sync') {
  const auroraPath = '/Users/philip.levy/Documents/GitHub/aurora/data/colors.yml'
  const propellerCssPath = join(__dirname, '../../src/index.css')

  try {
    // Read Aurora colors.yml
    const yamlContent = await readFile(auroraPath, 'utf-8')
    const data = parseColorsYaml(yamlContent)

    if (!data || !data.colors) {
      throw new Error('Invalid colors.yml format')
    }

    // Generate CSS variables
    const cssVariables = []
    cssVariables.push('  /* === Canonical Aurora Palette === */')

    for (const [colorFamily, shades] of Object.entries(data.colors)) {
      cssVariables.push(`  /* ${colorFamily.charAt(0).toUpperCase() + colorFamily.slice(1)} */`)

      for (const shade of shades) {
        // Extract level from name (e.g., "Red 3" -> "3")
        const match = shade.name.match(/\d+/)
        const level = match ? match[0] : '0'

        // Convert hex to oklch
        const oklch = hexToOklch(shade.hex)
        const cssValue = formatOklch(oklch)

        // Generate variable name
        const varName = `--aurora-${colorFamily}-${level}`
        cssVariables.push(`  ${varName}: ${cssValue}; /* ${shade.hex} */`)
      }

      cssVariables.push('') // Empty line between color families
    }

    // Read current CSS file
    const currentCss = await readFile(propellerCssPath, 'utf-8')

    // Find where to insert canonical palette
    // Look for :root { and insert after radius definition
    const rootMatch = currentCss.match(/(:root\s*{[\s\S]*?--radius:\s*[^;]+;)/m)

    if (!rootMatch) {
      throw new Error('Could not find :root block in index.css')
    }

    // Check if canonical palette already exists
    const hasCanonical = currentCss.includes('=== Canonical Aurora Palette ===')

    let updatedCss
    if (hasCanonical) {
      // Replace existing canonical palette
      updatedCss = currentCss.replace(
        /\/\* === Canonical Aurora Palette === \*\/[\s\S]*?(?=\n\s*\/\* Aurora-based)/m,
        cssVariables.join('\n') + '\n'
      )
    } else {
      // Insert after radius definition
      const insertAfter = rootMatch[1]
      updatedCss = currentCss.replace(
        insertAfter,
        insertAfter + '\n\n' + cssVariables.join('\n')
      )
    }

    // Write updated CSS
    await writeFile(propellerCssPath, updatedCss, 'utf-8')

    console.log('✅ Successfully synced Aurora colors to Propeller!')
    console.log(`📦 Processed ${Object.keys(data.colors).length} color families`)

    // Show sample of generated variables
    console.log('\nSample variables generated:')
    console.log(cssVariables.slice(0, 10).join('\n'))

  } catch (error) {
    console.error('❌ Error syncing colors:', error.message)
    process.exit(1)
  }
}

// Parse command line arguments
const command = process.argv[2] || 'sync'

if (command === 'sync' || command === 'generate' || command === 'update') {
  await syncColors(command)
} else if (command === 'convert' && process.argv[3]) {
  // Single color conversion
  const hex = process.argv[3]
  const oklch = hexToOklch(hex)
  console.log(`${hex} → ${formatOklch(oklch)}`)
} else {
  console.log('Usage:')
  console.log('  aurora-colors sync           # Sync all colors from Aurora to Propeller')
  console.log('  aurora-colors convert #HEX   # Convert a single hex color to oklch')
  process.exit(1)
}

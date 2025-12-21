import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

/**
 * This test enforces that all components use approved color tokens
 * from our design system instead of arbitrary color values.
 *
 * Approved: bg-primary, text-muted-foreground, border-info, etc.
 * Forbidden: bg-[#FFFFFF], text-[rgb(255,0,0)], bg-white (except specific cases)
 */

// Recursively get all .tsx and .ts files from a directory
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = readdirSync(dirPath)

  files.forEach((file) => {
    const filePath = join(dirPath, file)
    if (statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      arrayOfFiles.push(filePath)
    }
  })

  return arrayOfFiles
}

// Patterns that indicate hardcoded colors (forbidden)
const FORBIDDEN_PATTERNS = [
  // Arbitrary hex values: bg-[#FFFFFF], text-[#000000]
  {
    pattern: /(?:bg|text|border|ring|outline|shadow|from|to|via)-\[#[0-9A-Fa-f]{6}\]/g,
    description: 'Arbitrary hex color (e.g., bg-[#FFFFFF])',
  },
  // Arbitrary rgb/rgba: bg-[rgb(255,255,255)]
  {
    pattern: /(?:bg|text|border|ring|outline|shadow|from|to|via)-\[rgba?\([^\]]+\)\]/g,
    description: 'Arbitrary RGB color (e.g., bg-[rgb(255,255,255)])',
  },
  // Arbitrary hsl/hsla: bg-[hsl(0,0%,100%)]
  {
    pattern: /(?:bg|text|border|ring|outline|shadow|from|to|via)-\[hsla?\([^\]]+\)\]/g,
    description: 'Arbitrary HSL color (e.g., bg-[hsl(0,0%,100%)])',
  },
  // Arbitrary oklch: bg-[oklch(1 0 0)]
  {
    pattern: /(?:bg|text|border|ring|outline|shadow|from|to|via)-\[oklch\([^\]]+\)\]/g,
    description: 'Arbitrary OKLCH color (e.g., bg-[oklch(1 0 0)])',
  },
  // Direct Aurora variable usage (should use semantic tokens instead)
  {
    pattern: /(?:bg|text|border|ring|outline|shadow|from|to|via)-\[--aurora-[^\]]+\]/g,
    description: 'Direct Aurora variable (use semantic tokens like bg-primary instead)',
  },
  // Standard Tailwind color scale: bg-red-500, text-blue-100, border-green-600
  {
    pattern: /(?:bg|text|border|ring|outline|shadow|from|to|via)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950)\b/g,
    description: 'Standard Tailwind color (e.g., bg-green-500, text-blue-100) - use semantic tokens instead',
  },
]

// Specific exceptions that are allowed
const ALLOWED_EXCEPTIONS = [
  'bg-white', // Only in specific cases - we'll flag but can override
  'bg-black',
  'text-white',
  'text-black',
]

// Files to skip (generated files, tests, etc.)
const SKIP_FILES = [
  'node_modules',
  '.storybook',
  'stories', // Example stories from Storybook init
  '.test.ts',
  '.test.tsx',
  '.spec.ts',
  '.spec.tsx',
]

describe('Color Palette Enforcement', () => {
  it('should only use approved color tokens in components', () => {
    const srcPath = join(process.cwd(), 'src')
    const allFiles = getAllFiles(srcPath)

    // Filter out files we want to skip
    const componentFiles = allFiles.filter((file) => {
      return !SKIP_FILES.some((skip) => file.includes(skip))
    })

    const violations: Array<{
      file: string
      line: number
      column: number
      match: string
      description: string
      context: string
    }> = []

    for (const file of componentFiles) {
      const content = readFileSync(file, 'utf-8')
      const lines = content.split('\n')

      // Check each forbidden pattern
      for (const { pattern, description } of FORBIDDEN_PATTERNS) {
        let match
        // Reset regex
        pattern.lastIndex = 0

        while ((match = pattern.exec(content)) !== null) {
          // Find which line this match is on
          let currentPos = 0
          let lineNumber = 0
          let columnNumber = 0

          for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length + 1 // +1 for newline
            if (currentPos + lineLength > match.index) {
              lineNumber = i + 1
              columnNumber = match.index - currentPos + 1
              break
            }
            currentPos += lineLength
          }

          // Get context (the line where violation occurred)
          const contextLine = lines[lineNumber - 1]?.trim() || ''

          violations.push({
            file: file.replace(srcPath, 'src'),
            line: lineNumber,
            column: columnNumber,
            match: match[0],
            description,
            context: contextLine,
          })
        }
      }
    }

    // Format error message
    if (violations.length > 0) {
      const errorMessage = [
        '\n',
        '❌ Color Palette Violations Found',
        '─'.repeat(80),
        '',
        violations
          .map(
            (v, i) =>
              `${i + 1}. ${v.file}:${v.line}:${v.column}\n` +
              `   Problem: ${v.description}\n` +
              `   Found: ${v.match}\n` +
              `   Context: ${v.context}\n`
          )
          .join('\n'),
        '─'.repeat(80),
        '',
        '💡 How to fix:',
        '   • Use semantic tokens: bg-primary, text-muted-foreground, border-info',
        '   • Or use Aurora variables: var(--aurora-blue-3)',
        '   • See AGENTS.md for approved color system',
        '',
        `Total violations: ${violations.length}`,
        '',
      ].join('\n')

      expect.fail(errorMessage)
    }

    // Success message
    console.log(`✅ Checked ${componentFiles.length} files - no color violations found!`)
  })

  it('should use semantic tokens instead of direct colors', () => {
    // This is a softer check for bg-white, bg-black usage
    const srcPath = join(process.cwd(), 'src/components')
    const allFiles = getAllFiles(srcPath)

    const componentFiles = allFiles.filter((file) => {
      return !SKIP_FILES.some((skip) => file.includes(skip))
    })

    const warnings: Array<{
      file: string
      line: number
      usage: string
      suggestion: string
    }> = []

    for (const file of componentFiles) {
      const content = readFileSync(file, 'utf-8')
      const lines = content.split('\n')

      // Check for bg-white/bg-black usage
      lines.forEach((line, index) => {
        if (line.includes('bg-white') && !line.includes('bg-white-'))  {
          warnings.push({
            file: file.replace(srcPath, 'src/components'),
            line: index + 1,
            usage: 'bg-white',
            suggestion: 'Consider using bg-background instead',
          })
        }
        if (line.includes('text-black')) {
          warnings.push({
            file: file.replace(srcPath, 'src/components'),
            line: index + 1,
            usage: 'text-black',
            suggestion: 'Consider using text-foreground instead',
          })
        }
      })
    }

    // This is a warning, not a failure
    if (warnings.length > 0) {
      console.warn('\n⚠️  Suggestions for semantic token usage:')
      warnings.forEach((w) => {
        console.warn(`   ${w.file}:${w.line} - ${w.usage} → ${w.suggestion}`)
      })
      console.warn('')
    }
  })
})

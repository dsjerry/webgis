<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import type { ExampleFile } from '@/types/example'

const props = defineProps<{ files: ExampleFile[] }>()

const activeFileIndex = ref(0)
const copied = ref(false)

const activeFile = computed(() => props.files[activeFileIndex.value])

const langLabels: Record<string, string> = {
  vue: 'Vue', ts: 'TypeScript', tsx: 'TSX', js: 'JavaScript', html: 'HTML', css: 'CSS',
  python: 'Python', py: 'Python', sql: 'SQL', json: 'JSON', yaml: 'YAML', bash: 'Bash',
  sh: 'Shell', dockerfile: 'Dockerfile', dockercompose: 'Docker Compose', txt: 'Text',
}

function langLabel(lang: string): string {
  return langLabels[lang] || lang.toUpperCase()
}

const langColors: Record<string, string> = {
  vue: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  ts: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  tsx: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  js: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  html: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  css: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  python: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  py: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  sql: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  json: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  yaml: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  bash: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  sh: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  dockerfile: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  dockercompose: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  txt: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
}

const languageColor = computed(() => langColors[activeFile.value?.language] || langColors.txt)

// Simple syntax highlighting for common languages
function highlightCode(code: string, lang: string): string {
  if (!code) return ''

  // Escape HTML
  code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Apply highlighting patterns
  const patterns: [RegExp, string][] = [
    // Strings
    [/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, 'tok-str'],
    // Comments
    [/\/\/.*/g, 'tok-comment'],
    [/#.*/g, 'tok-comment'],
    [/\/\*[\s\S]*?\*\//g, 'tok-comment'],
    [/(?:#|<!--)[\s\S]*?(?:-->|#)/g, 'tok-comment'],
    // Numbers
    [/\b\d+\.?\d*\b/g, 'tok-num'],
    // Keywords
    [/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|extends|super|static|get|set|typeof|instanceof|default|of|in|on|true|false|null|undefined|void|type|interface|enum|namespace|as|readonly|private|public|protected|abstract|implements|declare|keyof|infer)\b/g, 'tok-kw'],
    // Python keywords
    [/\b(def|class|import|from|return|if|elif|else|for|while|with|as|try|except|raise|finally|pass|break|continue|lambda|yield|global|nonlocal|assert|del|True|False|None|and|or|not|is|in|not in|async|await)\b/g, 'tok-kw'],
    // Type keywords
    [/\b(string|number|boolean|any|unknown|never|void|object|Array|Promise|Record|Partial|Required|Readonly|Pick|Omit|int|float|str|bool|list|dict|tuple|set|Optional|List|Dict|Any|Union|Optional)\b/g, 'tok-type'],
    // HTML/Component tags
    [/(<\/?)([\w-]+)/g, 'tok-tag'],
    [/(>)/g, 'tok-tag'],
    // CSS selectors/properties
    [/([\w-]+)(\s*:\s*)/g, 'tok-prop'],
    // Function calls
    [/\b([a-zA-Z_]\w*)(\s*\()/g, 'tok-fn'],
    // SQL keywords
    [/\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|INDEX|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|NOT|NULL|AS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|DISTINCT|COUNT|SUM|AVG|MAX|MIN|UNION|ALL|EXISTS|LIKE|IN|BETWEEN|INTO|VALUES|SET|CASCADE)\b/gi, 'tok-kw'],
    // Decorators / annotations
    [/@\w+/g, 'tok-deco'],
    // Attribute values in HTML
    [/(\w+)(=)/g, 'tok-attr'],
  ]

  for (const [pattern, cls] of patterns) {
    code = code.replace(pattern, (match, ...args) => {
      if (cls === 'tok-tag') {
        const isClosing = args[0] === '</'
        const tagName = args[1]
        if (isClosing) {
          return `</span><span class="hl-${cls}">&lt;/</span><span class="hl-${cls} hl-tag">${tagName}</span><span class="hl-${cls}">`
        }
        return `<span class="hl-${cls}">&lt;</span><span class="hl-${cls} hl-tag">${tagName}</span>`
      }
      if (cls === 'tok-attr') {
        return `<span class="hl-${cls}">${args[0]}</span><span class="hl-${cls}">=`
      }
      return `<span class="hl-${cls}">${match}</span>`
    })
  }

  return code
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(activeFile.value?.code || '')
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // fallback
  }
}

// Reset active file when example changes
watch(() => props.files, () => {
  activeFileIndex.value = 0
})
</script>

<template>
  <div class="flex flex-col h-full min-h-0">
    <!-- File tabs -->
    <div v-if="files.length > 1" class="flex-shrink-0 flex items-center gap-1 px-3 py-2 border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
      <button
        v-for="(file, i) in files"
        :key="i"
        class="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all whitespace-nowrap"
        :class="activeFileIndex === i
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'"
        @click="activeFileIndex = i"
      >
        <!-- File icon -->
        <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        {{ file.filename }}
      </button>
    </div>

    <!-- Code header -->
    <div class="flex-shrink-0 flex items-center justify-between px-4 py-1.5 bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
      <div class="flex items-center gap-2">
        <span :class="['px-1.5 py-0.5 rounded text-[10px] font-semibold', languageColor]">
          {{ langLabel(activeFile?.language || 'txt') }}
        </span>
        <span class="text-[10px] text-gray-400">{{ activeFile?.filename }}</span>
      </div>
      <button
        class="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] transition-all"
        :class="copied
          ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30'
          : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
        @click="copyCode"
      >
        <svg v-if="!copied" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <!-- Code body -->
    <div class="flex-1 overflow-auto min-h-0 relative">
      <pre class="p-4 text-[12px] leading-[1.65] font-mono min-h-full"><code v-html="highlightCode(activeFile?.code || '', activeFile?.language || 'txt')" /></pre>
    </div>
  </div>
</template>

<style>
.hl-tok-str { color: #16a34a; }
.hl-tok-comment { color: #9ca3af; font-style: italic; }
.hl-tok-num { color: #2563eb; }
.hl-tok-kw { color: #7c3aed; font-weight: 500; }
.hl-tok-type { color: #0891b2; }
.hl-tok-tag { color: #dc2626; }
.hl-tok-prop { color: #d97706; }
.hl-tok-fn { color: #2563eb; }
.hl-tok-attr { color: #9333ea; }
.hl-tok-deco { color: #f59e0b; }

/* dark mode overrides */
.dark .hl-tok-str { color: #86efac; }
.dark .hl-tok-comment { color: #6b7280; }
.dark .hl-tok-num { color: #60a5fa; }
.dark .hl-tok-kw { color: #c4b5fd; }
.dark .hl-tok-type { color: #67e8f9; }
.dark .hl-tok-tag { color: #fca5a5; }
.dark .hl-tok-prop { color: #fcd34d; }
.dark .hl-tok-fn { color: #93c5fd; }
.dark .hl-tok-attr { color: #d8b4fe; }
.dark .hl-tok-deco { color: #fcd34d; }
</style>

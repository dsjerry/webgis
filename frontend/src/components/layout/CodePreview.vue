<script setup lang="ts">
import { ref, computed, watch } from "vue"
import hljs from "highlight.js/lib/common"
import type { ExampleFile } from "@/types/example"

const props = defineProps<{ files: ExampleFile[] }>()

const activeFileIndex = ref(0)
const copied = ref(false)

const activeFile = computed(() => props.files[activeFileIndex.value])

/** highlight.js `common` bundle language id */
const hljsLanguageMap: Record<string, string> = {
    vue: "xml",
    html: "xml",
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    py: "python",
    python: "python",
    sql: "sql",
    json: "json",
    yaml: "yaml",
    yml: "yaml",
    bash: "bash",
    sh: "bash",
    shell: "bash",
    css: "css",
    scss: "scss",
    md: "markdown",
    markdown: "markdown",
    dockercompose: "yaml",
    dockerfile: "bash",
    txt: "plaintext",
}

function highlightCode(code: string, lang: string): string {
    if (!code) return ""
    const id = hljsLanguageMap[lang] ?? lang
    const grammar = hljs.getLanguage(id)
    try {
        if (grammar) {
            return hljs.highlight(code, { language: id, ignoreIllegals: true })
                .value
        }
        return hljs.highlightAuto(code).value
    } catch {
        return code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
    }
}

const highlightedHtml = computed(() =>
    highlightCode(
        activeFile.value?.code ?? "",
        activeFile.value?.language ?? "txt",
    ),
)

const langLabels: Record<string, string> = {
    vue: "Vue",
    ts: "TypeScript",
    tsx: "TSX",
    js: "JavaScript",
    html: "HTML",
    css: "CSS",
    python: "Python",
    py: "Python",
    sql: "SQL",
    json: "JSON",
    yaml: "YAML",
    bash: "Bash",
    sh: "Shell",
    dockerfile: "Dockerfile",
    dockercompose: "Docker Compose",
    txt: "Text",
}

function langLabel(lang: string): string {
    return langLabels[lang] || lang.toUpperCase()
}

const langColors: Record<string, string> = {
    vue: "bg-green-100/80 text-green-700 dark:bg-green-900/50 dark:text-green-300 border border-green-200/60 dark:border-green-800/50",
    ts: "bg-blue-100/80 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50",
    tsx: "bg-blue-100/80 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50",
    js: "bg-yellow-100/80 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 border border-yellow-200/60 dark:border-yellow-800/50",
    html: "bg-orange-100/80 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800/50",
    css: "bg-purple-100/80 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50",
    python: "bg-sky-100/80 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/50",
    py: "bg-sky-100/80 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/50",
    sql: "bg-pink-100/80 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300 border border-pink-200/60 dark:border-pink-800/50",
    json: "bg-gray-100/80 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300 border border-gray-200/60 dark:border-gray-600/50",
    yaml: "bg-rose-100/80 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/50",
    bash: "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50",
    sh: "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50",
    dockerfile:
        "bg-blue-100/80 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50",
    dockercompose:
        "bg-cyan-100/80 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/50",
    txt: "bg-gray-100/80 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400 border border-gray-200/60 dark:border-gray-700/50",
}

const languageColor = computed(
    () => langColors[activeFile.value?.language] || langColors.txt,
)

async function copyCode() {
    try {
        await navigator.clipboard.writeText(activeFile.value?.code || "")
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch {
        // fallback
    }
}

// Reset active file when example changes
watch(
    () => props.files,
    () => {
        activeFileIndex.value = 0
    },
)
</script>

<template>
    <div class="flex flex-col h-full min-h-0 bg-white dark:bg-[#0d1117]">
        <!-- File tabs -->
        <div
            v-if="files.length > 1"
            class="shrink-0 flex items-center gap-1 px-3 py-2 border-b border-gray-100 dark:border-gray-800/50 overflow-x-auto bg-gray-50/50 dark:bg-gray-900/50"
        >
            <button
                v-for="(file, i) in files"
                :key="i"
                class="group flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium transition-all duration-150 whitespace-nowrap"
                :class="
                    activeFileIndex === i
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200/60 dark:border-gray-700/60'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60'
                "
                @click="activeFileIndex = i"
            >
                <!-- File icon -->
                <svg
                    class="w-3.5 h-3.5 shrink-0"
                    :class="
                        activeFileIndex === i
                            ? 'text-primary'
                            : 'text-gray-400 group-hover:text-gray-500'
                    "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                {{ file.filename }}
            </button>
        </div>

        <!-- Code header -->
        <div
            class="shrink-0 flex items-center justify-between px-4 py-2 bg-linear-to-r from-gray-50/80 to-transparent dark:from-gray-900/80 dark:to-transparent border-b border-gray-100/80 dark:border-gray-800/50"
        >
            <div class="flex items-center gap-3">
                <span
                    :class="[
                        'px-2.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider',
                        languageColor,
                    ]"
                >
                    {{ langLabel(activeFile?.language || "txt") }}
                </span>
                <span
                    class="text-[10px] text-gray-400 dark:text-gray-500 font-mono"
                    >{{ activeFile?.filename }}</span
                >
            </div>
            <button
                class="group flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-medium transition-all duration-200"
                :class="
                    copied
                        ? 'text-green-600 dark:text-green-400 bg-green-50/80 dark:bg-green-900/30 shadow-sm'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/60'
                "
                @click="copyCode"
            >
                <svg
                    v-if="!copied"
                    class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                </svg>
                <svg
                    v-else
                    class="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    />
                </svg>
                {{ copied ? "Copied!" : "Copy" }}
            </button>
        </div>

        <!-- Code body -->
        <div class="flex-1 overflow-auto min-h-0 relative">
            <div
                class="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent to-transparent"
            />
            <pre
                class="p-4 sm:p-5 text-[12px] sm:text-[13px] leading-[1.7] font-mono min-h-full"
            ><code class="hljs" v-html="highlightedHtml" /></pre>
        </div>
    </div>
</template>

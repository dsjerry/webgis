import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Example, Phase } from '@/types/example'
import { examplesData } from '@/data/examples'

export const useExamplesStore = defineStore('examples', () => {
  const phases = ref<Phase[]>(examplesData)
  const activeExampleId = ref<string | null>(null)
  const searchQuery = ref('')
  const darkMode = ref(localStorage.getItem('darkMode') === 'true')

  const activeExample = computed(() => {
    if (!activeExampleId.value) return null
    for (const phase of phases.value) {
      for (const mod of phase.modules) {
        const found = mod.examples.find(e => e.id === activeExampleId.value)
        if (found) return found
      }
    }
    return null
  })

  const filteredPhases = computed(() => {
    if (!searchQuery.value.trim()) return phases.value
    const q = searchQuery.value.toLowerCase()
    return phases.value.map(phase => ({
      ...phase,
      modules: phase.modules.map(mod => ({
        ...mod,
        examples: mod.examples.filter(e =>
          e.title.toLowerCase().includes(q) ||
          e.titleEn.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.tags.some(t => t.toLowerCase().includes(q))
        )
      })).filter(mod => mod.examples.length > 0)
    })).filter(phase => phase.modules.length > 0)
  })

  function setActiveExample(id: string) {
    activeExampleId.value = id
  }

  function setSearchQuery(q: string) {
    searchQuery.value = q
  }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', String(darkMode.value))
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function initDarkMode() {
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    }
  }

  return {
    phases,
    filteredPhases,
    activeExampleId,
    activeExample,
    searchQuery,
    darkMode,
    setActiveExample,
    setSearchQuery,
    toggleDarkMode,
    initDarkMode
  }
})

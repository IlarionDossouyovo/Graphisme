// ==============================================
// Voice Synthesis Service - Graphisme by ELECTRON
// Système vocal complet avec voix masculine et féminine
// Réglages normal et optimisé
// ==============================================

export type VoiceGender = 'male' | 'female'
export type VoiceQuality = 'normal' | 'optimized'

export interface VoiceSettings {
  rate: number        // Vitesse: 0.1 à 10
  pitch: number       // Hauteur: 0 à 2
  volume: number      // Volume: 0 à 1
}

export interface AgentVoiceConfig {
  lang: string
  rate: number
  pitch: number
  volume: number
  gender: VoiceGender
}

// Profil vocal pour chaque agent - Voix masculine et féminine
export const VOICE_PROFILES: Record<string, AgentVoiceConfig> = {
  // Voix Masculine - Plus grave et posée
  CEO: { lang: 'fr-FR', rate: 0.75, pitch: 0.85, volume: 1.0, gender: 'male' },
  Commercial: { lang: 'fr-FR', rate: 0.8, pitch: 0.9, volume: 1.0, gender: 'male' },
  Developer: { lang: 'fr-FR', rate: 0.85, pitch: 0.95, volume: 1.0, gender: 'male' },
  DevOps: { lang: 'fr-FR', rate: 0.8, pitch: 0.9, volume: 1.0, gender: 'male' },
  Finance: { lang: 'fr-FR', rate: 0.7, pitch: 0.8, volume: 1.0, gender: 'male' },
  CyberSecurity: { lang: 'fr-FR', rate: 0.75, pitch: 0.85, volume: 1.0, gender: 'male' },
  
  // Voix Féminine - Plus dynamique et empathize
  Marketing: { lang: 'fr-FR', rate: 0.85, pitch: 1.2, volume: 1.0, gender: 'female' },
  Designer: { lang: 'fr-FR', rate: 0.8, pitch: 1.15, volume: 1.0, gender: 'female' },
  Motion: { lang: 'fr-FR', rate: 0.8, pitch: 1.1, volume: 1.0, gender: 'female' },
  'Community Manager': { lang: 'fr-FR', rate: 0.9, pitch: 1.25, volume: 1.0, gender: 'female' },
  Support: { lang: 'fr-FR', rate: 0.85, pitch: 1.2, volume: 1.0, gender: 'female' },
  'Data Analyst': { lang: 'fr-FR', rate: 0.8, pitch: 1.1, volume: 1.0, gender: 'female' },
}

// Réglages de qualité vocale
export const VOICE_QUALITY_SETTINGS: Record<VoiceQuality, { rate: number; pitch: number; volume: number }> = {
  // Réglage Normal - Vitesse et ton standard
  normal: {
    rate: 1.0,
    pitch: 1.0,
    volume: 0.8,
  },
  // Réglage Optimisé - Plus clair et professionnel
  optimized: {
    rate: 0.9,
    pitch: 1.0,
    volume: 1.0,
  },
}

class VoiceService {
  private synth: SpeechSynthesis | null = null
  private voices: SpeechSynthesisVoice[] = []
  private currentUtterance: SpeechSynthesisUtterance | null = null
  private isSpeaking: boolean = false
  private currentGender: VoiceGender = 'male'
  private currentQuality: VoiceQuality = 'optimized'

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis
      
      // Load voices
      this.loadVoices()
      
      // Some browsers load voices asynchronously
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices()
      }
    }
  }

  private loadVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices()
    }
  }

  // Obtenir une voix française masculine
  getFrenchMasculineVoice(): SpeechSynthesisVoice | null {
    const frenchVoices = this.voices.filter(v => v.lang.startsWith('fr'))
    
    if (frenchVoices.length > 0) {
      // Priorité aux voix masculines françaises
      const maleNames = ['thomas', 'mathieu', 'nicolas', 'jean', 'paul', 'pierre', 'hervé', 'bruno', 'philippe']
      for (const name of maleNames) {
        const voice = frenchVoices.find(v => v.name.toLowerCase().includes(name))
        if (voice) return voice
      }
      // Sinon première voix française
      return frenchVoices[0]
    }
    return this.voices[0] || null
  }

  // Obtenir une voix française féminine
  getFrenchFeminineVoice(): SpeechSynthesisVoice | null {
    const frenchVoices = this.voices.filter(v => v.lang.startsWith('fr'))
    
    if (frenchVoices.length > 0) {
      // Priorité aux voix féminines françaises
      const femaleNames = ['amelie', 'celine', 'sophie', 'marie', 'julie', 'emma', 'lea', 'chloe', 'nathalie', 'isabelle']
      for (const name of femaleNames) {
        const voice = frenchVoices.find(v => v.name.toLowerCase().includes(name))
        if (voice) return voice
      }
      // Sinon deuxième voix française si disponible
      if (frenchVoices.length > 1) return frenchVoices[1]
      return frenchVoices[0]
    }
    return this.voices[0] || null
  }

  // Changer le genre de voix
  setGender(gender: VoiceGender): void {
    this.currentGender = gender
  }

  // Changer la qualité vocale
  setQuality(quality: VoiceQuality): void {
    this.currentQuality = quality
  }

  // Obtenir le genre actuel
  getGender(): VoiceGender {
    return this.currentGender
  }

  // Obtenir la qualité actuelle
  getQuality(): VoiceQuality {
    return this.currentQuality
  }

  speak(text: string, agentName: string = 'Support', onEnd?: () => void): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported')
      return
    }

    // Arrêter toute synthèse en cours
    this.stop()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Obtenir les paramètres de l'agent
    const profile = VOICE_PROFILES[agentName] || { 
      lang: 'fr-FR', 
      rate: 0.8, 
      pitch: 1.0,
      volume: 1.0,
      gender: 'male' as VoiceGender 
    }
    
    // Obtenir la voix selon le genre défini par l'utilisateur
    let voice: SpeechSynthesisVoice | null = null
    if (this.currentGender === 'male') {
      voice = this.getFrenchMasculineVoice()
    } else {
      voice = this.getFrenchFeminineVoice()
    }
    
    if (voice) {
      utterance.voice = voice
    }
    
    // Appliquer les paramètres de qualité
    const qualitySettings = VOICE_QUALITY_SETTINGS[this.currentQuality]
    
    utterance.lang = profile.lang
    utterance.rate = profile.rate * qualitySettings.rate
    utterance.pitch = profile.pitch * qualitySettings.pitch
    utterance.volume = profile.volume * qualitySettings.volume

    utterance.onstart = () => {
      this.isSpeaking = true
    }

    utterance.onend = () => {
      this.isSpeaking = false
      this.currentUtterance = null
      if (onEnd) onEnd()
    }

    utterance.onerror = (event) => {
      console.error('Speech error:', event.error)
      this.isSpeaking = false
      this.currentUtterance = null
      if (onEnd) onEnd()
    }

    this.currentUtterance = utterance
    this.synth.speak(utterance)
  }

  // Synthèse vocale avec paramètres personnalisés
  speakWithSettings(
    text: string, 
    agentName: string = 'Support',
    gender?: VoiceGender,
    quality?: VoiceQuality,
    onEnd?: () => void
  ): void {
    // Sauvegarder les paramètres actuels
    const originalGender = this.currentGender
    const originalQuality = this.currentQuality
    
    // Appliquer les nouveaux paramètres temporairement
    if (gender) this.currentGender = gender
    if (quality) this.currentQuality = quality
    
    // Parler
    this.speak(text, agentName, () => {
      // Restaurer les paramètres originaux
      this.currentGender = originalGender
      this.currentQuality = originalQuality
      if (onEnd) onEnd()
    })
  }

  stop(): void {
    if (this.synth && this.isSpeaking) {
      this.synth.cancel()
      this.isSpeaking = false
      this.currentUtterance = null
    }
  }

  pause(): void {
    if (this.synth && this.isSpeaking) {
      this.synth.pause()
    }
  }

  resume(): void {
    if (this.synth) {
      this.synth.resume()
    }
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking
  }

  // Vérifier si le navigateur supporte la synthèse vocale
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  // Obtenir toutes les voix disponibles
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices
  }

  // Obtenir les voix françaises disponibles
  getFrenchVoices(): SpeechSynthesisVoice[] {
    return this.voices.filter(v => v.lang.startsWith('fr'))
  }

  // Test de la voix avec un texte court
  testVoice(gender: VoiceGender, quality: VoiceQuality): void {
    const testText = gender === 'male' 
      ? "Bonjour, je suis votre assistant vocal masculin. Comment puis-je vous aider ?"
      : "Bonjour, je suis votre assistante vocale féminine. Comment puis-je vous aider ?"
    
    this.speakWithSettings(testText, 'Support', gender, quality)
  }
}

// Singleton instance
export const voiceService = new VoiceService()

// React hook pour la synthèse vocale
export function useVoice() {
  const speak = (text: string, agentName?: string) => {
    voiceService.speak(text, agentName || 'Support')
  }

  const speakWithSettings = (
    text: string, 
    agentName?: string,
    gender?: VoiceGender,
    quality?: VoiceQuality
  ) => {
    voiceService.speakWithSettings(text, agentName || 'Support', gender, quality)
  }

  const stop = () => {
    voiceService.stop()
  }

  const setGender = (gender: VoiceGender) => {
    voiceService.setGender(gender)
  }

  const setQuality = (quality: VoiceQuality) => {
    voiceService.setQuality(quality)
  }

  const testVoice = (gender: VoiceGender, quality: VoiceQuality) => {
    voiceService.testVoice(gender, quality)
  }

  return {
    speak,
    speakWithSettings,
    stop,
    setGender,
    setQuality,
    testVoice,
    isSpeaking: voiceService.getIsSpeaking(),
    isSupported: voiceService.isSupported(),
    currentGender: voiceService.getGender(),
    currentQuality: voiceService.getQuality()
  }
}

// ==============================================
// Voice Synthesis Service - Graphisme by ELECTRON
// Voix masculine optimisée pour les agents IA
// ==============================================

export interface VoiceSettings {
  rate: number      // 0.1 to 10
  pitch: number    // 0 to 2
  volume: number    // 0 to 1
}

// Voice profiles for different agents (masculine voices)
export const VOICE_PROFILES: Record<string, { lang: string; rate: number; pitch: number }> = {
  CEO: { lang: 'fr-FR', rate: 0.9, pitch: 0.9 },
  Commercial: { lang: 'fr-FR', rate: 1.0, pitch: 1.0 },
  Marketing: { lang: 'fr-FR', rate: 1.0, pitch: 0.95 },
  Designer: { lang: 'fr-FR', rate: 0.85, pitch: 0.85 },
  Developer: { lang: 'fr-FR', rate: 1.0, pitch: 1.0 },
  Motion: { lang: 'fr-FR', rate: 0.95, pitch: 0.9 },
  DevOps: { lang: 'fr-FR', rate: 0.9, pitch: 0.95 },
  'Community Manager': { lang: 'fr-FR', rate: 1.0, pitch: 0.95 },
  Support: { lang: 'fr-FR', rate: 0.9, pitch: 1.0 },
  Finance: { lang: 'fr-FR', rate: 0.85, pitch: 0.9 },
  'Data Analyst': { lang: 'fr-FR', rate: 0.95, pitch: 0.95 },
  CyberSecurity: { lang: 'fr-FR', rate: 0.9, pitch: 1.0 },
}

class VoiceService {
  private synth: SpeechSynthesis | null = null
  private voices: SpeechSynthesisVoice[] = []
  private currentUtterance: SpeechSynthesisUtterance | null = null
  private isSpeaking: boolean = false

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

  // Get the best available French masculine voice
  getFrenchMasculineVoice(): SpeechSynthesisVoice | null {
    // Priority: French (France) male voices
    const frenchVoices = this.voices.filter(v => 
      v.lang.startsWith('fr') && v.name.toLowerCase().includes('male')
    )
    
    if (frenchVoices.length > 0) {
      return frenchVoices[0]
    }

    // Fallback: French voices
    const frVoices = this.voices.filter(v => v.lang.startsWith('fr'))
    if (frVoices.length > 0) {
      // Prefer voices with "Thomas", "Mathieu", "Nicolas" (common French male voices)
      const maleNames = ['thomas', 'mathieu', 'nicolas', 'jean', 'paul', 'pierre']
      for (const name of maleNames) {
        const voice = frVoices.find(v => v.name.toLowerCase().includes(name))
        if (voice) return voice
      }
      return frVoices[0]
    }

    // Last resort: any French voice
    return this.voices[0] || null
  }

  speak(text: string, agentName: string = 'Support', onEnd?: () => void): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported')
      return
    }

    // Cancel any ongoing speech
    this.stop()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Get voice settings for this agent
    const profile = VOICE_PROFILES[agentName] || { lang: 'fr-FR', rate: 1.0, pitch: 1.0 }
    
    // Get French masculine voice
    const voice = this.getFrenchMasculineVoice()
    if (voice) {
      utterance.voice = voice
    }
    
    utterance.lang = profile.lang
    utterance.rate = profile.rate
    utterance.pitch = profile.pitch
    utterance.volume = 1.0

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

  // Check if browser supports speech synthesis
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  // Get available voices
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices
  }
}

// Singleton instance
export const voiceService = new VoiceService()

// React hook for voice synthesis
export function useVoice() {
  const speak = (text: string, agentName?: string) => {
    voiceService.speak(text, agentName || 'Support')
  }

  const stop = () => {
    voiceService.stop()
  }

  return {
    speak,
    stop,
    isSpeaking: voiceService.getIsSpeaking(),
    isSupported: voiceService.isSupported()
  }
}

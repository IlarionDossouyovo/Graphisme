'use client'

import { useState } from 'react'
import { Volume2, VolumeX, Play, Pause, Square, User, Settings, Zap, Mic } from 'lucide-react'
import { useVoice, VoiceGender, VoiceQuality, VOICE_PROFILES } from '@/lib/voice'

interface VoiceControlProps {
  agentName?: string
  onSpeak?: (text: string) => void
}

export default function VoiceControl({ agentName = 'Support', onSpeak }: VoiceControlProps) {
  const { 
    speak, 
    stop, 
    setGender, 
    setQuality, 
    testVoice,
    isSpeaking,
    currentGender,
    currentQuality,
    isSupported 
  } = useVoice()

  const [showSettings, setShowSettings] = useState(false)
  const [testText, setTestText] = useState('')

  if (!isSupported) {
    return (
      <div className="glass-card p-4 text-center text-gray-400">
        <Mic className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Synthèse vocale non supportée</p>
      </div>
    )
  }

  const handleSpeak = () => {
    if (testText.trim()) {
      speak(testText, agentName)
    }
  }

  const handleTestVoice = () => {
    testVoice(currentGender, currentQuality)
  }

  return (
    <div className="glass-card p-4 space-y-4">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-gold" />
          <span className="text-white font-medium">Contrôle Vocal</span>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Indicateur de parole */}
      {isSpeaking && (
        <div className="flex items-center gap-2 text-green-500 animate-pulse">
          <Volume2 className="w-4 h-4" />
          <span className="text-sm">En train de parler...</span>
        </div>
      )}

      {/* Zone de texte pour test */}
      <div className="space-y-2">
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Entrez le texte à lire..."
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm resize-none"
          rows={2}
        />
        
        <div className="flex gap-2">
          <button
            onClick={handleSpeak}
            disabled={!testText.trim() || isSpeaking}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gold/20 text-gold rounded-lg hover:bg-gold/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm">Parler</span>
          </button>
          <button
            onClick={stop}
            disabled={!isSpeaking}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Paramètres vocaux */}
      {showSettings && (
        <div className="space-y-4 pt-4 border-t border-white/10">
          {/* Genre de voix */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Genre de voix
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGender('male')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  currentGender === 'male' 
                    ? 'bg-gold/20 text-gold border border-gold/30' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                👨 Masculin
              </button>
              <button
                onClick={() => setGender('female')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  currentGender === 'female' 
                    ? 'bg-violet-IA/20 text-violet-IA border border-violet-IA/30' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                👩 Féminin
              </button>
            </div>
          </div>

          {/* Qualité vocale */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Qualité
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setQuality('normal')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  currentQuality === 'normal' 
                    ? 'bg-electric/20 text-electric border border-electric/30' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                📊 Normal
              </button>
              <button
                onClick={() => setQuality('optimized')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  currentQuality === 'optimized' 
                    ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                ⚡ Optimisé
              </button>
            </div>
          </div>

          {/* Bouton test */}
          <button
            onClick={handleTestVoice}
            disabled={isSpeaking}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 disabled:opacity-50 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm">Tester la voix</span>
          </button>
        </div>
      )}

      {/* Info agent */}
      <div className="text-xs text-gray-500 pt-2 border-t border-white/5">
        Agent: <span className="text-gold">{agentName}</span> | 
        Voix: <span className="text-gray-300">{currentGender === 'male' ? 'Masculine' : 'Féminine'}</span> | 
        Qualité: <span className="text-gray-300">{currentQuality === 'optimized' ? 'Optimisée' : 'Normale'}</span>
      </div>
    </div>
  )
}

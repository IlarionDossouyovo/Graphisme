'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Sparkles, Wand2, Palette, Image as ImageIcon, Layers, Download, 
  Settings, Play, Pause, RotateCcw, Save, Share2,
  ChevronRight, Check, Copy, RefreshCw, Zap,
  Sliders, Crop, Wand, Palette as PaletteIcon,
  Maximize2, ZoomIn, ZoomOut, FlipHorizontal, FlipVertical,
  Loader2, X, Upload, FileText, Trash2
} from 'lucide-react'

// Logo Component
const Logo = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 animate-pulse"></div>
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.7" />
      <path d="M35 65 L50 30 L65 65 M50 30 L50 55" fill="none" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55 25 L45 40 L52 40 L47 55 L60 38 L53 38 Z" fill="url(#goldGradient)" />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  </div>
)

// Art Categories
const artCategories = [
  { id: 'luxury_wall_art', name: 'Luxury Wall Art', icon: Palette },
  { id: 'african_art', name: 'African Art', icon: Palette },
  { id: 'abstract_art', name: 'Abstract Art', icon: Palette },
  { id: 'modern_art', name: 'Modern Art', icon: Palette },
  { id: 'luxury_gold_art', name: 'Luxury Gold Art', icon: Sparkles },
  { id: 'office_decoration', name: 'Office Decoration', icon: Layers },
  { id: 'hotel_decoration', name: 'Hotel Decoration', icon: Layers },
  { id: 'bedroom_decoration', name: 'Bedroom Decoration', icon: Layers },
  { id: 'living_room_decoration', name: 'Living Room', icon: Layers },
  { id: 'corporate_decoration', name: 'Corporate', icon: Layers },
  { id: 'landscape', name: 'Landscape', icon: ImageIcon },
  { id: 'portrait', name: 'Portrait', icon: ImageIcon },
  { id: 'watercolor', name: 'Watercolor', icon: Palette },
  { id: 'oil_painting', name: 'Oil Painting', icon: Palette },
  { id: '3d_art', name: '3D Art', icon: Layers },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: Zap },
  { id: 'fantasy', name: 'Fantasy', icon: Sparkles },
  { id: 'pop_art', name: 'Pop Art', icon: Palette },
  { id: 'anime', name: 'Anime', icon: Palette },
  { id: 'minimalist', name: 'Minimalist', icon: Palette },
]

// Art Styles
const artStyles = [
  'Realistic', 'Impressionist', 'Expressionist', 'Abstract', 'Minimalist',
  'Surrealist', 'Pop', 'Digital', 'Photorealistic', 'Illustration'
]

// Aspect Ratios
const aspectRatios = [
  { id: '1:1', name: 'Square (1:1)', width: 1024, height: 1024 },
  { id: '4:3', name: 'Landscape (4:3)', width: 1280, height: 960 },
  { id: '3:2', name: 'Classic (3:2)', width: 1280, height: 854 },
  { id: '16:9', name: 'Widescreen (16:9)', width: 1920, height: 1080 },
  { id: '9:16', name: 'Portrait (9:16)', width: 768, height: 1344 },
  { id: '3:4', name: 'Portrait (3:4)', width: 768, height: 1024 },
]

// Prompt Builder Component
const PromptBuilder = ({ 
  prompt, 
  setPrompt,
  onGenerate,
  uploadedFiles,
  handleFileUpload,
  removeFile,
  isUploading,
  fileInputRef
}: { 
  prompt: string
  setPrompt: (prompt: string) => void
  onGenerate: () => void
  uploadedFiles: {name: string, url: string, type: string}[]
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: (index: number) => void
  isUploading: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
}) => {
  const [subject, setSubject] = useState('')
  const [style, setStyle] = useState('')
  const [lighting, setLighting] = useState('')
  const [mood, setMood] = useState('')
  const [colorPalette, setColorPalette] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [creativity, setCreativity] = useState(80)
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [selectedCategory, setSelectedCategory] = useState('')

  const buildPrompt = () => {
    const parts = []
    if (subject) parts.push(subject)
    if (style) parts.push(`in ${style} style`)
    if (lighting) parts.push(`with ${lighting} lighting`)
    if (mood) parts.push(`, ${mood} mood`)
    if (colorPalette) parts.push(`, ${colorPalette} color palette`)
    setPrompt(parts.join(''))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Catégorie d'art</label>
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {artCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id)
                setSubject(cat.name)
              }}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gold text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <cat.icon className="w-4 h-4 mx-auto mb-1" />
              {cat.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Sujet</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Describe your subject..."
            className="input-premium"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="input-premium"
          >
            <option value="">Sélectionner un style</option>
            {artStyles.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Éclairage</label>
          <select
            value={lighting}
            onChange={(e) => setLighting(e.target.value)}
            className="input-premium"
          >
            <option value="">Sélectionner</option>
            <option value="soft lighting">Soft Lighting</option>
            <option value="dramatic lighting">Dramatic Lighting</option>
            <option value="natural lighting">Natural Lighting</option>
            <option value="golden hour">Golden Hour</option>
            <option value="studio lighting">Studio Lighting</option>
            <option value="neon lighting">Neon Lighting</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Ambiance</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="input-premium"
          >
            <option value="">Sélectionner</option>
            <option value="calm">Calm</option>
            <option value="energetic">Energetic</option>
            <option value="mysterious">Mysterious</option>
            <option value="joyful">Joyful</option>
            <option value="melancholic">Melancholic</option>
            <option value="serene">Serene</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Palette de couleurs</label>
          <select
            value={colorPalette}
            onChange={(e) => setColorPalette(e.target.value)}
            className="input-premium"
          >
            <option value="">Sélectionner</option>
            <option value="warm colors">Warm Colors</option>
            <option value="cool colors">Cool Colors</option>
            <option value="monochromatic">Monochromatic</option>
            <option value="vibrant colors">Vibrant Colors</option>
            <option value="pastel colors">Pastel Colors</option>
            <option value="gold and black">Gold & Black</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Prompt généré</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="input-premium resize-none"
          placeholder="Your prompt will appear here..."
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={buildPrompt}
            className="text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-1"
          >
            <Wand2 className="w-4 h-4" />
            Générer le prompt
          </button>
          <button
            onClick={() => setPrompt('')}
            className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Ratio</label>
          <div className="grid grid-cols-3 gap-2">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.id}
                onClick={() => setAspectRatio(ratio.id)}
                className={`p-2 rounded-lg text-xs font-medium transition-all ${
                  aspectRatio === ratio.id
                    ? 'bg-gold text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {ratio.id}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Créativité: {creativity}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={creativity}
            onChange={(e) => setCreativity(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Negative Prompt (optionnel)</label>
        <input
          type="text"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder="What to avoid..."
          className="input-premium"
        />
      </div>

      {/* File Upload Section */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Fichiers joints (optionnel)
        </label>
        
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*,.pdf,.doc,.docx,.txt"
          multiple
          className="hidden"
        />
        
        {/* Upload button and preview */}
        <div className="space-y-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-gold/50 hover:text-gold transition-all flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            {isUploading ? 'Chargement...' : 'Télécharger des fichiers'}
          </button>
          
          {/* File previews */}
          {uploadedFiles.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  {file.type === 'image' ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                      <FileText className="w-4 h-4 text-gold" />
                      <span className="text-xs text-white max-w-[80px] truncate">{file.name}</span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-xs text-gray-500">
            Images, PDF, DOC, TXT (max 10MB par fichier)
          </p>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={!prompt}
        className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          Générer l'image
        </span>
      </button>
    </div>
  )
}

// Image Editor Component
const ImageEditor = ({ image, onBack }: { image: string | null; onBack: () => void }) => {
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [zoom, setZoom] = useState(100)
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCopy = async () => {
    if (!image) return
    try {
      const response = await fetch(image)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      alert('Image copiée dans le presse-papiers!')
    } catch (err) {
      alert('Impossible de copier l\'image')
    }
  }

  const handleShare = async () => {
    if (!image) return
    if (navigator.share) {
      try {
        const response = await fetch(image)
        const blob = await response.blob()
        const file = new File([blob], 'artwork.png', { type: 'image/png' })
        await navigator.share({
          title: 'Mon artwork AI',
          text: 'Créé avec Graphisme AI Studio',
          files: [file]
        })
      } catch (err) {
        console.log('Partage annulé')
      }
    } else {
      alert('Fonction de partage non disponible sur ce navigateur')
    }
  }

  const handleDownload = () => {
    if (!image) return
    const link = document.createElement('a')
    link.href = image
    link.download = 'artwork-graphisme.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleTool = async (toolName: string) => {
    if (!image) return
    
    setIsProcessing(true)
    
    try {
      if (toolName === 'Recadrage') {
        // Open a simple crop modal (simplified version)
        const newWidth = prompt('Largeur en pixels:', '800')
        const newHeight = prompt('Hauteur en pixels:', '800')
        if (newWidth && newHeight) {
          alert(`Image recadrée à ${newWidth}x${newHeight}! (Simulation)`)
        }
      } else if (toolName === 'Suppression du fond') {
        alert('🚀 Fonctionnalité premium - Suppression du fond avec IA!\n\nEn production, cette fonction utilisera une API comme remove.bg pour supprimer automatiquement le fond de votre image.')
      } else if (toolName === 'Upscale') {
        alert('🚀 Fonctionnalité premium - Upscale 4K!\n\nEn production, cette fonction utilisera une IA de super-résolution pour agrandir votre image sans perte de qualité.')
      } else if (toolName === 'Recolor') {
        alert('🚀 Fonctionnalité premium - Recolor IA!\n\nEn production, cette fonction utilisera une IA pour modifier automatiquement les couleurs de votre image.')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const resetAdjustments = () => {
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setFlipH(false)
    setFlipV(false)
    setZoom(100)
  }

  const imageStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    transform: `scale(${zoom/100}) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
    transformOrigin: 'center'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Retour au générateur
        </button>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            disabled={!image}
            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button 
            onClick={handleShare}
            disabled={!image}
            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button 
            onClick={handleDownload}
            disabled={!image}
            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isProcessing && (
        <div className="glass-premium rounded-xl p-4 text-center">
          <Loader2 className="w-6 h-6 mx-auto animate-spin text-gold" />
          <p className="text-gray-400 mt-2">Traitement en cours...</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {image && (
            <div className="flex items-center justify-between mb-4">
              <span className="text-gold text-sm font-medium">✨ Image générée</span>
              <span className="text-gray-500 text-xs">Zoom: {zoom}%</span>
            </div>
          )}
          <div className="glass-premium rounded-2xl p-8 flex items-center justify-center min-h-[400px] overflow-hidden">
            {image ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={image} 
                  alt="Generated" 
                  className="max-w-full max-h-[500px] object-contain rounded-lg shadow-2xl"
                  style={imageStyle}
                />
              </div>
            ) : (
              <div className="text-center">
                <Wand2 className="w-20 h-20 mx-auto text-gold/30 mb-4" />
                <p className="text-gray-400">Générez une image pour commencer</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-4">
            <button 
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              disabled={!image}
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white disabled:opacity-50"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-gray-400 text-sm">{zoom}%</span>
            <button 
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              disabled={!image}
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white disabled:opacity-50"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setFlipH(!flipH)}
              disabled={!image}
              className={`p-2 rounded-lg transition-colors ${flipH ? 'bg-gold text-black' : 'bg-white/5 text-gray-400 hover:text-white'} disabled:opacity-50`}
            >
              <FlipHorizontal className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setFlipV(!flipV)}
              disabled={!image}
              className={`p-2 rounded-lg transition-colors ${flipV ? 'bg-gold text-black' : 'bg-white/5 text-gray-400 hover:text-white'} disabled:opacity-50`}
            >
              <FlipVertical className="w-5 h-5" />
            </button>
            <button 
              onClick={resetAdjustments}
              disabled={!image}
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white disabled:opacity-50"
              title="Réinitialiser"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Ajustements</h3>
            {(brightness !== 100 || contrast !== 100 || saturation !== 100) && (
              <button 
                onClick={resetAdjustments}
                className="text-xs text-gold hover:text-gold-light"
              >
                Réinitialiser
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Luminosité</span>
                <span>{brightness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                disabled={!image}
                className="w-full accent-gold disabled:opacity-50"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Contraste</span>
                <span>{contrast}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                disabled={!image}
                className="w-full accent-gold disabled:opacity-50"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Saturation</span>
                <span>{saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                disabled={!image}
                className="w-full accent-gold disabled:opacity-50"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <h4 className="text-sm font-medium text-white mb-3">Outils</h4>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleTool('Recadrage')}
                disabled={!image || isProcessing}
                className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
              >
                <Crop className="w-4 h-4" />
                Recadrer
              </button>
              <button 
                onClick={() => handleTool('Suppression du fond')}
                disabled={!image || isProcessing}
                className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
              >
                <Wand className="w-4 h-4" />
                Supprimer fond
              </button>
              <button 
                onClick={() => handleTool('Upscale')}
                disabled={!image || isProcessing}
                className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
              >
                <Maximize2 className="w-4 h-4" />
                Upscale
              </button>
              <button 
                onClick={() => handleTool('Recolor')}
                disabled={!image || isProcessing}
                className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
              >
                <PaletteIcon className="w-4 h-4" />
                Recolor
              </button>
            </div>
          </div>

          <button 
            onClick={handleDownload}
            disabled={!image}
            className="btn-premium w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Télécharger HD
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Mockup Generator
const MockupGenerator = ({ image, onBack }: { image: string | null; onBack: () => void }) => {
  const mockups = [
    { id: 'living_room', name: 'Salon', icon: '🛋️', bg: 'from-amber-900/50 to-orange-900/50' },
    { id: 'office', name: 'Bureau', icon: '💼', bg: 'from-gray-700 to-gray-900' },
    { id: 'bedroom', name: 'Chambre', icon: '🛏️', bg: 'from-blue-900/50 to-indigo-900/50' },
    { id: 'hotel', name: 'Hôtel', icon: '🏨', bg: 'from-yellow-900/50 to-amber-900/50' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', bg: 'from-orange-900/50 to-red-900/50' },
    { id: 'villa', name: 'Villa', icon: '🏡', bg: 'from-green-900/50 to-emerald-900/50' },
  ]

  const [selectedMockup, setSelectedMockup] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Retour
        </button>
      </div>

      <h3 className="text-2xl font-bold text-white">Générateur de Mockup</h3>
      <p className="text-gray-400">
        {image ? 'Cliquez sur un environnement pour prévisualiser votre artwork' : 'Générez d\'abord une image pour créer un mockup'}
      </p>

      {/* Preview du mockup sélectionné */}
      {selectedMockup && image && (
        <div className="glass-premium rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-white">
              Aperçu: {mockups.find(m => m.id === selectedMockup)?.name}
            </h4>
            <button
              onClick={() => setSelectedMockup(null)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className={`h-64 rounded-xl bg-gradient-to-br ${mockups.find(m => m.id === selectedMockup)?.bg} p-4 flex items-center justify-center`}>
            <img 
              src={image} 
              alt="Preview" 
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl" 
            />
          </div>
          <div className="flex justify-center mt-4">
            <button className="btn-premium" onClick={() => {
              const link = document.createElement('a')
              link.href = image
              link.download = `mockup-${selectedMockup}.png`
              link.click()
            }}>
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Télécharger Mockup HD
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Grille des mockups */}
      <div className="grid md:grid-cols-3 gap-4">
        {mockups.map((mockup) => (
          <motion.div
            key={mockup.id}
            onClick={() => image && setSelectedMockup(mockup.id)}
            className={`glass-premium rounded-2xl p-4 text-center transition-all cursor-pointer ${
              selectedMockup === mockup.id ? 'ring-2 ring-gold' : 'hover:bg-white/10'
            } ${!image && 'opacity-50 cursor-not-allowed'}`}
            whileHover={image ? { scale: 1.02 } : {}}
            whileTap={image ? { scale: 0.98 } : {}}
          >
            <div className={`h-24 rounded-lg bg-gradient-to-br ${mockup.bg} mb-3 flex items-center justify-center`}>
              {image ? (
                <img src={image} alt={mockup.name} className="w-full h-full object-cover rounded-lg opacity-60" />
              ) : (
                <span className="text-4xl">{mockup.icon}</span>
              )}
            </div>
            <span className="text-white font-medium">{mockup.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Navbar
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-premium-black/90 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Logo />
          <div>
            <span className="text-xl font-bold gold-text">Graphisme</span>
            <span className="text-xs text-gray-400 block">by ELECTRON</span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm text-gray-300 hover:text-gold transition-colors">Accueil</Link>
          <Link href="/services" className="text-sm text-gray-300 hover:text-gold transition-colors">Services</Link>
          <Link href="/art-gallery" className="text-sm text-gray-300 hover:text-gold transition-colors">Galerie</Link>
          <Link href="/ai-studio" className="text-sm text-gold transition-colors">IA Studio</Link>
        </div>
        <Link href="/login" className="glass-button text-sm">Connexion</Link>
      </div>
    </div>
  </nav>
)

// Hero Section
const Hero = () => (
  <section className="relative py-20 overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-IA/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
    
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gold-text">AI Art</span>
          <br />
          <span className="text-white">Studio</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Créez des œuvres d'art uniques grâce à l'intelligence artificielle. 
          Générez, modifiez et visualisez vos créations en quelques clics.
        </p>
      </motion.div>
    </div>
  </section>
)

// Footer
const Footer = () => (
  <footer className="bg-premium-dark border-t border-white/5 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Logo />
          <div>
            <span className="text-lg font-bold gold-text">Graphisme</span>
            <span className="text-xs text-gray-400 block">by ELECTRON</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          © 2026 Graphisme by ELECTRON. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
)

export default function AIStudioPage() {
  const [mode, setMode] = useState<'generate' | 'editor' | 'mockup'>('generate')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  
  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, url: string, type: string}[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsUploading(true)
    const newFiles: {name: string, url: string, type: string}[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.size > 10 * 1024 * 1024) {
        alert(`Le fichier ${file.name} est trop volumineux (max 10MB)`)
        continue
      }
      const url = URL.createObjectURL(file)
      newFiles.push({
        name: file.name,
        url: url,
        type: file.type.startsWith('image/') ? 'image' : 'file'
      })
    }

    setUploadedFiles(prev => [...prev, ...newFiles])
    setIsUploading(false)
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Remove uploaded file
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert('Veuillez entrer un prompt ou sélectionner une catégorie')
      return
    }
    
    setIsGenerating(true)
    // Simulate generation with a placeholder image
    setTimeout(() => {
      // Placeholder image - in production this would come from an AI API
      const placeholderImages = [
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
        'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
      ]
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)]
      setGeneratedImage(randomImage)
      setIsGenerating(false)
      setMode('editor')
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-premium-black">
      <Navbar />
      <div className="pt-24">
        <Hero />
        
        <section className="py-10 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Mode Tabs */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white/5 p-1 rounded-xl">
                <button
                  onClick={() => setMode('generate')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    mode === 'generate'
                      ? 'bg-gold text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    Générer
                  </span>
                </button>
                <button
                  onClick={() => setMode('editor')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    mode === 'editor'
                      ? 'bg-gold text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    Éditer
                  </span>
                </button>
                <button
                  onClick={() => setMode('mockup')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    mode === 'mockup'
                      ? 'bg-gold text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Mockup
                  </span>
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-premium rounded-2xl p-12 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-gold/30"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Génération en cours...</h3>
                <p className="text-gray-400">L'IA crée votre œuvre d'art</p>
              </motion.div>
            )}

            {/* Content */}
            {!isGenerating && (
              <AnimatePresence mode="wait">
                {mode === 'generate' && (
                  <motion.div
                    key="generate"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="glass-premium rounded-2xl p-8">
                      <PromptBuilder
                        prompt={prompt}
                        setPrompt={setPrompt}
                        onGenerate={handleGenerate}
                        uploadedFiles={uploadedFiles}
                        handleFileUpload={handleFileUpload}
                        removeFile={removeFile}
                        isUploading={isUploading}
                        fileInputRef={fileInputRef}
                      />
                    </div>
                  </motion.div>
                )}

                {mode === 'editor' && (
                  <motion.div
                    key="editor"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ImageEditor image={generatedImage} onBack={() => setMode('generate')} />
                  </motion.div>
                )}

                {mode === 'mockup' && (
                  <motion.div
                    key="mockup"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <MockupGenerator image={generatedImage} onBack={() => setMode('generate')} />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </section>
        
        <Footer />
      </div>
    </main>
  )
}

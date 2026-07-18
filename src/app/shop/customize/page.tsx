'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Upload, ChevronRight, ChevronLeft, Check, X, ZoomIn,
  Palette, Maximize2, Frame, Image as ImageIcon, Wand2,
  Download, Share2, Heart, ShoppingCart, ArrowLeft, Sparkles,
  MessageCircle, Bot
} from 'lucide-react'
import CartButton from '@/components/cart-button'

// Materials available
const materials = [
  { id: 'toile', name: 'Toile Canvas Premium', description: 'Toile de haute qualité, texture fine', priceMultiplier: 1, image: '🖼️' },
  { id: 'aluminium', name: 'Aluminium Dibond', description: 'Moderne, léger et résistant', priceMultiplier: 1.3, image: '🔩' },
  { id: 'verre', name: 'Verre Trempé', description: 'Élégant, effet glossy', priceMultiplier: 1.5, image: '🪟' },
  { id: 'bois', name: 'Bois Massif', description: 'Authentique et chaleureux', priceMultiplier: 1.2, image: '🪵' },
  { id: 'pvc', name: 'PVC Expandé', description: 'Léger et économique', priceMultiplier: 0.8, image: '📦' },
]

// Frame options
const frames = [
  { id: 'none', name: 'Sans cadre', description: 'Bordures droites', price: 0 },
  { id: 'simple', name: 'Cadre simple', description: 'Cadre aluminium noir', price: 5000 },
  { id: 'premium', name: 'Cadre premium', description: 'Cadre aluminium doré', price: 15000 },
  { id: 'luxe', name: 'Cadre luxe', description: 'Cadre bois massif', price: 35000 },
]

// Dimensions
const dimensions = [
  { id: 'small', name: 'Petit (30x40cm)', width: 30, height: 40, price: 15000 },
  { id: 'medium', name: 'Moyen (50x70cm)', width: 50, height: 70, price: 25000 },
  { id: 'large', name: 'Grand (70x100cm)', width: 70, height: 100, price: 45000 },
  { id: 'xlarge', name: 'Très grand (100x140cm)', width: 100, height: 140, price: 75000 },
  { id: 'custom', name: 'Sur mesure', width: 0, height: 0, price: 0 },
]

// Color filters
const colorFilters = [
  { id: 'none', name: 'Originale', filter: 'none' },
  { id: 'noir-blanc', name: 'Noir & Blanc', filter: 'grayscale(100%)' },
  { id: 'sepia', name: 'Sépia', filter: 'sepia(100%)' },
  { id: 'vintage', name: 'Vintage', filter: 'sepia(50%) contrast(90%)' },
  { id: 'vibrant', name: 'Vibrant', filter: 'saturate(150%) contrast(110%)' },
  { id: 'froid', name: 'Froid', filter: 'hue-rotate(180deg) saturate(80%)' },
  { id: 'chaud', name: 'Chaud', filter: 'sepia(30%) saturate(140%)' },
]

export default function CustomizePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0])
  const [selectedFrame, setSelectedFrame] = useState(frames[0])
  const [selectedDimension, setSelectedDimension] = useState(dimensions[1])
  const [customWidth, setCustomWidth] = useState(50)
  const [customHeight, setCustomHeight] = useState(70)
  const [selectedFilter, setSelectedFilter] = useState(colorFilters[0])
  const [activeStep, setActiveStep] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Calculate price
  const basePrice = selectedDimension.price
  const materialPrice = basePrice * (selectedMaterial.priceMultiplier - 1)
  const framePrice = selectedFrame.price
  const totalPrice = (basePrice + materialPrice + framePrice) * quantity

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setUploadedImage('/products/placeholder.svg')
      setIsGenerating(false)
    }, 2000)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-premium-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-premium-black/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/shop" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Retour à la boutique
            </Link>
            <h1 className="text-xl font-bold text-white">
              Personnalisation <span className="gold-text">Premium</span>
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { step: 1, name: 'Image' },
              { step: 2, name: 'Matériau' },
              { step: 3, name: 'Dimensions' },
              { step: 4, name: 'Cadre' },
              { step: 5, name: 'Aperçu' },
            ].map((s, i) => (
              <div key={s.step} className="flex items-center">
                <button
                  onClick={() => setActiveStep(s.step)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    activeStep >= s.step
                      ? 'bg-gold/20 text-gold'
                      : 'bg-white/5 text-gray-400'
                  }`}
                >
                  {activeStep > s.step ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center text-sm">{s.step}</span>
                  )}
                  <span className="hidden md:inline">{s.name}</span>
                </button>
                {i < 4 && <ChevronRight className="w-4 h-4 text-gray-600 mx-2" />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Preview Section */}
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Aperçu</h2>
              
              <div 
                className="relative aspect-square bg-white/5 rounded-lg overflow-hidden flex items-center justify-center"
                style={{
                  maxHeight: '500px',
                }}
              >
                {uploadedImage ? (
                  <Image 
                    src={uploadedImage} 
                    alt="Preview" 
                    fill
                    className="object-contain"
                    style={{ filter: selectedFilter.filter }}
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Téléchargez une image ou générez avec l'IA</p>
                  </div>
                )}
                
                {/* Frame preview overlay */}
                {selectedFrame.id !== 'none' && (
                  <div 
                    className="absolute inset-4 border-4 pointer-events-none"
                    style={{ 
                      borderColor: selectedFrame.id === 'premium' ? '#FFD700' : '#1a1a1a',
                    }}
                  />
                )}
              </div>

              {/* Filter preview */}
              {uploadedImage && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">Filtre: {selectedFilter.name}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Partager
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                  <Heart className="w-4 h-4" />
                  Favoris
                </button>
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-6">
              {/* Step 1: Image Upload */}
              <AnimatePresence>
                {activeStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-6"
                  >
                    <h2 className="text-xl font-bold text-white mb-4">1. Choisissez votre image</h2>
                    
                    {/* Upload area */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-gold/50 transition-colors"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-400 mb-2">Glissez une image ou cliquez pour parcourir</p>
                      <p className="text-gray-500 text-sm">PNG, JPG, WEBP jusqu'à 10MB</p>
                    </div>

                    {/* AI Generation */}
                    <div className="mt-6 p-4 bg-electric/10 rounded-lg border border-electric/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Bot className="w-5 h-5 text-electric" />
                        <span className="font-semibold text-white">Génération IA</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder="Décrivez l'image souhaitée..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-electric focus:outline-none"
                        />
                        <button
                          onClick={handleAIGenerate}
                          disabled={isGenerating}
                          className="px-4 py-2 bg-electric text-black rounded-lg hover:bg-gold transition-colors disabled:opacity-50"
                        >
                          {isGenerating ? <Sparkles className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 2: Material */}
              <AnimatePresence>
                {activeStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-6"
                  >
                    <h2 className="text-xl font-bold text-white mb-4">2. Choisissez le matériau</h2>
                    <div className="grid gap-4">
                      {materials.map((material) => (
                        <button
                          key={material.id}
                          onClick={() => setSelectedMaterial(material)}
                          className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                            selectedMaterial.id === material.id
                              ? 'border-gold bg-gold/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <span className="text-3xl">{material.image}</span>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-white">{material.name}</p>
                            <p className="text-sm text-gray-400">{material.description}</p>
                          </div>
                          {selectedMaterial.id === material.id && (
                            <Check className="w-5 h-5 text-gold" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 3: Dimensions */}
              <AnimatePresence>
                {activeStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-6"
                  >
                    <h2 className="text-xl font-bold text-white mb-4">3. Choisissez les dimensions</h2>
                    <div className="grid gap-4">
                      {dimensions.map((dim) => (
                        <button
                          key={dim.id}
                          onClick={() => setSelectedDimension(dim)}
                          className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                            selectedDimension.id === dim.id
                              ? 'border-gold bg-gold/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <Maximize2 className="w-8 h-8 text-gray-400" />
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-white">{dim.name}</p>
                            <p className="text-sm text-gray-400">
                              {dim.id === 'custom' 
                                ? `Largeur: ${customWidth}cm, Hauteur: ${customHeight}cm`
                                : `${dim.width}cm x ${dim.height}cm`
                              }
                            </p>
                          </div>
                          <span className="text-gold">{dim.price.toLocaleString()} XOF</span>
                        </button>
                      ))}
                    </div>
                    
                    {selectedDimension.id === 'custom' && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Largeur (cm)</label>
                          <input
                            type="number"
                            value={customWidth}
                            onChange={(e) => setCustomWidth(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Hauteur (cm)</label>
                          <input
                            type="number"
                            value={customHeight}
                            onChange={(e) => setCustomHeight(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 4: Frame */}
              <AnimatePresence>
                {activeStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-6"
                  >
                    <h2 className="text-xl font-bold text-white mb-4">4. Choisissez le cadre</h2>
                    <div className="grid gap-4">
                      {frames.map((frame) => (
                        <button
                          key={frame.id}
                          onClick={() => setSelectedFrame(frame)}
                          className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                            selectedFrame.id === frame.id
                              ? 'border-gold bg-gold/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <Frame className="w-8 h-8 text-gray-400" />
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-white">{frame.name}</p>
                            <p className="text-sm text-gray-400">{frame.description}</p>
                          </div>
                          <span className="text-gold">
                            {frame.price === 0 ? 'Gratuit' : `${frame.price.toLocaleString()} XOF`}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Color filters */}
                    <div className="mt-6">
                      <h3 className="text-white font-semibold mb-3">Filtre de couleurs</h3>
                      <div className="flex flex-wrap gap-2">
                        {colorFilters.map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                              selectedFilter.id === filter.id
                                ? 'bg-electric text-black'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                          >
                            {filter.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 5: Summary */}
              <AnimatePresence>
                {activeStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-6"
                  >
                    <h2 className="text-xl font-bold text-white mb-4">5. Récapitulatif</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-gray-400">Matériau</span>
                        <span className="text-white">{selectedMaterial.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-gray-400">Dimensions</span>
                        <span className="text-white">{selectedDimension.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-gray-400">Cadre</span>
                        <span className="text-white">{selectedFrame.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-gray-400">Filtre</span>
                        <span className="text-white">{selectedFilter.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-gray-400">Quantité</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-8 h-8 rounded bg-white/10 text-white hover:bg-white/20"
                          >
                            -
                          </button>
                          <span className="text-white w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 rounded bg-white/10 text-white hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between py-4">
                        <span className="text-xl font-bold text-white">Total</span>
                        <span className="text-2xl font-bold gold-text">{totalPrice.toLocaleString()} XOF</span>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-gold text-black font-bold rounded-lg hover:bg-white transition-colors mt-4">
                      Ajouter au panier
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  disabled={activeStep === 1}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Précédent
                </button>
                {activeStep < 5 && (
                  <button
                    onClick={() => setActiveStep(Math.min(5, activeStep + 1))}
                    className="flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-white transition-colors"
                  >
                    Suivant
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, ArrowRight, Sparkles, Eye, EyeOff, LogOut } from 'lucide-react'
import Link from 'next/link'

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

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const redirectInProgress = useRef(false)

  // Check if already logged in - show info but don't auto-redirect
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser)
          setCurrentUser(user)
          setIsLoggedIn(true)
        } catch (e) {
          localStorage.removeItem('user')
        }
      }
    }
    
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      // Clear localStorage
      localStorage.removeItem('user')
      // Clear cookie manually
      document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      setIsLoggedIn(false)
      setCurrentUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    role: 'client' // 'client' or 'admin'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (redirectInProgress.current) return
    
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    if (isLoading) return

    setIsLoading(true)
    setError('')
    
    try {
      if (isLogin) {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Erreur de connexion')
        }

        // Stockage localStorage
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
          if (data.token) {
            localStorage.setItem('token', data.token)
          }
        }
        
        // Redirect selon le rôle
        if (redirectInProgress.current) return
        redirectInProgress.current = true
        
        const userRole = data.user?.role
        const redirectUrl = userRole === 'admin' ? '/admin/' : '/client/'
        
        // Arrêter le chargement
        setIsLoading(false)
        
        // Forcer la redirection
        window.location.assign(redirectUrl)
      } else {
        // Inscription
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Erreur lors de l'inscription")
        }

        // Inscription réussie - rediriger vers le dashboard client
        alert('Compte créé! Redirection vers le dashboard...')
        window.location.href = '/client/'
        return
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-premium-black flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-IA/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Logo />
            <div>
              <span className="text-2xl font-bold gold-text">Graphisme</span>
              <span className="text-xs text-gray-400 block">by ELECTRON</span>
            </div>
          </Link>
        </div>

        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h1>
          <p className="text-gray-400 text-center mb-8">
            {isLogin 
              ? 'Bienvenue ! Connectez-vous à votre compte' 
              : 'Créez votre compte pour commencer'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                    placeholder="Votre nom"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-gold hover:underline">Mot de passe oublié ?</a>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full glass-button glow-gold py-4 disabled:opacity-50">
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                {isLoading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'Créer un compte')}
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 hover:text-gold transition-colors"
            >
              {isLogin 
                ? "Pas encore de compte ? " 
                : "Déjà un compte ? "}
              <span className="text-gold font-semibold">
                {isLogin ? "S'inscrire" : "Se connecter"}
              </span>
            </button>
          </div>

          {isLoggedIn && currentUser ? (
            <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-xl">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gold/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-white font-semibold">Bienvenue, {currentUser.name || 'Utilisateur'}!</h3>
                <p className="text-gray-400 text-sm">{currentUser.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-gold/20 text-gold text-xs rounded-full capitalize">
                  {currentUser.role}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(currentUser.role === 'admin' ? '/admin' : '/client')}
                  className="flex-1 glass-button py-2 text-sm"
                >
                  Aller au {currentUser.role === 'admin' ? 'Admin' : 'Dashboard'}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-500/20 border border-red-500/50 text-red-400 py-2 rounded-xl hover:bg-red-500/30 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 pt-6 border-t border-white/10">
              <Link 
                href="/"
                className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Retour à l'accueil
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

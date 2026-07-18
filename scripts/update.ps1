# Graphisme Update Script for Windows PowerShell
# Run from your project folder

Write-Host "🚀 Mise a jour de Graphisme by ELECTRON" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. Pull latest changes
Write-Host "1. Recuperation des dernieres modifications..." -ForegroundColor Yellow
git pull origin main

# 2. Install dependencies
Write-Host "2. Installation des dependances..." -ForegroundColor Yellow
npm install

# 3. Build the project
Write-Host "3. Construction du projet..." -ForegroundColor Yellow
npm run build

# 4. Check Ollama
Write-Host "4. Verification d'Ollama..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Ollama est en cours d'execution" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Ollama n'est pas en cours d'execution" -ForegroundColor Yellow
    Write-Host "   Demarrez Ollama avec: ollama serve" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Mise a jour terminee!" -ForegroundColor Green
Write-Host ""
Write-Host "Pour demarrer l'application:" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Pour traiter les commandes manuellement:" -ForegroundColor White
Write-Host '  curl -X POST http://localhost:3002/api/automation/trigger -H "Content-Type: application/json" -d "{\"action\":\"process_all\"}"' -ForegroundColor Gray

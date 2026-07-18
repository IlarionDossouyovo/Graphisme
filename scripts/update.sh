#!/bin/bash

# Graphisme Update Script
# Run this from your local machine (Windows PowerShell or Git Bash)

echo "🚀 Mise a jour de Graphisme by ELECTRON"
echo "========================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Pull latest changes
echo -e "${YELLOW}1. Recuperation des dernieres modifications...${NC}"
git pull origin main

# Install dependencies if needed
echo -e "${YELLOW}2. Installation des dependances...${NC}"
npm install

# Build the project
echo -e "${YELLOW}3. Construction du projet...${NC}"
npm run build

# Check if Ollama is running
echo -e "${YELLOW}4. Verification d'Ollama...${NC}"
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Ollama est en cours d'execution${NC}"
else
    echo -e "${YELLOW}⚠️ Ollama n'est pas en cours d'execution${NC}"
    echo "   Demarrez Ollama avec: ollama serve"
fi

echo -e "${GREEN}\n✅ Mise a jour terminee!${NC}"
echo ""
echo "Pour demarrer l'application:"
echo "  npm run dev"
echo ""
echo "Pour traiter les commandes manuellement:"
echo "  curl -X POST http://localhost:3002/api/automation/trigger -H 'Content-Type: application/json' -d '{\"action\":\"process_all\"}'"

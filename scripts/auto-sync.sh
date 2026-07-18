#!/bin/bash

# ==========================================
# Auto-Sync Script - Graphisme by ELECTRON
# Lancez ce script pour synchroniser automatiquement
# les modifications avec GitHub
# ==========================================

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration par défaut
MESSAGE="${1:-Mise a jour automatique}"
DELAY="${2:-60}"
ONE_TIME=false

# Parser les arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --message|-m)
            MESSAGE="$2"
            shift 2
            ;;
        --delay|-d)
            DELAY="$2"
            shift 2
            ;;
        --one-time|-o)
            ONE_TIME=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  -m, --message MSG    Message de commit (défaut: 'Mise a jour automatique')"
            echo "  -d, --delay SEC     Délai entre les synchronisations en secondes (défaut: 60)"
            echo "  -o, --one-time      Synchroniser une seule fois"
            echo "  -h, --help          Afficher cette aide"
            exit 0
            ;;
        *)
            echo "Option inconnue: $1"
            exit 1
            ;;
    esac
done

echo -e "${CYAN}==========================================================${NC}"
echo -e "${CYAN}   Auto-Sync GitHub - Graphisme by ELECTRON            ${NC}"
echo -e "${CYAN}==========================================================${NC}"
echo ""

# Vérifier Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git n'est pas installé!${NC}"
    exit 1
fi

GIT_VERSION=$(git --version)
echo -e "Git installé: ${GREEN}$GIT_VERSION${NC}"

# Vérifier la connexion GitHub
echo -n "Vérification connexion GitHub... "
if git ls-remote --exit-code origin &> /dev/null; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}ÉCHEC${NC}"
    exit 1
fi

# Fonction de synchronisation
sync_changes() {
    echo -e "\n${YELLOW}Synchronisation en cours...${NC}"
    
    git add -A
    
    STATUS=$(git status --porcelain)
    if [ -n "$STATUS" ]; then
        echo -e "\nFichiers modifiés:"
        echo "$STATUS" | while read -r line; do
            file="${line:3}"
            echo "  - $file"
        done
        
        TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
        COMMIT_MSG="$MESSAGE - $TIMESTAMP"
        
        git commit -m "$COMMIT_MSG"
        
        echo -n "Push vers GitHub... "
        if git push origin main 2>&1; then
            echo -e "${GREEN}Terminé!${NC}"
        else
            echo -e "${RED}Erreur!${NC}"
        fi
    else
        echo -e "${YELLOW}Aucun changement détecté${NC}"
    fi
}

if [ "$ONE_TIME" = true ]; then
    echo -e "\n${CYAN}Mode unique - Synchronisation immédiate${NC}"
    sync_changes
else
    echo -e "\n${CYAN}Mode automatique - Vérification toutes les $DELAY secondes${NC}"
    echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter${NC}\n"
    
    while true; do
        sync_changes
        echo -e "\nProchaine synchronisation dans $DELAY secondes..."
        sleep "$DELAY"
    done
fi

@echo off
title = Graphisme by ELECTRON - Mise a jour

echo ==========================================
echo   GRAPHISME BY ELECTRON - MISE A JOUR
echo ==========================================
echo.

cd /d "%USERPROFILE%\Documents\Graphisme"

if errorlevel 1 (
    echo [ERREUR] Le dossier Graphisme n'existe pas!
    echo.
    echo Veuillez cloner le depot:
    echo   git clone https://github.com/IlarionDossouyovo/Graphisme.git
    echo.
    pause
    exit /b 1
)

echo [1/5] Recuperation des mises a jour depuis GitHub...
git pull origin main
if errorlevel 1 (
    echo [ERREUR] Erreur lors du pull!
    pause
    exit /b 1
)
echo [OK] Mises a jour recuperees
echo.

echo [2/5] Suppression du cache...
if exist ".next" (
    rmdir /s /q ".next"
    echo [OK] Cache supprime
) else (
    echo [OK] Pas de cache a supprimer
)
echo.

echo [3/5] Installation des dependances...
call npm install
if errorlevel 1 (
    echo [ERREUR] Erreur lors de l'installation!
    pause
    exit /b 1
)
echo [OK] Dependances installees
echo.

echo [4/5] Construction de l'application...
call npm run build
if errorlevel 1 (
    echo [ERREUR] Erreur lors du build!
    pause
    exit /b 1
)
echo [OK] Application construite
echo.

echo [5/5] Demarrage du serveur de developpement...
echo.
echo ==========================================
echo   L'application demarre sur:
echo   http://localhost:3002
echo ==========================================
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

call npm run dev

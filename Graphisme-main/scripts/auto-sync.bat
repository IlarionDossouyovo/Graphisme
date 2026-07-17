@echo off
REM ==========================================
REM Auto-Sync Script - Graphisme by ELECTRON
REM Lancez ce script pour synchroniser automatiquement
REM les modifications avec GitHub
REM ==========================================

echo.
echo ==========================================================
echo    Auto-Sync GitHub - Graphisme by ELECTRON
echo ==========================================================
echo.

git add -A

git status --porcelain > nul
if %ERRORLEVEL% NEQ 0 (
    echo Erreur: Git n'est pas installe ou pas configure
    pause
    exit /b 1
)

for /f "delims=" %%i in ('git status --porcelain') do set CHANGES=%%i

if "%CHANGES%"=="" (
    echo Aucun changement detecte
) else (
    echo Fichiers modifies:
    git status --porcelain

    for /f "tokens=*" %%a in ('git status --porcelain') do echo   %%a

    echo.
    echo Commit et push...
    git add -A
    git commit -m "Mise a jour automatique - %date% %time%"
    git push origin main

    if %ERRORLEVEL% EQU 0 (
        echo.
        echo Termine avec succes!
    ) else (
        echo.
        echo Erreur lors du push!
    )
)

echo.
pause

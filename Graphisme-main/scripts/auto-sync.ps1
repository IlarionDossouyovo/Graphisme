# ==========================================
# Auto-Sync Script - Graphisme by ELECTRON
# Lancez ce script pour synchroniser automatiquement
# les modifications avec GitHub
# ==========================================

param(
    [string]$Message = "Mise a jour automatique",
    [int]$DelaySeconds = 60,
    [switch]$OneTime
)

$ErrorActionPreference = "Continue"

function Write-ColorOutput {
    param([string]$Message, [string]$Color = "White")
    $colors = @{
        "Red" = [ConsoleColor]::Red
        "Green" = [ConsoleColor]::Green
        "Yellow" = [ConsoleColor]::Yellow
        "Cyan" = [ConsoleColor]::Cyan
        "White" = [ConsoleColor]::White
    }
    Write-Host $Message -ForegroundColor $colors[$Color]
}

Write-ColorOutput "==========================================================" "Cyan"
Write-ColorOutput "   Auto-Sync GitHub - Graphisme by ELECTRON            " "Cyan"
Write-ColorOutput "==========================================================" "Cyan"
Write-Host ""

try {
    $gitVersion = git --version 2>$null
    if (-not $gitVersion) { throw "Git not found" }
    Write-ColorOutput "Git installe: $gitVersion" "Green"
} catch {
    Write-ColorOutput "Git n'est pas installe!" "Red"
    exit 1
}

Write-Host "`nVerification connexion GitHub..." -NoNewline
try {
    $null = git ls-remote --exit-code origin 2>$null
    Write-ColorOutput " OK" "Green"
} catch {
    Write-ColorOutput " ECHEC" "Red"
    exit 1
}

function Sync-Changes {
    Write-Host "`nSynchronisation en cours..." "Yellow"
    
    git add -A
    
    $status = git status --porcelain
    if ($status) {
        Write-Host "`nFichiers modifies:"
        $status | ForEach-Object { 
            $file = $_.Substring(3)
            Write-Host "  - $file" "White"
        }
        
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $commitMsg = "$Message - $timestamp"
        
        git commit -m "$commitMsg"
        
        Write-Host "`nPush vers GitHub..." -NoNewline
        git push origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput " Termine!" "Green"
        } else {
            Write-ColorOutput " Erreur!" "Red"
        }
    } else {
        Write-ColorOutput "Aucun changement detecte" "Yellow"
    }
}

if ($OneTime) {
    Write-ColorOutput "`nMode unique - Synchronisation immediate" "Cyan"
    Sync-Changes
} else {
    Write-ColorOutput "`nMode automatique - Verification toutes les $DelaySeconds secondes" "Cyan"
    Write-ColorOutput "Appuyez sur Ctrl+C pour arreter`n" "Yellow"
    
    while ($true) {
        Sync-Changes
        Write-Host "`nProchaine synchronisation dans $Delay secondes..." "Gray"
        Start-Sleep -Seconds $DelaySeconds
    }
}

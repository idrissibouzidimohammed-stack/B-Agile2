@echo off
title B-AGILE Project Launcher
echo ===================================================
echo           Lancement du Projet B-AGILE              
echo ===================================================
echo.

:: Vérification si le dossier vendor existe
if not exist "vendor" (
    echo [INFO] Installation des dependances PHP - composer install...
    call composer install
)

:: Vérification si le dossier node_modules existe
if not exist "node_modules" (
    echo [INFO] Installation des dependances JS - npm install...
    call npm install
)

echo.
echo [1/2] Démarrage du serveur PHP (Backend)...
start "B-AGILE Backend (Laravel)" cmd /k "php artisan serve"

echo [2/2] Démarrage du serveur Vite (Frontend)...
start "B-AGILE Frontend (Vite)" cmd /k "npm run dev"

echo.
echo ===================================================
echo [SUCCÈS] Les serveurs sont en cours de lancement !
echo.
echo Vous pouvez acceder a l'application sur :
echo -> http://localhost:8000
echo ===================================================
echo.
pause

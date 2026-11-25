@echo off
title Outnext website (local)
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed.
  echo Install the LTS version from https://nodejs.org, then double-click this file again.
  echo.
  pause
  exit /b 1
)

node -e "const [a,b]=process.versions.node.split('.').map(Number);process.exit(a>20||(a===20&&b>=9)?0:1)"
if errorlevel 1 (
  echo.
  echo Node.js 20.9 or newer is required. Your version:
  node -v
  echo Install the LTS version from https://nodejs.org, then double-click this file again.
  echo.
  pause
  exit /b 1
)

if not exist ".env.local" copy ".env.example" ".env.local" >nul

if not exist "node_modules\next" (
  echo.
  echo Installing dependencies. The first run takes a minute or two...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo.
echo Starting the website. Open http://localhost:3000 when you see "Ready".
echo Keep this window open while you use the site. Close it to stop the server.
echo.
call npm run dev
pause

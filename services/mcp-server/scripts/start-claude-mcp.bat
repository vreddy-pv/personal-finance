@echo off
REM Start Personal Finance MCP Server for Claude Integration

setlocal enabledelayedexpansion

REM Get the directory where this script is located
set SCRIPT_DIR=%~dp0
set SERVICE_DIR=%SCRIPT_DIR%..

echo 🚀 Starting Personal Finance MCP Server...
echo Service directory: %SERVICE_DIR%

REM Check if we're in the right directory
if not exist "%SERVICE_DIR%\requirements.txt" (
    echo ❌ Error: requirements.txt not found in %SERVICE_DIR%
    echo Make sure you're running this script from the correct location.
    exit /b 1
)

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Python is not installed or not in PATH
    echo Please install Python 3.8+ and add it to your PATH
    exit /b 1
)

REM Install dependencies if not already installed
echo 📦 Checking dependencies...
python -c "import fastmcp" 2>nul
if errorlevel 1 (
    echo Installing dependencies...
    pip install -r "%SERVICE_DIR%\requirements.txt"
) else (
    echo ✅ Dependencies already installed
)

REM Display configuration
echo.
echo 📋 Configuration:
echo   Backend API: http://localhost:8080
echo   MCP Server: http://localhost:8000
echo.

REM Start the server
echo Starting server on port 8000...
echo Press Ctrl+C to stop
echo.

cd /d "%SERVICE_DIR%"
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

@echo off

echo Starting the Login Service...

REM Activate virtual environment if it exists
if exist .\.venv\Scripts\activate.bat (
    echo Activating virtual environment...
    call .\.venv\Scripts\activate.bat
) else (
    echo Virtual environment not found. Running with global Python.
)

REM Start the service on port 8001
uvicorn main:app --reload --port 8001

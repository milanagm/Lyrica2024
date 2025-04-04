#!/bin/bash

# Ensure the script always operates from the backend folder
cd "$(dirname "$0")" || exit 1

# Define the virtual environment path within the backend folder
VENV_DIR=".venv"

# Ensure the virtual environment exists in the backend folder
if [ ! -d "$VENV_DIR" ]; then
    echo "Virtual environment not found. Creating one..."
    python3 -m venv "$VENV_DIR"
fi

# Activate the virtual environment in the backend folder
source "$VENV_DIR/bin/activate"

# Install dependencies (optional, ensures everything is set up)
pip install -r requirements.txt

# Start the backend server
uvicorn app.main:app --reload

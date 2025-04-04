# app/models.py

# This file contains the data models used for inputs in the FastAPI application.
# - `FileAnalysisInput`: Model for classifying emotions from a given text.

# The goal is to keep the data structures clean and reusable.

from pydantic import BaseModel

# Pydantic model for /analyze_file endpoint
class FileAnalysisInput(BaseModel):
    text: str  # File content as text
    instrumental: bool  # Whether the user wants instrumental music

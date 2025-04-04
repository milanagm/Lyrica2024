# app/main.py

# Purpose:
# Entry point for the FastAPI application.
# Delegates logic to `emotion_classifier.py` and `music_recommendation.py`.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import FileAnalysisInput
from app.emotion_classifier import classify_emotion
from app.music_recommendation import fetch_music

# FastAPI-App
app = FastAPI()

# Middleware to handle Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/analyze_file")
async def analyze_file(input: FileAnalysisInput):
    """
    Analyze text content, classify the emotion, and recommend a track.
    Delegates emotion classification and track recommendation to `classify_emotion` and `fetch_music`.
    """
    # Step 1: Classify the emotion
    emotion = classify_emotion(input.text)

    # Step 2: Fetch a music track
    track = fetch_music(emotion, input.instrumental)

    return {"emotion": emotion, "track": track}

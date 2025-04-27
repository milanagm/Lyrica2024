# app/main.py

# Purpose:
# Entry point for the FastAPI application.
# Delegates logic to `emotion_classifier.py` and `music_recommendation.py`.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import FileAnalysisInput
from app.emotion_classifier import classify_emotion
from app.music_recommendation import fetch_music
from app.database import db

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

    # Save to MongoDB
    await db.analysis.insert_one({
        "text": input.text,
        "emotion": emotion,
        "track": track,
        "instrumental": input.instrumental,
    })

    return {"emotion": emotion, "track": track}

## add endpoints to retreive past song data (files) based on name

@app.get("/history/{text}")
async def get_history_by_name(text: str):
    results = await db.analysis.find({"text": text}).to_list(length=100)
    return results[0]["track"]

## get last five records
@app.get("/history")
async def get_history():
    # Get the last 5 records, sorted by _id in descending order (newest first)
    results = await db.analysis.find().sort("_id", -1).limit(5).to_list(length=5)
    # Convert ObjectId to string for JSON serialization
    for result in results:
        result["_id"] = str(result["_id"])
    return results
# music_recommendation.py

# Purpose:
# This file contains logic for recommending music tracks based on the detected emotion.
# It works with `emotion_classifier.py` by receiving the emotion and providing a track recommendation.

import requests
from fastapi import HTTPException
from app.utils import get_env_variable  # Helper function for environment variables

# Load Jamendo Client ID
JAMENDO_CLIENT_ID = get_env_variable("JAMENDO_CLIENT_ID")

def fetch_music(emotion: str, instrumental: bool) -> dict:
    """
    Fetches a music track from the Jamendo API based on emotion and instrumental preference.

    Args:
        emotion (str): The emotion detected from the input text.
        instrumental (bool): Whether the track should be instrumental.

    Returns:
        dict: Track details (e.g., name, artist, audio URL).
    """
    # Debugging Jamendo API call
    print(f"DEBUG: Fetching music for emotion '{emotion}', instrumental={instrumental}")
    
    tag = f"instrumental,{emotion}" if instrumental else emotion
    url = f"https://api.jamendo.com/v3.0/tracks?client_id={JAMENDO_CLIENT_ID}&tags={tag}&order=popularity_total_desc&limit=1"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if not data["results"]:
            raise HTTPException(status_code=404, detail=f"No tracks found for emotion '{emotion}'.")
        
        track = data["results"][0]
        return {
            "track_name": track["name"],
            "artist_name": track["artist_name"],
            "audio_url": track["audio"],
        }
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching track: {str(e)}")

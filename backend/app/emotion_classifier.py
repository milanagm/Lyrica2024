# emotion_classifier.py

# Purpose:
# This file contains logic for emotion classification using OpenAI's GPT API.
# It works with `music_recommendation.py` by providing the detected emotion, which is used to recommend music.

from app.utils import get_openai_client  # Helper function to initialize OpenAI client
from pydantic import BaseModel
from openai import OpenAI

# Initialize OpenAI client
openai_client = get_openai_client()
# openai_client = OpenAI()

class feeling(BaseModel):
    emotion: str

def classify_emotion(text: str) -> str:
    """
    Calls OpenAI API to classify the emotion of the input text.

    Args:
        text (str): The text to analyze.

    Returns:
        str: The detected emotion as a string (e.g., "happiness").
    """
    # Debugging OpenAI API call
    print(f"DEBUG: Sending text to OpenAI API: {text}")
    
    response = openai_client.beta.chat.completions.parse(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "Analyze emotions from text."},
            {"role": "user", "content": f"Classify the emotion of this text: {text}"},
        ],
        response_format=feeling,
    )
    # Debugging OpenAI response
    print(f"DEBUG: OpenAI Response: {response}")

    emotion_sentence = response.choices[0].message
    emotion = "angry"       #default value
    if emotion_sentence.parsed:
        emotion = emotion_sentence.parsed.emotion
    
    else:
        print("DEBUG: faced an issue with parsing the emotion from message")
        
    # Extract the emotion from the response
    # print("emotion sentence")
    # emotion = emotion_sentence.split()[-1].strip(".")
    return emotion
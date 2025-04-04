# emotion_classifier.py

# Purpose:
# This file contains logic for emotion classification using OpenAI's GPT API.
# It works with `music_recommendation.py` by providing the detected emotion, which is used to recommend music.

from app.utils import get_openai_client  # Helper function to initialize OpenAI client

# Initialize OpenAI client
openai_client = get_openai_client()

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
    
    response = openai_client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Analyze emotions from text."},
            {"role": "user", "content": f"Classify the emotion of this text: {text}"},
        ],
    )
    # Debugging OpenAI response
    print(f"DEBUG: OpenAI Response: {response}")
    
    # Extract the emotion from the response
    emotion_sentence = response.choices[0].message.content.strip()
    emotion = emotion_sentence.split()[-1].strip(".")
    return emotion

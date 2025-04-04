import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

try:
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "Hello, do you get this message?"}
        ],
        max_tokens=20,
    )
    print("Antwort:", response.choices[0].message.content)
    
except Exception as e:
    import traceback
    traceback.print_exc()

    
# app/utils.py

# Purpose:
# Helper functions for environment variable management and external API client setup.

import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from the .env file
load_dotenv()

def get_env_variable(key: str) -> str:
    """
    Retrieve an environment variable's value.
    Raises an error if the variable is not found.
    """
    value = os.getenv(key)
    if not value:
        raise ValueError(f"Environment variable {key} is missing.")
    return value

def get_openai_client() -> OpenAI:
    """
    Initialize and return an OpenAI client using the API key.
    """
    api_key = get_env_variable("OPENAI_API_KEY")
    return OpenAI(api_key=api_key)

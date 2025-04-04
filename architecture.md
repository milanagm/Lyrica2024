# Lyrica Architecture Explained

## Project Overview
Lyrica is a web application that analyzes text to detect emotions and recommends music tracks based on the detected emotions. 
The application consists of a React frontend and a FastAPI backend.

## Directory Structure
```
LyricaMAIN/
├── frontend/                 # React 
│   ├── src/
│   │   ├── assets/         
│   │   ├── components/     # React components
│   │   │   ├── parent-component/
│   │   │   ├── child-components/
│   │   │   └── grandchild-components/
│   │   ├── utilities/api.js     # Utility functions
│   │   ├── index.js             # Application entry point
│   │   └── index.css            # Global styles
│   └── package.json             # Frontend dependencies
└── backend/                 # FastAPI 
    ├── app/
    │   ├── __init__.py
    │   ├── main.py         # application entry point
    │   ├── models.py       # Data models
    │   ├── emotion_classifier.py  # Emotion analysis logic
    │   ├── music_recommendation.py # Music recommendation logic
    │   └── utils.py        # Utility functions
    └── requirements.txt    # Backend dependencies
```

## Backend Architecture

### Core Components

#### 1. main.py
- **Purpose**: Entry point for the FastAPI application
- **Key Methods**:
  - `analyze_file(input: FileAnalysisInput)`: Main endpoint that orchestrates emotion classification and music recommendation
- **Dependencies**:
  - `emotion_classifier.py` for emotion analysis
  - `music_recommendation.py` for track recommendations
  - `models.py` for data models

#### 2. emotion_classifier.py
- **Purpose**: Handles emotion classification using OpenAI's GPT API
- **Key Methods**:
  - `classify_emotion(text: str) -> str`: Analyzes text and returns detected emotion
- **Dependencies**:
  - `utils.py` for OpenAI client initialization

#### 3. music_recommendation.py
- **Purpose**: Recommends music tracks based on emotions using Jamendo API
- **Key Methods**:
  - `fetch_music(emotion: str, instrumental: bool) -> dict`: Fetches music track based on emotion and instrumental preference
- **Dependencies**:
  - `utils.py` for environment variable management

#### 4. models.py
- **Purpose**: Defines data models for API requests/responses
- **Key Classes**:
  - `FileAnalysisInput`: Model for text analysis requests
    - `text: str`: Input text to analyze
    - `instrumental: bool`: Whether to prefer instrumental tracks

#### 5. utils.py
- **Purpose**: Provides utility functions for environment management and API clients
- **Key Methods**:
  - `get_env_variable(key: str) -> str`: Retrieves environment variables
  - `get_openai_client() -> OpenAI`: Initializes OpenAI client

## Frontend Architecture

### Component Hierarchy

#### 1. App.js (Parent Component)
- **Purpose**: Root component that renders the main application interface
- **Key Features**:
  - Renders `EmotionMusicPlayer` component
- **Location**: `frontend/src/components/parent-component/`

#### 2. EmotionMusicPlayer.js (Child Component)
- **Purpose**: Main application logic and state management
- **Key Features**:
  - Manages application state (text, emotion, track, loading, error)
  - Handles API calls through `classifyEmotionAPI`
  - Renders all grandchild components
- **Location**: `frontend/src/components/child-components/`

#### 3. Grandchild Components
Located in `frontend/src/components/grandchild-components/`:

1. **FileInput.js**
   - Handles file upload functionality
   - Updates parent state with file content

2. **TextInput.js**
   - Manages text input field
   - Updates parent state with user input

3. **EmotionDisplay.js**
   - Displays the detected emotion
   - Receives emotion as prop from parent

4. **TrackPlayer.js**
   - Renders music player interface
   - Displays track information and audio controls

5. **ToggleSwitch.js**
   - Manages instrumental music preference
   - Updates parent state with toggle value

6. **ErrorMessage.js**
   - Displays error messages
   - Receives error text as prop from parent

7. **HistoryList.js**
   - Shows analysis history
   - Manages local storage persistence

### Utilities

#### api.js
- **Purpose**: Centralizes API communication
- **Key Methods**:
  - `classifyEmotionAPI(text, instrumental)`: Makes POST request to backend
- **Location**: `frontend/src/utilities/`

## Component Interactions

### Backend Flow
1. Client sends POST request to `/analyze_file` endpoint
2. `main.py` receives request and validates input using `FileAnalysisInput` model
3. `emotion_classifier.py` analyzes text using OpenAI API
4. `music_recommendation.py` fetches matching track from Jamendo API
5. Response containing emotion and track details is sent back to client

### Frontend Flow
1. User interacts with `FileInput` or `TextInput` components
2. `EmotionMusicPlayer` manages state and API calls
3. User toggles instrumental preference using `ToggleSwitch`
4. On analysis:
   - `classifyEmotionAPI` is called with text and instrumental preference
   - Response updates emotion and track states
   - Results are displayed using `EmotionDisplay` and `TrackPlayer`
   - History is updated and persisted in localStorage
5. Error handling through `ErrorMessage` component

## API Integration

### External APIs
1. **OpenAI API**
   - Used for emotion classification
   - Configured through environment variables

2. **Jamendo API**
   - Used for music track recommendations
   - Requires client ID from environment variables

### Internal API
- **Backend Endpoint**: `http://127.0.0.1:8000/analyze_file`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "text": "string",
    "instrumental": boolean
  }
  ```
- **Response**:
  ```json
  {
    "emotion": "string",
    "track": {
      "track_name": "string",
      "artist_name": "string",
      "audio_url": "string"
    }
  }
  ```

## State Management
- Frontend uses React's useState and useEffect hooks
- Local storage for persisting analysis history
- Backend maintains stateless architecture with FastAPI

## Error Handling
- Frontend: Component-level error states and display
- Backend: FastAPI exception handling and HTTP status codes
- API: Request/response validation and error propagation

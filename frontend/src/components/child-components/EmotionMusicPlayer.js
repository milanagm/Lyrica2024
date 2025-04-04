// EmotionMusicPlayer.js

// This is a child component within the "child-components" folder. 
// It manages the state, API logic, and renders grandchild components from the "grandchild-components" folder. 

// It is used by the App.js file, which resides in the "parent-component" folder.

import React, { useState, useEffect } from "react"; // Import useEffect for managing localStorage sync
import FileInput from "../grandchild-components/FileInput"; 
import TextInput from "../grandchild-components/TextInput"; 
import ToggleSwitch from "../grandchild-components/ToggleSwitch"; 
import EmotionDisplay from "../grandchild-components/EmotionDisplay"; 
import TrackPlayer from "../grandchild-components/TrackPlayer"; 
import ErrorMessage from "../grandchild-components/ErrorMessage"; 
import HistoryList from "../grandchild-components/HistoryList"; 
import { classifyEmotionAPI } from "../../utilities/api"; 

import banner from "../../assets/Lirica_Banner.svg";

const EmotionMusicPlayer = () => {
  // Main state variables for managing the application logic.
  const [inputMode, setInputMode] = useState("file"); // for toggling between file and text input modes
  const [text, setText] = useState(""); // to store user input or uploaded file content
  const [emotion, setEmotion] = useState(""); // to store the classified emotion result
  const [loading, setLoading] = useState(false); // to indicate whether the app is processing data
  const [track, setTrack] = useState(null); // to store track details (e.g., song name and artist)
  const [error, setError] = useState(""); // to store error messages for display
  const [instrumental, setInstrumental] = useState(false); // to determine if instrumental tracks are preferred
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || [] // Initialize the analysis history from localStorage
  );

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history)); // Persist the analysis history in the browser's localStorage
  }, [history]);

  // API call for emotion classification
  const classifyEmotion = async () => {
    setLoading(true); // Begin loading state
    setError(""); // Clear any previous errors
    setTrack(null); // Clear previous track data

    // Validate input
    if (!text.trim()) {
      setError("Please provide text or upload a file."); // if no input is provided
      setLoading(false);
      return;
    }

    try {
      // Call the classifyEmotionAPI function to analyze the text and fetch track details
      const data = await classifyEmotionAPI(text, instrumental);
      setEmotion(data.emotion); // Update the emotion state with the API response
      setTrack(data.track); // Update the track details state with the API response

      // Add the result to the analysis history
      const newEntry = {
        text, // User-provided text
        emotion: data.emotion, // Detected emotion
        track: data.track, // Track recommendation details
        timestamp: new Date().toLocaleString(), // Timestamp of the analysis
      };
      setHistory([newEntry, ...history]); // Add the new entry to the beginning of the history array
    } catch (error) {
      setError("Error in classification. Please try again."); // if the API call fails
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <>
      {/* Replace the original header with the banner image */}
      <header className="banner">
        <img src={banner} alt="Lirica Banner" className="banner-image" />
      </header>

      {/* Main container for the app interface */}
      <div className="container">
        <h2>Emotion Music Player</h2> {/* App title */}
        <h4>
          <em>"Tunes to match your text"</em> {/* App tagline */}
        </h4>

        {/* Input mode toggle: Allows users to switch between file upload and text input */}
        <div>
          <label>
            <input
              type="radio"
              value="file"
              checked={inputMode === "file"} // Checked state for file input mode
              onChange={() => setInputMode("file")} // Switch to file input mode
            />
            Upload File
          </label>
          <label>
            <input
              type="radio"
              value="text"
              checked={inputMode === "text"} // Checked state for text input mode
              onChange={() => setInputMode("text")} // Switch to text input mode
            />
            Type Text
          </label>
        </div>

        {/* Conditional rendering for file or text input */}
        {inputMode === "file" ? (
          <FileInput setText={setText} /> // Component to handle file uploads
        ) : (
          <TextInput text={text} setText={setText} /> // Component to handle text input
        )}

        {/* Instrumental toggle: Allows users to specify if they prefer instrumental tracks */}
        <ToggleSwitch instrumental={instrumental} setInstrumental={setInstrumental} />

        {/* Analyze emotion button */}
        <button onClick={classifyEmotion} disabled={loading}>
          {loading ? "Loading..." : "Analyze Emotion"} {/* Show "Loading..." while processing */}
        </button>

        {/* Render detected emotion, recommended track, or any error messages */}
        {emotion && <EmotionDisplay emotion={emotion} />}
        {track && <TrackPlayer track={track} />}
        {error && <ErrorMessage error={error} />}

        {/* Render analysis history */}
        <HistoryList history={history} />
      </div>
    </>
  );
};

export default EmotionMusicPlayer;

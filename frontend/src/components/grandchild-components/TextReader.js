// TextReader.js
// This component provides text-to-speech functionality for the input text.
// It uses the Web Speech API to read the text aloud.

import React, { useState, useEffect } from "react";

const TextReader = ({ text }) => {
  const [isReading, setIsReading] = useState(false);
  const [volume, setVolume] = useState(1.0); // Default volume (0.0 to 1.0)
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [utterance, setUtterance] = useState(null);

  // Initialize speech synthesis when component mounts
  useEffect(() => {
    if (window.speechSynthesis) {
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);
      
      // Create a new utterance
      const newUtterance = new SpeechSynthesisUtterance();
      newUtterance.volume = volume;
      setUtterance(newUtterance);
      
      // Clean up on unmount
      return () => {
        if (synth.speaking) {
          synth.cancel();
        }
      };
    }
  }, []);

  // Update volume when it changes
  useEffect(() => {
    if (utterance) {
      utterance.volume = volume;
    }
  }, [volume, utterance]);

  // Handle play/pause button click
  const toggleReading = () => {
    if (!speechSynthesis || !text) return;

    if (isReading) {
      // Stop reading
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      // Start reading
      utterance.text = text;
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // If Web Speech API is not supported
  if (!window.speechSynthesis) {
    return <p>Text-to-speech is not supported in your browser.</p>;
  }

  return (
    <div className="text-reader">
      <h3>Text Reader</h3>
      <button 
        onClick={toggleReading} 
        disabled={!text}
        className={isReading ? "reading" : ""}
      >
        {isReading ? "Stop Reading" : "Read Text"}
      </button>
      
      <div className="volume-control">
        <label htmlFor="tts-volume">Text Volume: </label>
        <input
          type="range"
          id="tts-volume"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span>{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
};

export default TextReader; 
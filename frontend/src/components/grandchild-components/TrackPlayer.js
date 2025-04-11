// TrackPlayer.js
// This component displays the audio player for the recommended track.
// Now includes volume control functionality.

import React, { useState, useRef, useEffect } from "react";

const TrackPlayer = ({ track }) => {
  const [volume, setVolume] = useState(1.0); // Default volume (0.0 to 1.0)
  const audioRef = useRef(null);

  // Update audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="track-player">
      <h3>Now Playing:</h3>
      <p>
        {track.track_name} by {track.artist_name}
      </p>
      <audio ref={audioRef} controls>
        <source src={track.audio_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className="volume-control">
        <label htmlFor="music-volume">Music Volume: </label>
        <input
          type="range"
          id="music-volume"
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

export default TrackPlayer;

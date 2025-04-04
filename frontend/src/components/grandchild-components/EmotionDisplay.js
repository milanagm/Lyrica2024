// EmotionDisplay.js
// This component displays the classified emotion.
// Purpose: To show the emotion detected by the backend in a clear and user-friendly manner.

import React from "react"; // Import React to define the functional component.

const EmotionDisplay = ({ emotion }) => (
  // Render the detected emotion as a paragraph.
  // The `emotion` prop is passed down from the parent component (EmotionMusicPlayer).
  <p>Detected Emotion: {emotion}</p>
);

export default EmotionDisplay; // Export the component for use in other parts of the app.

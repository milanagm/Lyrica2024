// TextInput.js
// This component manages text input for user-provided text.
// Purpose: Allows users to manually enter text and updates the parent component's state with the provided input.

import React from "react"; // Import React to define the functional component.

const TextInput = ({ text, setText }) => (
  <div>
    {/* Section for entering text */}
    <h2>Enter Text</h2>
    <textarea
      placeholder="Type your text here..." // Guide users on what to input.
      value={text} // Display the current text state.
      onChange={(e) => setText(e.target.value)} // Update parent component's state on text change.
    />
  </div>
);

export default TextInput; // Export the component for use in other parts of the app.

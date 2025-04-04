// ToggleSwitch.js
// This component provides a toggle switch for instrumental-only preference.
// Purpose: Allows users to select whether they want instrumental tracks only and updates the parent component's state accordingly.

import React from "react"; // Import React to define the functional component.

const ToggleSwitch = ({ instrumental, setInstrumental }) => (
  <div>
    {/* Checkbox input for the instrumental-only toggle */}
    <input
      type="checkbox" // Render a checkbox input.
      id="instrumentalToggle" // Associate with a label for accessibility.
      checked={instrumental} // Reflect the current state of the toggle.
      onChange={(e) => setInstrumental(e.target.checked)} // Update parent component's state when toggled.
    />
    {/* Label for the toggle switch */}
    <label htmlFor="instrumentalToggle">Instrumental Only</label> {/* Descriptive label for the toggle */}
  </div>
);

export default ToggleSwitch; // Export the component for use in other parts of the app.

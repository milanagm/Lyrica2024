// ErrorMessage.js
// This component displays error messages.
// Purpose: To show user-friendly error messages in a clear, visually distinct manner.

import React from "react"; // Import React to define the functional component.

const ErrorMessage = ({ error }) => (
  // Render the error message using a CSS class for consistent styling.
  <p className="error-message">{error}</p> // The class "error-message" is defined in index.css.
);

export default ErrorMessage; // Export the component to be used in other parts of the app.

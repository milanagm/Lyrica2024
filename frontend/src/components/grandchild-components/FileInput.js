// FileInput.js
// This component handles file uploads for text files.
// Purpose: Enables users to upload plain text files, processes the file content, and updates the parent component's state.

import React from "react"; // Import React to define the functional component.

const FileInput = ({ setText }) => {
  /**
   * Handles the file upload event.
   * - Validates that the uploaded file is a plain text file.
   * - Reads the file content and updates the `text` state in the parent component using the `setText` prop.
   * 
   * @param {Object} e - Event object triggered by the file input.
   */
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file.
    if (file && file.type === "text/plain") {
      const reader = new FileReader(); // Create a new FileReader instance.
      reader.onload = (event) => setText(event.target.result); // Read file content and pass it to `setText`.
      reader.readAsText(file); // Start reading the file as plain text.
    } else {
      // Alert the user if the uploaded file is not a plain text file.
      alert("Please upload a valid text file.");
    }
  };

  return (
    <div>
      {/* Section for uploading text files */}
      <h3>Upload a Text File</h3>
      <input
        type="file"
        accept=".txt" // Restrict file types to .txt files.
        onChange={handleFileUpload} // Trigger file handling on file selection.
      />
    </div>
  );
};

export default FileInput; // Export the component for use in other parts of the app.

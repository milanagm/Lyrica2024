// HistoryList.js
// This component displays a history of past analyses, including text, emotion, and track details.
// Purpose: To enhance user experience by allowing them to revisit past analyses.

import React from "react"; // Import React to define the functional component.

const HistoryList = ({ history }) => (
  <div>
    <h3>Analysis History</h3>
    {history.length === 0 ? (
      <p>No history available yet.</p>
    ) : (
      <ul>
        {history.map((entry, index) => (
          // Apply the new CSS class to style the list item.
          <li key={index} className="history-list-item">
            <p>
              <strong>Timestamp:</strong> {entry.timestamp}
            </p>
            <p>
              <strong>Text:</strong> {entry.text}
            </p>
            <p>
              <strong>Emotion:</strong> {entry.emotion}
            </p>
            <p>
              <strong>Track:</strong> {entry.track.track_name} by{" "}
              {entry.track.artist_name}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default HistoryList; // Export the component for use in other parts of the app.

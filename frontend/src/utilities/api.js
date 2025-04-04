// api.js
// This utility file centralizes API calls for emotion classification.
// Purpose: To separate API logic from component logic, improving maintainability and readability.

export const classifyEmotionAPI = async (text, instrumental) => {
  // Construct a POST request to the backend emotion analysis endpoint.
  const response = await fetch("http://127.0.0.1:8000/analyze_file", {
    method: "POST", // HTTP method for creating or sending data.
    headers: { "Content-Type": "application/json" }, // Specify JSON payload for API.
    body: JSON.stringify({ text, instrumental }), // Miguel's addition: Send input text and instrumental toggle state.
  });

  // Handle API errors by checking the response status.
  if (!response.ok) {
    // Extract error details from the API response if available.
    const errorData = await response.json();
    throw new Error(
      errorData.detail || "Failed to analyze file." // Miguel's addition: Provide a clear error message.
    );
  }

  // Parse and return the JSON response from the API if the request is successful.
  return response.json();
};

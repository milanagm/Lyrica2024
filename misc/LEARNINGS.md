# Application Documentation

## Team Details

**Team Name:** Miguel Angel Rodriguez-Arias
**Team Members:** Milana Gurbanova
**Team Members:**Silvana Moiceanu

## Description

Our product is a web application that allows users to input text by typing, copying, or uploading a text file. The application analyzes the emotion conveyed in the text and matches it with an appropriate song. Users can then play the song directly within the frontend interface, creating an engaging and interactive experience.

## Purpose

The application aims to address two key problems:

1. **Enhancing Multisensory Reading Experiences:**
   By providing music that matches the emotional tone of a text, the application helps users immerse themselves more deeply into the content. This can be particularly useful for individuals who struggle to focus on reading due to stress or distractions, allowing them to better connect with the material.

2. **Encouraging Reading Among Children:**
   Children often find reading monotonous or lose interest quickly. By adding a multisensory layer through music, this application makes reading more engaging and stimulating, encouraging children to spend more time with books.

## APIs Used and general Architecture

The application architecture leverages the following technologies and APIs:

- **React (Frontend):** The user interface was built using React.
- **FastAPI (Backend):** Enables communication between the frontend and backend.
- **OpenAI API:** Responsible for text emotion classification, assigning an emotion to the input text.
- **Jamendo API:** Matches the classified emotion with a suitable song and sends it to the frontend for playback.

# LEARNINGS.md

## Original Goal and Achievements

Our initial goal was to develop a live screen reader and emotion classifier that could dynamically identify text on a screen and match it with music in real-time. However, due to time constraints and technical challenges, we adjusted our approach. The final product classifies emotions and matches songs based on text inputs provided by the user, rather than operating in real-time. While this is a step back from the live functionality, it still fulfills the core idea of emotion-based song matching.

## Project Description and Functionality

The project provides a web-based platform with the following functionalities:

- Users can input text by typing, copying, or uploading a text file.
- The application classifies the emotion of the text using the OpenAI API.
- The classified emotion is matched with a song via the Jamendo API.
- Users can play the matched song directly in the frontend.
- An additional option allows users to request instrumental songs only, ensuring that lyrics do not distract them while reading.

## Learnings

### Skills Acquired

- **API Integration:** Gained hands-on experience using FastAPI, OpenAI API, and Jamendo API.
- **Backend Development:** Learned to manage sensitive information securely with `.env` files and `gitignore`.
- **Frontend-Backend Communication:** Explored the use of Postman to test and debug API endpoints.
- **Collaborative Software Development:** Developed skills in using Git for version control, including managing pull requests, merges, and resolving conflicts.
- **Project Management:** Improved team coordination and decision-making using GitHub for collaboration.

### Challenges and Mistakes

- **Scope Adjustment:** Initially aimed to implement a live screen reader but had to pivot due to complexity.
- **API Constraints:** Faced issues with the Spotify API’s terms and conditions, prompting a switch to the Jamendo API.
- **Technical Hurdles:** Experienced difficulties in ensuring seamless integration between frontend and backend components.

Despite these challenges, the project was a valuable learning experience, equipping us with skills and insights for future development.

# BeyondChats Assistant

A modern, interactive chat interface built with React, TypeScript, and Material-UI that provides smart responses to common customer queries.

## Key Features

- **Interactive Chat Interface**: Clean and user-friendly chat window.
- **Predefined Responses**: Offers quick answers to common questions based on keywords.
- **Dynamic Suggestions**: Provides contextual suggestions to guide the conversation.
- **User and AI Messages**: Clearly distinguishes between user messages and AI responses.
- **Responsive Design**: Adapts to different screen sizes (though not explicitly coded, Material-UI helps).

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static typing and improved code quality.
- **Material-UI (MUI)**: For UI components and styling.
- **Vite**: As the build tool and development server.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (v6 or higher) or yarn

### Installation & Setup

1. **Clone the repository (if applicable) or download the source code.**
   ```bash
   # If you have git installed
   # git clone <repository_url>
   # cd BeyondChats_Assignment
   ```

2. **Navigate to the project directory:**
   ```bash
   cd path/to/BeyondChats_Assignment
   ```

3. **Install dependencies:**
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

### Running the Application

1. **Start the development server:**
   Using npm:
   ```bash
   npm run dev
   ```
   Or using yarn:
   ```bash
   yarn dev
   ```

2. **Open your browser:**
   The application will typically be available at `http://localhost:5173` (or another port if 5173 is in use). The console output from the `npm run dev` command will show the exact URL.

## How It Works

The application maintains a list of messages and suggestions. When a user sends a message:
1. The user's message is added to the chat display.
2. The input is checked against a list of predefined keywords.
   - If a keyword is found, a corresponding predefined response is displayed.
   - Otherwise, a generic acknowledgment is shown.
3. Based on the conversation (e.g., if 'product' or 'return' is mentioned), the list of quick suggestions is updated to provide relevant follow-up questions.
4. Clicking a suggestion populates the input field for easy sending.

This provides a basic but effective way to handle common user interactions and guide them through available information.
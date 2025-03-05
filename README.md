# Code Reviewer AI

Welcome to the Code Reviewer AI project! This application leverages the power of Next.js, Tailwind CSS, and FastAPI to provide an intelligent code review system.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Code Reviewer AI is designed to assist developers by providing automated code reviews. It analyzes code for potential issues, suggests improvements, and helps maintain code quality.

## Features

- **Automated Code Reviews**: Analyze your code for potential issues and improvements.
- **Next.js Frontend**: A modern, responsive UI built with Next.js and Tailwind CSS.
- **FastAPI Backend**: A robust and scalable backend powered by FastAPI.
- **Real-time Feedback**: Get instant feedback on your code changes.

## Installation

To get started with Code Reviewer AI, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/code-reviewer-ai.git
   cd code-reviewer-ai
   ```

2. **Install dependencies**:
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

   - For the backend:
     ```bash
     cd backend
     <!-- pip install -r requirements.txt -->
     ```

3. **Run the application**:
   - Start the FastAPI backend:
     ```bash
     uvicorn main:app --reload
     or
     fastapi dev main.py
     ```

   - Start the Next.js frontend:
     ```bash
     npm run dev
     ```

## Usage

Once the application is running, you can access the frontend at `http://localhost:3000` and interact with the code review features. The backend API is available at `http://localhost:8000`.

## Contributing

We welcome contributions to Code Reviewer AI! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
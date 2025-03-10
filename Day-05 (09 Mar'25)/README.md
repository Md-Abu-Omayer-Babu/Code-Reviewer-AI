# Code Reviewer AI

## Overview
This project is a Code Reviewer AI application designed to assist in reviewing and analyzing code. It consists of a backend built with FastAPI and a frontend built with Next.js.

## Features
- **Automated Code Reviews**: Analyze your code for potential issues and improvements.
- **Next.js Frontend**: A modern, responsive UI built with Next.js and Tailwind CSS.
- **FastAPI Backend**: A robust and scalable backend powered by FastAPI.
- **Real-time Feedback**: Get instant feedback on your code changes.

## Project Structure
```
Day-03 (06 Mar'25)
├── backend
│   ├── api
│   ├── db
│   ├── models
│   ├── services
│   ├── main.py
│   ├── requirements.txt
├── frontend
│   ├── public
│   ├── src
│   │   ├── app
│   │   │   ├── codereviewerai-analyze
│   │   │   ├── codereviewerai-file-upload
│   │   │   ├── Components
│   │   │   ├── globals.css
│   │   │   ├── layout.js
│   │   │   ├── page.js
│   ├── package.json
│   ├── next.config.mjs
```

## Installation
To get started with Code Reviewer AI, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Md-Abu-Omayer-Babu/Code-Reviewer-AI.git
   cd Code-Reviewer-AI
   ```
2. Navigate to the `Day-03 (06 Mar'25)` directory:
   ```bash
   cd Day-03 (06 Mar'25)
   ```
3. Install dependencies:
   - **For the frontend**:
     ```bash
     cd frontend
     npm install
     ```
   - **For the backend**:
     ```bash
     cd backend
     pip install -r requirements.txt
     ```

## Usage
Once the application is running, you can access the frontend at [http://localhost:3000](http://localhost:3000) and interact with the code review features. The backend API is available at [http://localhost:8000](http://localhost:8000).

### Running the Application
1. **Start the FastAPI backend**:
   ```bash
   uvicorn main:app --reload
   ```
   or
   ```bash
   fastapi dev main.py
   ```
2. **Start the Next.js frontend**:
   ```bash
   npm run dev
   ```

## Setup Instructions

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   or
   ```bash
   fastapi dev main.py
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Next.js development server:
   ```bash
   npm run dev
   ```

## Latest Works
To get the latest works, go to [https://github.com/Md-Abu-Omayer-Babu/Code-Reviewer-AI/tree/main/Day-03%20(06%20Mar'25)](https://github.com/Md-Abu-Omayer-Babu/Code-Reviewer-AI/tree/main/Day-03%20(06%20Mar'25)).

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License.

# TaskAsin: Project Management Tool

**An Innovative Project Management Solution** 📝

Welcome to TaskAsin! This project management tool was created as part of my internship with CODSOFT. The goal was to build a comprehensive and responsive tool that helps teams and individuals manage their projects effectively. In this detailed description, you'll find information about the project's structure, technology stack, features, and deployment. Let's dive in!

## Overview

TaskAsin is a full-stack project management application that enables users to manage tasks, assign responsibilities, and track project progress. The frontend is built with React + Vite and TypeScript, offering a fast and modern user interface, while the backend uses Node.js and Express.js for a robust server-side foundation. Authentication and authorization are handled through JWT (JSON Web Tokens), ensuring security and role-based access. Input validation and sanitization are managed with Express Validator on the backend and Yup on the frontend. MongoDB serves as the primary database, providing scalability and flexibility.

## Key Features

- **Task Management**: Create, and assign tasks with detailed descriptions, and statuses. Assign tasks to individuals or teams for collaboration and tracking.
- **User Authentication and Authorization**: Secure user authentication with JWT, allowing only authorized users to access protected routes and features. 🔒
- **Input Validation and Sanitization**: All user inputs are validated and sanitized using Express Validator and Yup, ensuring data integrity and security. ✅
- **Toast Notifications**: React Toastify is used to display success and error messages, providing real-time feedback to users. 🎉
- **Protected Routes**: Frontend routes are protected to prevent unauthorized access. Only logged-in users can view certain pages. 🛡️
- **Responsive Design**: TaskAsin is designed to be responsive, offering a seamless user experience across desktops, tablets, and smartphones. 📱
- **Cross-Origin Resource Sharing (CORS)**: CORS options and configuration are implemented to allow secure cross-origin communication between the frontend and backend.
- **Task Assignment**: Users can assign tasks to others, allowing for delegation and improved teamwork. 🤝

## Technology Stack

- **Frontend**: React + Vite, TypeScript for type safety, Tailwind CSS for styling, React Toastify for notifications, and Yup for frontend input validation.
- **Backend**: Node.js with Express.js, TypeScript for type safety, JWT for authentication, Express Validator for input validation, and MongoDB for data storage.
- **Deployment**: Frontend is deployed on Netlify, providing scalability and reliability. Backend is deployed on Render.com, ensuring robust server-side infrastructure.

## Getting Started

To run TaskAsin locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. **Install Dependencies**

   - Frontend:
     ```bash
     cd client
     npm install
     ```
   - Backend:
     ```bash
     cd server
     npm install
     ```

3. **Start the Servers**

   - Frontend:
     ```bash
     npm run dev
     ```
   - Backend:
     ```bash
     npm run devStart
     ```

4. **Access the Application**
   - Frontend: Open `https://asinhonore-projectmanagement-web-app.netlify.app` in your browser.
   - Backend: The server runs on `http://localhost:5050`.

## Contributions and Licensing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Contact Information

For questions, suggestions, or feedback, please contact me at [asinhonore823@gmail.com](mailto:asinhonore823@gmail.com). Please use "TaskAsin" in the subject line for a quick response. ✉️

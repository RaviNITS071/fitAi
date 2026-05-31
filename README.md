# fitAi
# 🛠️ FitAI - Comprehensive Tech Stack Documentation // LIVE LINK : https://fitai-ivd5.onrender.com

This document provides an in-depth breakdown of the technologies, frameworks, and tools used to architect and develop **FitAI**, a highly responsive and scalable full-stack web application.

---

## 💻 Frontend Ecosystem (Client-Side)

The frontend is designed to be fast, interactive, and visually stunning, providing users with a seamless experience across all devices.

* **React.js:** The core JavaScript library used for building the user interface. It allows us to build reusable components (like `Navbar`, `ProfileForm`, `PlanDisplay`) and manage complex state efficiently.
* **React Router DOM:** Handles client-side routing, enabling a Single Page Application (SPA) experience. It allows seamless navigation between pages (Home, Login, Dashboard) without reloading the browser.
* **Tailwind CSS:** A utility-first CSS framework used for rapid UI development. It powers the glassmorphism effects, responsive grids, gradient animations, and the seamless Dark/Light mode toggling.
* **Axios:** A promise-based HTTP client used to make asynchronous API requests to our backend securely and cleanly.
* **Lucide React:** A beautifully crafted, highly customizable open-source icon library. Used to enhance the visual hierarchy and UX (e.g., `Dumbbell`, `Activity`, `Sun`, `Moon` icons).

---

## ⚙️ Backend Ecosystem (Server-Side)

The backend acts as the logic engine of FitAI, securely processing user data, handling authentication, and generating AI-driven fitness plans.

* **Node.js:** A JavaScript runtime environment that executes server-side code, allowing us to use JavaScript for both the frontend and the backend.
* **Express.js:** A fast, minimalist web framework for Node.js. It is used to set up the RESTful API endpoints (`/api/login`, `/api/generate-plan`), handle HTTP requests, and manage middleware.
* **CORS (Cross-Origin Resource Sharing):** A Node.js package used as middleware to securely allow our frontend domain to communicate with our separate backend domain.
* **Dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`, keeping sensitive data like database URIs and secret keys secure.

---

## 🗄️ Database Architecture

FitAI requires a highly flexible database to store user profiles, dynamic biometric data, and complex generated fitness plans.

* **MongoDB Atlas:** A fully managed cloud NoSQL database service. It stores user data in flexible, JSON-like documents, making it perfect for the dynamic data structures required for adaptive fitness tracking.
* **Mongoose:** An elegant Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model application data, enforce strict validation rules, and manage relationships between data entities.

---

## 🚀 Deployment & DevOps

To ensure FitAI is highly available and scalable, modern cloud deployment platforms are utilized.

* **Render:** A unified cloud hosting platform used to deploy both the frontend and backend.
    * **Frontend:** Deployed as a **Static Site**, utilizing rewrite rules to properly handle React Router's SPA routing.
    * **Backend:** Deployed as a **Web Service**, running the Node.js/Express server continuously in the cloud.
* **Git & GitHub:** Used for source code management, version control, and triggering automatic continuous integration/continuous deployment (CI/CD) pipelines on Render.

---

## 🔄 Data Flow Architecture

1.  **User Interaction:** The user interacts with the React UI (e.g., submits the login form).
2.  **API Request:** Axios sends an HTTP POST request containing the data to the Express backend.
3.  **Processing & Validation:** Express routes the request, and Mongoose validates the incoming data against defined schemas.
4.  **Database Transaction:** The backend securely reads from or writes to the MongoDB Atlas cluster.
5.  **Response:** The backend sends a JSON response back to the client.
6.  **State Update:** React updates the UI dynamically based on the received data (e.g., logging the user in and redirecting to the Dashboard).

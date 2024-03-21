<h1>MERN Stack React Chat Application</h1>

This is a full-stack chat application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The frontend is developed with React using Vite as the build tool, and the backend is powered by Node.js with Express.js. This application allows users to register, log in, and engage in real-time chat conversations.

<h3>Features</h3>
User authentication: Users can register, log in, and log out securely.
Real-time chat: Users can create chat rooms, join existing rooms, and send/receive messages in real-time.
Responsive design: The application is designed to be usable and visually appealing on various devices and screen sizes.


<h3>Technologies Used</h3>
<h4>Frontend:</h4>

React.js, 
Vite, 
HTML/CSS, 
WebSocket (for real-time communication)

<h4>Backend:</h4>

Node.js
Express.js
MongoDB (with Mongoose ORM)
WebSocket (for real-time communication)


<h3>Prerequisites</h3>
Before running this application, ensure you have the following installed:

Node.js and npm (Node Package Manager)
MongoDB database server

<h3>Get Started</h3>
Clone the repository: git clone https://github.com/yourusername/React-Chat-Application.git

Navigate to the project directory: cd react-chat-app

Install dependencies:
cd frontend
npm install
cd backend
npm install

Set up environment variables:

Create a .env file in the server directory.
Define the following variables in the .env file:
MONGODB_URI: MongoDB connection URI
JWT_SECRET: Secret key for JWT token generation

Start the backend server:
cd backend
npm run server

Start the frontend development server:

<h3>Folder Structure</h3>
<div>
your folder path
├── frontend/                  # Frontend directory
│   ├── public/              # Static assets
│   └── src/                 # Source files
│       ├── components/      # React components
│       ├── pages/           # Application pages
│       ├── utils/           # Utility functions
│       ├── App.js           # Main React application component
│       └── index.js         # Entry point for the React application
├── backend/                  # Backend directory
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── .env                 # Environment variables file (not included in the repository)
│   ├── app.js               # Express application setup
│   └── server.js            # Entry point for the Node.js application
├── README.md                # Project documentation
└── .gitignore               # Git ignore file
  </div>
npm run dev

Open your web browser and navigate to http://localhost:5173 to view the application.

<h3>Contributing</h3>
Contributions are welcome! Feel free to submit issues and pull requests.





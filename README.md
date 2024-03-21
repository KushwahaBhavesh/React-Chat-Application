MERN Stack React Chat Application
This is a simple chat application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The frontend is created with Vite for faster development, and the backend is powered by Node.js.

Features
Real-time chat functionality
User authentication
Persistent message storage in MongoDB
Responsive design
Emoji support
User profile management (update username, password, etc.)
Typing indicators
Online/offline status indicators
Notification for new messages
Prerequisites
Before running this application, ensure you have the following installed:

Node.js (v14 or later)
MongoDB
Installation
Clone this repository:

bash
Copy code
git clone https://github.com/yourusername/react-chat-app.git
Navigate into the project directory:

bash
Copy code
cd react-chat-app
Install dependencies for both frontend and backend:

bash
Copy code
cd client
npm install
cd ../server
npm install
Set up environment variables:

Create a .env file in the server directory and add the following variables:

plaintext
Copy code
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Run the backend server:

bash
Copy code
cd server
npm start
Run the frontend:

bash
Copy code
cd client
npm start
Visit http://localhost:3000 in your browser to view the application.

Usage
Register or login with your credentials.
Once logged in, you can start chatting with other users.
Messages are displayed in real-time.
Messages are stored in the MongoDB database, allowing users to view chat history even after logging out.
Update your profile information by navigating to the profile section.
See who's online and typing with online/offline status and typing indicators.
Receive notifications for new messages, even when the tab is not focused.
Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any problems or have suggestions for improvements.

License
This project is licensed under the MIT License. See the LICENSE file for details.

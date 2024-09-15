import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  {
    id: 4,
    content:
      "React is a popular JavaScript library for building user interfaces",
    important: true,
  },
  {
    id: 5,
    content: "JavaScript can be used for both frontend and backend development",
    important: true,
  },
  {
    id: 6,
    content: "CSS stands for Cascading Style Sheets",
    important: false,
  },
  {
    id: 7,
    content: "Node.js allows JavaScript to run outside the browser",
    important: true,
  },
  {
    id: 8,
    content: "State management is crucial in React applications",
    important: true,
  },
];

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

import React from "react";
import Course from "./components/Course.jsx";

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux for state management",
        exercises: 11,
        id: 4,
      },
      {
        name: "Node.js and Express",
        exercises: 20,
        id: 5,
      },
      {
        name: "MongoDB and Mongoose",
        exercises: 12,
        id: 6,
      },
      {
        name: "Testing React components",
        exercises: 8,
        id: 7,
      },
      {
        name: "GraphQL and Apollo",
        exercises: 10,
        id: 8,
      },
      {
        name: "TypeScript with React",
        exercises: 9,
        id: 9,
      },
      {
        name: "Introduction to Webpack",
        exercises: 6,
        id: 10,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;

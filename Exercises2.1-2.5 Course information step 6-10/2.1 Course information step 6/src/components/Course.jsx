import React from "react";
import Content from "./Content";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;

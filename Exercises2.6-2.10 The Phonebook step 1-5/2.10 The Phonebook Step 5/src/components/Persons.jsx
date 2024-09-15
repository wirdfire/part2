import React from "react";

const Persons = ({ persons }) => (
  <div>
    {persons.map(person => 
      <Person key={person.name} person={person} />
    )}
  </div>
);

const Person = ({ person }) => (
  <p>{person.name} {person.number}</p>
);

export default Persons;
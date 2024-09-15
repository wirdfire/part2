import { useState, useEffect } from "react";
import personsService from "./services/persons.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState({ message: null, type: "" });

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => console.error("Error fetching persons:", error));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObject = { name: newName, number: newNumber };
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
            setNotification({
              message: `Updated ${newName}'s number`,
              type: "success",
            });
            setTimeout(
              () => setNotification({ message: null, type: "" }),
              5000
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            if (error.response && error.response.status === 404) {
              // Handle 404 error specifically
              setNotification({
                message: `Information for ${newName} has already been removed from server`,
                type: "error",
              });
              setPersons(
                persons.filter((person) => person.id !== existingPerson.id)
              ); // Remove person from state
            } else {
              setNotification({
                message: `Error updating ${newName}`,
                type: "error",
              }); //General error notification
            }
            setTimeout(
              () => setNotification({ message: null, type: "" }),
              5000
            );
          });
      }
    } else {
      // Add new person
      personsService
        .create(newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotification({ message: `Added ${newName}`, type: "success" }); // Show success notification
          setTimeout(() => setNotification({ message: null, type: "" }), 5000); // Clear notification after 5 seconds
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          setNotification({
            message: `Error adding ${newName}`,
            type: "error",
          }); // Show error notification
          setTimeout(() => setNotification({ message: null, type: "" }), 5000); // Clear notification after 5 seconds
        });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({ message: `Deleted ${name}`, type: "success" }); // Show success notification
          setTimeout(() => setNotification({ message: null, type: "" }), 5000); // Clear notification after 5 seconds
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          alert(`The person '${name}' was already removed from the server`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <div>
        filter shown with{" "}
        <input value={filterName} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;

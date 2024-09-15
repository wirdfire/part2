import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '883473748934' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event)=>{
    event.preventDefault()
    setNewName(event.target.value)
  }
  const handleNumberChange = (event)=>{
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const addPerson = (event)=>{
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
        if(nameExists){
            alert(`${newName} already exist in the phonebook`)
            return
        }

  const newPerson = {name: newName, number: newNumber}
  setPersons(persons.concat(newPerson))
  setNewName('')
  setNewNumber('')

}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
        <li key={index}>{person.name}: {person.number}</li>
        ))}
      </ul>
      <div>debug: {newName} {newNumber}</div>
    </div>
  )
}

export default App
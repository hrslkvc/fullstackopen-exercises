import React, { useState } from "react";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";

const App = () => {
    const [persons, setPersons] = useState([]);

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    const handleNameInput = event => setNewName(event.target.value);
    const handleNumberInput = event => setNewNumber(event.target.value);

    const handleFilter = event => setFilter(event.target.value);

    const peopleToShow = filter
        ? persons.filter(person => person.name.toLowerCase().includes(filter))
        : persons;

    const handleSubmit = event => {
        event.preventDefault();

        const hasNameAlready = persons.filter(
            person => person.name === newName
        );

        if (hasNameAlready.length) {
            alert(`${newName} is already in the phonebook`);
            setNewName("");
            setNewNumber("");
            return false;
        }

        const person = {
            name: newName,
            number: newNumber
        };

        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} onChange={handleFilter} />
            <h2>Add a new number</h2>

            <Form
                onSubmit={handleSubmit}
                newName={newName}
                newNumber={newNumber}
                handleNameInput={handleNameInput}
                handleNumberInput={handleNumberInput}
            />
            <h2>Numbers</h2>
            <Numbers peopleToShow={peopleToShow} />
        </div>
    );
};

export default App;

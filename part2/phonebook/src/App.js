import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";

import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        personService.getAll().then(response => setPersons(response.data));
    }, []);

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
            const confirmReplace = window.confirm(
                `${newName} is already in the phonebook, replace the old number with a new one?`
            );

            if (confirmReplace) {
                const personToUpdate = persons.find(p => p.name === newName);

                personService
                    .update({ ...personToUpdate, number: newNumber })
                    .then(response =>
                        setPersons(
                            persons.map(person =>
                                person.id === personToUpdate.id
                                    ? response.data
                                    : person
                            )
                        )
                    );
            }
        } else {
            personService
                .create({
                    name: newName,
                    number: newNumber
                })
                .then(response => setPersons(persons.concat(response.data)));
        }

        setNewName("");
        setNewNumber("");
    };

    const deletePerson = person => {
        const confirmDelete = window.confirm(`Delete person ${person.name}?`);

        if (confirmDelete) {
            personService
                .deleteObject(person.id)
                .then(setPersons(persons.filter(p => p.id !== person.id)));
        }
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
            <Numbers peopleToShow={peopleToShow} deletePerson={deletePerson} />
        </div>
    );
};

export default App;

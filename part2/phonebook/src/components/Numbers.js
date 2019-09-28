import React from "react";

const Numbers = ({ peopleToShow, deletePerson }) =>
    peopleToShow.map(person => (
        <p key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person)}>Delete</button>
        </p>
    ));

export default Numbers;

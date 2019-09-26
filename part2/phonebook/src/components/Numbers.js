import React from "react";

const Numbers = ({ peopleToShow }) =>
    peopleToShow.map(person => (
        <p key={person.name}>
            {person.name} {person.number}
        </p>
    ));

export default Numbers;

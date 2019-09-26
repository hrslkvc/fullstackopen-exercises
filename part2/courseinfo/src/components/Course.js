import React from "react";

const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Course = ({ course }) => {
    const parts = course.parts.map(part => <Part part={part} key={part.id} />);
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <>
            <Header name={course.name}>{course.name}</Header>
            {parts}
            <p>
                <strong>Total exercises: {total}</strong>
            </p>
        </>
    );
};

export default Course;

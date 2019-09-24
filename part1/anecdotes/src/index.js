import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = props => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(6).fill(0));
    const [mostVotes, setMostVotes] = useState(0);

    useEffect(() => {
        setMostVotes(votes.indexOf(Math.max(...votes)));
    }, [votes]);

    const randomize = () => {
        const randomValue = Math.floor(Math.random() * Math.floor(6));
        setSelected(randomValue);
    };

    const handleVote = () => {
        const temp = [...votes];
        temp[selected] += 1;
        setVotes(temp);
    };

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{props.anecdotes[selected]}</p>
            <p>Has {votes[selected]} votes</p>

            <button onClick={handleVote}>Vote</button>
            <button onClick={randomize}>Next anecdote</button>

            <h2>Anecdote with most votes</h2>
            <p>{props.anecdotes[mostVotes]}</p>
            <p>Has {votes[mostVotes]} votes</p>
        </div>
    );
};

const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));

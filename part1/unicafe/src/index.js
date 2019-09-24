import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Statistics = props => {
    if (props.feedbackGiven) {
        return (
            <>
                <h2>statistics</h2>
                <table>
                    <tbody>
                        <Statistic text={"Good"} value={props.data.good} />
                        <Statistic
                            text={"Neutral"}
                            value={props.data.neutral}
                        />
                        <Statistic text={"Bad"} value={props.data.bad} />
                        <Statistic
                            text={"All"}
                            value={props.data.allFeedback}
                        />
                        <Statistic
                            text={"Average"}
                            value={props.data.average}
                        />
                        <Statistic
                            text={"Positive"}
                            value={props.data.positivePercentage}
                        />
                    </tbody>
                </table>
            </>
        );
    }

    return <h2>No feedback given</h2>;
};

const Statistic = props => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    );
};

const Button = props => {
    return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const [allFeedback, setAllFeedback] = useState(0);

    const [average, setAverage] = useState(0.0);
    const [positivePercentage, setPositivePercentage] = useState(0);

    const [feedbackGiven, setFeedbackGiven] = useState(false);

    const statisticsData = {
        good,
        neutral,
        bad,
        allFeedback,
        average,
        positivePercentage
    };

    useEffect(() => {
        let average = (good - bad) / allFeedback;
        let positive = (good / allFeedback) * 100;
        setAverage(average || 0);
        setPositivePercentage(positive || 0);
    }, [good, bad, allFeedback]);

    const handleFeedback = feedback => {
        return () => {
            setFeedbackGiven(true);
            if (feedback === 1) {
                setGood(good + 1);
            } else if (feedback === 0) {
                setNeutral(neutral + 1);
            } else if (feedback === -1) {
                setBad(bad + 1);
            }
            setAllFeedback(allFeedback + 1);
        };
    };

    return (
        <div>
            <h2>Give feedback</h2>
            <Button text={"good"} onClick={handleFeedback(1)}></Button>
            <Button text={"neutral"} onClick={handleFeedback(0)}></Button>
            <Button text={"bad"} onClick={handleFeedback(-1)}></Button>
            <Statistics data={statisticsData} feedbackGiven={feedbackGiven} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

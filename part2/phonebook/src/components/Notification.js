import React from "react";

const Notification = ({ message }) => {
    if (message) {
        
        const style = {
            color: message.type === "error" ? "red" : "green",
            borderStyle: "solid",
            borderRadius: 5,
            padding: 5,
            backgroundColor: "lightgray"
        };

        return (
            <div style={style}>
                <p>{message.text}</p>
            </div>
        );
    }

    return null;
};

export default Notification;

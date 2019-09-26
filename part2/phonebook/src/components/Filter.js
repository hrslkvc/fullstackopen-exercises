import React from "react";

const Filter = props => (
    <p>
        Filter shown <input value={props.filter} onChange={props.onChange} />
    </p>
);

export default Filter;

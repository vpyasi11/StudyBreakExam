import React from "react";

const Question = ({ question, options, selected }) => {
  return (
    <div className="question">
      <h3>{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => selected(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;

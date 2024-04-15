import React from "react";
import "./QuestionLayout.css";
import check from "./check.png";

const QuestionLayout = ({ questionData, onOkClick }) => {
    if (!questionData || !Array.isArray(questionData) || questionData.length === 0) {
        return <div className="error-message">No questions available.</div>;
    }
    return (
        <div className="questions-cont">
            {questionData.map((data, index) => {
                // Ensure each data object contains the required properties
                const hasRequiredProps = data.title && data.options__001 && data.answers__001;
                if (!hasRequiredProps) {
                    console.error(`Missing or invalid data at index ${index}`);
                    return null; // Skip rendering this data
                }

                return (
                    <div key={index} className="question-block">
                        <div className="subject">Subject: {data.subject || "N/A"}</div>
                        <div className="question">
                            Q{index + 1}. {data.title || "N/A"}
                        </div>

                        <div className="options">
                            {/* Iterate over options and answers */}
                            {["001", "002", "003", "004", "005"].map(num => {
                                const option = data[`options__${num}`] || "";
                                const answer = data[`answers__${num}`] || "";

                                return option ? (
                                    <div key={num} className="option">
                                        {option}
                                        {option === answer && (
                                            <img className="check" src={check} alt="correct answer" />
                                        )}
                                    </div>
                                ) : null;
                            })}
                        </div>

                        <div className="cont1">
                            <div className="sub-topic">Sub Topic: {data.subTopic || "N/A"}</div>
                            <div className="difficulty-level">Difficulty Level: {data.level || "N/A"}</div>
                        </div>

                        <div className="cont2">
                            <div className="q-type">Type: {data.type || "N/A"}</div>
                            <div className="a-type">Answer Type: {data.answerType || "N/A"}</div>
                        </div>
                    </div>
                );
            })}

            <button className="ok-button" onClick={onOkClick}>
                OK
            </button>
        </div>
    );
};

export default QuestionLayout;
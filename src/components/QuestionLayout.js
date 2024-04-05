import React from "react";
import "./QuestionLayout.css";
import check from './images/check.png'

const QuestionLayout = (props) => {
  return (
    <div className="questions-cont">
      <div className="subject">Subject: {props.subject}</div>
      <div className="question">
        Q{props.qnum + 1}. {props.question}
      </div>

      <div className="options">
        <div className="option">
          {props.option1}
          {props.option1 === props.answer1 ? <img className='check' src={check}/> : ""}
        </div>

        {props.option2 && props.option2.length > 0 &&
        <div className="option">
          {props.option2}
          {props.option2 === props.answer2 ? <img className='check' src={check}/> : ""}
        </div>}

        {props.option3 && props.option3.length > 0 &&
        <div className="option">
          {props.option3}
          {props.option3 === props.answer3 ? <img className='check' src={check}/> : ""}
        </div>}

        {props.option4 && props.option4.length > 0 &&
        <div className="option">
          {props.option4} 
          {props.option4 === props.answer4 ? <img className='check' src={check}/> : ""}
        </div>}

        {props.option5 && props.option5.length > 0 &&
        <div className="option">
          {props.option5}
          {props.option5 === props.answer5 ? <img className='check' src={check}/> : ""}
        </div>}
        
      </div>
      <div className="cont1">
        <div className="sub-topic">Sub Topic: {props.subTopic}</div>
        <div className="difficulty-level">Difficulty Level: {props.level}</div>
      </div>
      <div className="cont2">
        <div className="q-type">Type: {props.qtype}</div>
        <div className="a-type">Answer Type: {props.atype}</div>
      </div>
    </div>
  );
};

export default QuestionLayout;

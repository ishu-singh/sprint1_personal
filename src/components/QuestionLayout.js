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
          {props.answer.includes('A') ? <img className='check' src={check}/> : ""}
        </div>

        {props.option2 && props.option2.length > 0 &&
        <div className="option">
          {props.option2}
          {props.answer.includes('B') ? <img className='check' src={check}/> : ""}
        </div>}

        {props.option3 && props.option3.length > 0 &&
        <div className="option">
          {props.option3}
          {props.answer.includes('C') ? <img className='check' src={check}/> : ""}
        </div>}

        {props.option4 && props.option4.length > 0 &&
        <div className="option">
          {props.option4} 
          {props.answer.includes('D') ? <img className='check' src={check}/> : ""}
        </div>}

        {props.option5 && props.option5.length > 0 &&
        <div className="option">
          {props.option5}
          {props.answer.includes('E') ? <img className='check' src={check}/> : ""}
        </div>}
        {props.option6 && props.option6.length > 0 &&
        <div className="option">
          {props.option6}
          {props.answer.includes('F') ? <img className='check' src={check}/> : ""}
        </div>}
        {props.option7 && props.option7.length > 0 &&
        <div className="option">
          {props.option7}
          {props.answer.includes('G') ? <img className='check' src={check}/> : ""}
        </div>}
        {props.option8 && props.option8.length > 0 &&
        <div className="option">
          {props.option8}
          {props.answer.includes('H') ? <img className='check' src={check}/> : ""}
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

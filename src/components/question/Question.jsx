import "./QuestionLayout.css";
import check from './check.png'

export default function Question(props) {
    let qnum= props.index
    props =  props.data 
    const options = props.options.split(",")
    let answers = props.answers.split(",");
    // let options = questionData.options.split(",")
    
    // return (
    //     <div className="question">
    //         <div className="subject">{questionData.subject}</div>
    //         <div className="title">{questionData.title}</div>
    //         <div className="options">
    //             <ol>
    //                {
    //                 options.map((data,index)=>{
    //                     return <li>{data}</li>
    //                 })
    //                }
    //             </ol>
    //         </div>
    //     </div>
    // )
    // console.log(answers)

    return(
        <>
        <div>        
            <div className="questions-cont">
            <div className="subject">Subject: {props.subject}</div>
            <div className="question">
            Q{qnum + 1}. {props.title}
            </div>


            
            <div className="options">
                {
                    options.map((data,index) => {

                        return(
                            <div className="option">
                                {index + 1} . 
                                {data}
                                {answers.includes(data) ? <img className="check" src={check}></img> : ""}
                            </div>
                        )
                    })
                }
            </div>
    
           
            <div className="cont1">
            <div className="sub-topic">Sub Topic: {props.subTopic}</div>
            <div className="difficulty-level">Difficulty Level: {props.level}</div>
            </div>
            <div className="cont2">
            <div className="q-type">Type: {props.type}</div>
            <div className="a-type">Answer Type: {props.answerType}</div>
            </div>
        </div>
      </div>
      
      </>
    )
}
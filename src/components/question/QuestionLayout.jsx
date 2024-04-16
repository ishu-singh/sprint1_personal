// NEW

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Question from "./Question";

export default function QuestionLayout() {

    const location = useLocation();
    const navigate = useNavigate();

  const { questionData } = location.state;

//   function handleOk(){
    

//   }

  function handleCancel(){
    navigate("/")
  }

  return(
    <>
    {questionData.map(
        (data,index)=>{
            // console.log(data)
            return <Question data = {data} index = {index} />
        }
    )}

    <div className="but">
        <button>Upload</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>

    </>
  )
    
}
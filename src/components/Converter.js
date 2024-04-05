import React, { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import QuestionLayout from "./QuestionLayout";
import './Converter.css'

const ExcelPage = () => {
  const [questionData, setQuestionData] = useState(null);
  const [previewData, setPreviewData] = useState(false);
  const [questions, setQuestions] = useState([])
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;

      // Check file extension
      if (file.name.endsWith(".csv")) {
        // Parse CSV
        Papa.parse(binaryString, {
          complete: (result) => {
            const csvData = result.data;

            // const jsonFormattedData = csvconvertToJSON(csvData);
            console.log("csv", csvData);

            const extractedQuestions = csvData.map(row => row.title)


            // Set the extracted data into their respective states
         
            setQuestionData(csvData);
            setQuestions(extractedQuestions)

            
          },
          header: true, // Treat first row as header
        });
      } else if (file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) {
        // Parse Excel
        const workbook = XLSX.read(binaryString, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 0 });

        const extractedQuestions = excelData.map(row => row.title)

          console.log(excelData)
            // Set the extracted data into their respective states
            setQuestionData(excelData);
            setQuestions(extractedQuestions);
            

      } else {
        console.error("Unsupported file format");
      }
    };
    reader.readAsBinaryString(file);
  };

  
  const handlePreview = () => {
    setPreviewData(true);
  };

  return (
    <div>
      {questions.length === 0 ? (
        <>
          <h1>File Reader</h1>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handlePreview}> Preview </button>
          <br />
          <button> Upload</button>
        </>
      ) : (
      <div className="cont">
        {questionData.map((data, index) => (
          
          <QuestionLayout
            question={data.title}
            option1={data.options__001}
            option2={data.options__002}
            option3={data.options__003}
            option4={data.options__004}
            option5={data.options__005}
            subTopic={data.subTopic}
            qtype={data.type}
            atype={data.answerType}
            level={data.level}
            subject={data['ï»¿"subject"']}
            answer1={data.answers__001}
            answer2={data.answers__002}
            answer3={data.answers__003}
            answer4={data.answers__004}
            answer5={data.answers__005}
            qnum={index}
          />
          
        ))}
                <button>Ok</button>
        <button >Cancel</button>
        </div>

      )}
      
    </div>
  );
};

export default ExcelPage;

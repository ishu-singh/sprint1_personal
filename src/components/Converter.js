// NEW

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import QuestionLayout from "./question/QuestionLayout";
import './Converter.css';
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


const ExcelPage = () => {
  const [questionData, setQuestionData] = useState([]);
  const [previewData, setPreviewData] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([])
  const [answers, setAnswers] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileFormatError, setFileFormatError] = useState(false);
  const [isUploadEnabled, setIsUploadEnabled] = useState(false); // State variable to control upload button
  const navigate = useNavigate();
  // const location = useLocation();
  var exceld;

  // Handle file change event
  const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
      setIsUploadEnabled(true)

    // Check file extension
    if (!file.name.endsWith(".csv") && !file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      setFileFormatError(true); // Set file format error state
      return;
    }else{

      setFileFormatError(false); // Reset file format error state
    }

  };

  // Handle preview event and navigate to preview page
  const handlePreview = () => {
    // Declare the 'reader' variable using the 'const' keyword
    const reader = new FileReader();

    // Rest of your code
    reader.onload = (event) => {
        const binaryString = event.target.result;

      // Check file extension and parse accordingly
      if (selectedFile.name.endsWith(".csv")) {
        Papa.parse(binaryString, {
          complete: (result) => {
            const csvData = result.data;
            const extractedQuestions = csvData.map(row => row.title);
            setQuestionData(csvData);
            setQuestions(extractedQuestions);
            setPreviewData(true);
          },
          header: true, // Treat first row as header
        });
      } else if (selectedFile.name.endsWith(".xls") || selectedFile.name.endsWith(".xlsx")) {
        const workbook = XLSX.read(binaryString, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
        const extractedQuestions = excelData.map(row => row.title);
        setQuestionData(excelData);
        setQuestions(extractedQuestions);
        setPreviewData(true);
      } else {
        console.error("Unsupported file format");
      }
    };

    // Read file as binary string
    reader.readAsBinaryString(selectedFile);
};
  // Handle cancel event
  const handleCancelClick = () => {
      setSelectedFile(null);
      setQuestionData(null);
      setPreviewData(false);
      setIsUploadEnabled(false); // Disable upload button
  };

  // Handle Ok event in preview page
//   const handleOkClick = () => {
//       navigate("/");
//       setIsUploadEnabled(true); // Enable upload button after navigating back to home
//   };

  const handleUpload = () => {

    console.log("called")
    if (!questionData) {
      console.error("No data to upload");
      return;
    }
 
   
    const endpoint = "backend-api-url";
 
    // Make a POST request to backend API
    axios.post(endpoint, { questions: questionData })
      .then(response => {
        console.log("Upload successful:", response);
       
      })
      .catch(error => {
        console.error("Upload failed:", error);
      });
  };

  return (
    <div className="main">
      {/* Include the Navbar component */}
      <Navbar />
      {questions.length === 0 ? (
        <>
          <h1>Upload Question Bank</h1>
          <input type="file" onChange={handleFileChange} />
          {fileFormatError && <p>Please upload an Excel or CSV file only.</p>}
          <div className="button-container">
          <button onClick={handlePreview} disabled={!selectedFile || fileFormatError} className={(!selectedFile || fileFormatError) ? 'disabled' : ''}> Preview </button>

            <button> Upload</button>
          </div>
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </>
      ) : (
        <div className="cont">
          {questionData.map((data, index) => (
            <QuestionLayout
              key={index}
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
              subject={data["subject"]}
              answer1={data.answers__001}
              answer2={data.answers__002}
              answer3={data.answers__003}
              answer4={data.answers__004}
              answer5={data.answers__005}
              qnum={index}
            />
          ))}
          <button>Ok</button>
          <button>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ExcelPage;
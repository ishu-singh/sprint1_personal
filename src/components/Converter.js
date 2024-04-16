import React, { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import QuestionLayout from "./QuestionLayout";
import './Converter.css';
import Navbar from "./Navbar"

const ExcelPage = () => {
  const [questionData, setQuestionData] = useState(null);
  const [previewData, setPreviewData] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([])
  const [answers, setAnswers] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileFormatError, setFileFormatError] = useState(false); // State variable for file format error

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Check file extension
    if (!file.name.endsWith(".csv") && !file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      setFileFormatError(true); // Set file format error state
      return;
    }else{

      setFileFormatError(false); // Reset file format error statenpm start
    }

  };

  const handlePreview = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();

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
        // const extractedOptions = excelData.map(row => row.options.split(','));
        const extractedAnswers = excelData.map(row => row.answers.split(','));
        console.log("data",extractedAnswers)
        // const convertedOptions = extractedOptions.split(",")
        setQuestionData(excelData);
        setAnswers(extractedAnswers)
        setQuestions(extractedQuestions);
        // setOptions(extractedOptions)
        setPreviewData(true);
      } else {
        console.error("Unsupported file format");
      }
    };

    reader.readAsBinaryString(selectedFile);
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
              option1={data['Option A']}
              option2={data['Option B']}
              option3={data['Option C']}
              option4={data['Option D']}
              option5={data['Option E']}
              option6={data['Option F']}
              option7={data['Option G']}
              option8={data['Option H']}
              subTopic={data.subtopic}
              qtype={data.questiontype}
              atype={data.answertype}
              level={data.level}
              subject={data["subject"]}
              answer={answers[index]}
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

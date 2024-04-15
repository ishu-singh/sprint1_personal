import React, { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import QuestionLayout from "./QuestionLayout";
import './Converter.css';
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";


const ExcelPage = () => {
  const [questionData, setQuestionData] = useState([]);
  const [previewData, setPreviewData] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileFormatError, setFileFormatError] = useState(false);
  const [isUploadEnabled, setIsUploadEnabled] = useState(false); // State variable to control upload button
  
  const navigate = useNavigate();
  const location = useLocation();

  // Handle file change event
  const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Check file extension
      if (!file.name.endsWith(".csv") && !file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
          setFileFormatError(true); // Set file format error state
      } else {
          setFileFormatError(false); // Reset file format error state
      }
  };

  // Handle preview event and navigate to preview page
  const handlePreview = () => {
    if (!selectedFile) {
        console.error("No file selected");
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        const binaryString = event.target.result;

        if (selectedFile.name.endsWith(".csv")) {
            Papa.parse(binaryString, {
                complete: (result) => {
                    const csvData = result.data;

                    // Add logging to check the parsed CSV data
                    console.log("Parsed CSV data:", csvData);

                    // Validate the CSV data
                    if (csvData && Array.isArray(csvData)) {
                        const isValidData = csvData.every(data => {
                            return (
                                data.title &&
                                data.options__001 &&
                                data.answers__001
                            );
                        });

                        if (isValidData) {
                            setQuestionData(csvData);
                            navigate("/qlayout", {
                                state: { questionData: csvData }
                            });
                        } else {
                            console.error("Invalid CSV data format.");
                        }
                    } else {
                        console.error("CSV data is not an array.");
                    }
                },
                header: true,
            });
        } else if (selectedFile.name.endsWith(".xls") || selectedFile.name.endsWith(".xlsx")) {
            const workbook = XLSX.read(binaryString, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(sheet, { header: 0 });

            // Add logging to check the parsed Excel data
            console.log("Parsed Excel data:", excelData);

            // Validate the Excel data
            if (excelData && Array.isArray(excelData)) {
                const isValidData = excelData.every(data => {
                    return (
                        data.title &&
                        data.options__001 &&
                        data.answers__001
                    );
                });

                if (isValidData) {
                    setQuestionData(excelData);
                    navigate("/qlayout", {
                        state: { questionData: excelData }
                    });
                } else {
                    console.error("Invalid Excel data format.");
                }
            } else {
                console.error("Excel data is not an array.");
            }
        } else {
            console.error("Unsupported file format.");
        }
    };

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
  const handleOkClick = () => {
      navigate("/");
      setIsUploadEnabled(true); // Enable upload button after navigating back to home
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
                      <button disabled={!isUploadEnabled}> Upload</button>
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
                  <button onClick={handleOkClick}>Ok</button>
                  <button onClick={handleCancelClick}>Cancel</button>
              </div>
          )}
      </div>
  );
};

export default ExcelPage;
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const ExcelPage = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const binaryString = event.target.result;
      
      // Check file extension
      if (file.name.endsWith('.csv')) {
        // Parse CSV
        Papa.parse(binaryString, {
          complete: (result) => {
            const csvData = result.data;
            const jsonFormattedData = csvconvertToJSON(csvData);
            console.log('csv',jsonFormattedData)
            setJsonData(jsonFormattedData);
          },
          header: true // Treat first row as header
        });
        
      } else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
        // Parse Excel
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const jsonFormattedData = excelconvertToJSON(excelData);
        setJsonData(jsonFormattedData);
      } else {
        console.error('Unsupported file format');
      }
    };
    reader.readAsBinaryString(file);
  };

  const excelconvertToJSON = (data) => {
    const headers = data[0];
    const jsonData = data.slice(1).map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    return jsonData;
  };


  const csvconvertToJSON = (data) => {
    const jsonData = data.map((row) => {
      const obj = {};
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          obj[key] = row[key];
        }
      }
      return obj;
    });
    return jsonData;
  };

  return (
    <div>
      <h1>File Reader</h1>
      <input type="file" onChange={handleFileChange} />
      {jsonData && (
        <div>
          <h2>JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExcelPage;

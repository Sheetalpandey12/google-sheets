// src/components/GoogleSheetViewer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleSheet = () => {
  const [data, setData] = useState([]);
  const apiKey = 'AIzaSyB0nq7drUnhp0LRP2CE81vVlV9vhZE0E0I'; // Replace with your actual API key
  const spreadsheetId = '1z7ZwUV8Oo2u7KIt-8XiEOpEeJGBxofZgYFo1jRfxJYg';
  const range = 'Sheet1!A1:Z100'; // Adjust range as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets/data/rowData/values(userEnteredValue,userEnteredFormat)&key=${apiKey}`
        );

        const sheetData = response.data.sheets[0].data[0].rowData.map((row) => 
          row.values.map((cell) => ({
            value: cell.userEnteredValue ? cell.userEnteredValue.stringValue || cell.userEnteredValue.numberValue : '',
            color: cell.userEnteredFormat?.backgroundColor || { red: 1, green: 1, blue: 1 } // default white
          }))
        );
        setData(sheetData);
      } catch (error) {
        console.error('Error fetching Google Sheet data:', error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 10000); // Poll every 10 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Helper function to convert color object to CSS rgba string
  const getColorStyle = (color) => {
    const { red, green, blue, alpha } = color;
    return `rgba(${Math.floor((red || 0) * 255)}, ${Math.floor((green || 0) * 255)}, ${Math.floor((blue || 0) * 255)}, ${alpha || 1})`;
  };

  return (
    <table border="1">
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={{ backgroundColor: getColorStyle(cell.color) }}
              >
                {cell.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GoogleSheet;

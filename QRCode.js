const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Define the path to the PDF file
const pdfPath = path.join(__dirname, 'OperateSync_Brochure (19).pdf');

// Define a route to serve the PDF file
app.get('/', (req, res) => {
    // Send the PDF file as a response
    res.sendFile(pdfPath);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

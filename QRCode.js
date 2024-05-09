const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// GitHub repository information
const owner = 'ArPh071201'; // Replace with your GitHub username
const repo = 'QRCode'; // Replace with your GitHub repository name
const filePath = 'OperateSync_Brochure.pdf'; // Path to the PDF file in the repository

// GitHub raw content URL
const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
console.log("rawUrl: "+rawUrl)

// Function to fetch the PDF file from GitHub
const fetchPDF = async () => {
    try {
        const response = await axios.get(rawUrl, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch PDF file: ${error.message}`);
    }
};

// Route to serve the HTML page with embedded PDF
app.get('/', async (req, res) => {
    try {
        const pdfData = await fetchPDF();
        // Create a temporary HTML file with embedded PDF content
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>PDF Viewer</title>
            </head>
            <body>
                <embed src="data:application/pdf;base64,${pdfData.toString('base64')}" type="application/pdf" width="100%" height="100%">
            </body>
            </html>
        `;
        // Send the HTML content as a response
        res.send(htmlContent);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

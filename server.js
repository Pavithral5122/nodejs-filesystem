const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// API endpoint to write a file
app.post('/writefile', (req, res) => {
    console.log("req", req.body);
    const { fileName, content } = req.body;
    try {
        let filePathToUpload = path.join(__dirname,'uploads');
        console.log("filepath", filePathToUpload);
        fs.writeFile(filePathToUpload+"/"+fileName, JSON.stringify(content), (err) => err && console.error(err));
        res.send('File has been written successfully!');
    } catch (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Internal Server Error');
    }
});


// Retrieve file endpoint

app.get('/getAllFiles', async (req, res) => {

    try {
        const directoryPath = path.join(__dirname,'uploads');
        // Read the files in the directory
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }
            res.send(files);
        });
    } catch (err) {
        console.error('Error retriving files:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

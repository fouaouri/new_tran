const express = require('express');
const path = require('path');
const app = express();

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'Front-Files')));

// Serve the main index.html file on the root route
console.log(path.join(__dirname, 'Front-Files', 'HTML', 'front.html'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Front-Files', 'HTML', 'front.html'));
  });
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Front-Files', 'HTML', 'front.html'));
// });

// Set the port for the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
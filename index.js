const { exec } = require('child_process');
require('dotenv').config()
const express = require("express");


const app = express();
console.log(process.env.POST_PATH);
app.post(process.env.POST_PATH, function(request, response){
    exec(process.env.RUN, (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error) {
            console.log(`exec error: ${error}`);
        }
    });
    response.send();
});

app.listen(process.env.PORT);
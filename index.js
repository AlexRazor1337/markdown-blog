const fs = require('fs');
const convertFile = require('./src/convertFile');
const generateBlog = require('./src/generateBlog');


const path = process.argv[2];
if (fs.existsSync(path)) {
    if (fs.lstatSync(path).isDirectory()) {
        process.chdir(path)
        generateBlog('blog')
    } else {
        convertFile(path);
    }
} else {
    console.log("Error: no such file or directory")
}

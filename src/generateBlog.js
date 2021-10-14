const fs = require('fs');
const path_ = require('path');
const convertFile = require('./convertFile');


const generateBlog = async (path) => {
    let list = []
    fs.readdirSync(path).forEach(file => {
        if (file.includes('.md')) {
            const filePath = path + path_.sep + file;
            const data = fs.readFileSync(filePath);

            const birthtime = new Date(data.toString().split('\n', 3).slice(-1)[0].split('-').reverse().join('-').replaceAll('**', ''))
            const title = data.toString().split('\n', 1)[0].replace('# ', '') + ` (${birthtime.toDateString()})`

            convertFile(filePath);
            list.push({path: filePath.replace('.md', '.html'), title, birthtime})
        }
    });

    list = list.sort((a, b) => b.birthtime - a.birthtime)

    let html = '';
    list.forEach(file => {
        html += `<li><a href="${file.path}">${file.title}</a></li>\n`
    });

    const template = fs.existsSync('list_template.html') ? fs.readFileSync('list_template.html').toString() : '<!DOCTYPE html><html lang="en"><body>[CONTENT GOES HERE]</body></html>';
    fs.writeFile('index.html', template.replace('[CONTENT GOES HERE]', html), { flag: 'w+' }, err => {})
}

module.exports = generateBlog;
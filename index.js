const showdown = require('showdown');
showdown.setOption('strikethrough', true);
const fs = require('fs')
const showdownHighlight = require('showdown-highlight');

const classMap = {
    h1: 'header'
}


const bindings = Object.keys(classMap).map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`
}));


const appendString = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css">
`


const convertFile = async (filename) => {
    await fs.readFile(filename, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const converter = new showdown.Converter({
            extensions: [...bindings, showdownHighlight({ pre: true })]
        });
        const html = converter.makeHtml(data.toString());
        fs.writeFile(filename.replace('.md', '') + '.html', appendString + html, { flag: 'w+' }, err => {})
    });
}

const args = process.argv;
convertFile(args[2])
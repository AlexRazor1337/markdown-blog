const showdown = require('showdown');
const fs = require('fs')

const convertFile = async (filename) => {
    await fs.readFile(filename, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const converter = new showdown.Converter(),
        const html = converter.makeHtml(data);
        fs.writeFile(filename.replace('.md', '') + '.html', html, { flag: 'w+' }, err => {})
    });
}


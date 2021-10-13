const showdown = require('showdown');
const fs = require('fs')

const convertFile = async (filename) => {
    await fs.readFile(filename, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const converter = new showdown.Converter({strikethrough: true});
        const html = converter.makeHtml(data.toString());
        fs.writeFile(filename.replace('.md', '') + '.html', html, { flag: 'w+' }, err => {})
    });
}

const args = process.argv;
convertFile(args[2])
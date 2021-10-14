const showdown = require('showdown');
showdown.setOption('strikethrough', true);

const showdownHighlight = require('showdown-highlight');
const fs = require('fs')

const convertFile = async (filename) => {
    const classMap = fs.existsSync('classmap.json') ? JSON.parse(fs.readFileSync('classmap.json').toString()) : new Object();

    const bindings = Object.keys(classMap).map(key => ({
        type: 'output',
        regex: new RegExp(`<${key}\s*`, 'g'),
        replace: `<${key} class="${classMap[key]}" $1`
    }));

    await fs.readFile(filename, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const converter = new showdown.Converter({
            extensions: [...bindings, showdownHighlight({ pre: true })]
        });

        const html = converter.makeHtml(data.toString());
        const template = fs.existsSync('template.html') ? fs.readFileSync('template.html').toString() : '<!DOCTYPE html><html lang="en"><body>[CONTENT GOES HERE]</body></html>';
        fs.writeFile(filename.replace('.md', '') + '.html', template.replace('[CONTENT GOES HERE]', html), { flag: 'w+' }, err => {})
    });
}

module.exports = convertFile;
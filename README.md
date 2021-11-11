## What is it?
I've created this node script to build a blog. It's used to convert **.md** files to **.html** and build articles list as a main page.

I don't see any actual reason to use it for anyone except me but whatever.

## Usage

To convert single file you can run:  
```
npm run build file.md
```

or

```
node index.js file.md
```

To convert whole folder:  
```
npm run build folder
```

When processing a folder, it **must** have **blog** subfolder with all **.md** files. Script will generate **index.html** in the root folder.

*Personally, I have all CSS and other additional files in the root folder and after converting it, just move it to my nginx site folder.*

This script is able to use templates. Template file is any viable html file which contains line **[CONTENT GOES HERE]**. This line will be replaced with content of the article.  
Basic template file:  
```html
<!DOCTYPE html>
<html lang="en">
    <body>
        [CONTENT GOES HERE]
    </body>
</html>
```

File should be named **template.html** and it must be placed in the working dir of the script or in the folder which is being converted. When converting a folder you can also use template for file with articles list. It should be called **list_template.html**.

Script also supports default classes for elements. For example we want images to have default CSS class "image".  
For this **classmap.json** file is used. It must be placed in the working dir of the script or in the folder which is being converted.  
Basic classmap file:  
```json
{
    "img": "image",
    "a": "link"
}
```

## Document format

For this script to run files should be written according to few rules:  
1. First line is an article title, should be marked with single hash symbol. Example: # Title  
2. Third line is the date in the format dd-mm-yyyy.

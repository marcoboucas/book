/* eslint-disable no-console */
const fs = require('fs');
const { promisify } = require('util');

const exec = promisify(require('child_process').exec);

const splitLines = (text) => {
  const data = {};
  text.split('\n').forEach((line) => {
    const re = /\w+:/gi;
    const match = re.exec(line);
    if (match) {
      const key = match[0].slice(0, -1);
      let value = line.slice(key.length + 1).trim();
      try {
        value = JSON.parse(value);
      // eslint-disable-next-line no-empty
      } catch (e) {}
      data[key] = value;
    }
  });
  return data;
};

const generateContentElement = (paragraphType, paragraphContent) => {
  if (paragraphType === 'text') {
    const styleRegex = /=style/gi;
    const style = styleRegex.exec(paragraphContent);
    const additionalData = {};
    if (style) {
      const styleString = paragraphContent.slice(style.index + style[0].length, -2);
      additionalData.style = splitLines(styleString);
      // eslint-disable-next-line no-param-reassign
      paragraphContent = paragraphContent.slice(0, style.index);
    }
    return {
      type: 'text',
      content: paragraphContent.trim().replace(/\n/g, '<br/>'),
      ...additionalData,
    };
  } if (paragraphType === 'separator') {
    return {
      type: 'separator',
    };
  }
  if (paragraphType === 'image') {
    return {
      type: 'image',
      width: '100%',
      ...splitLines(paragraphContent),
    };
  }

  console.error('Unknown paragraph type:', paragraphType);
};

const convertChapterData = (chapterFilePath) => {
  fs.readFile(chapterFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const [infos, content] = data.split('==content');

    const chapterData = splitLines(infos);

    // add the content of the chapters
    const re = /==(\w+)\n/gi;
    const matches = content.split(re).slice(1);
    if (matches.length % 2 !== 0) {
      throw new Error('Invalid number of paragraphs in the content');
    }
    chapterData.content = [];
    for (let i = 0; i < matches.length; i += 2) {
      const paragraphType = matches[i];
      const paragraphContent = matches[i + 1];
      const result = generateContentElement(paragraphType, paragraphContent);
      if (result) {
        chapterData.content.push(result);
      }
    }

    // save to json file
    const newPath = `./public/data/chapters/${chapterFilePath.split('/').pop().replace('txt', 'json').replace('chapter', '')}`;
    fs.writeFile(newPath, JSON.stringify(chapterData, null, 4), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Chapter ${chapterData.id + 1}: '${chapterData.title}' converted`);
    });
  });
};

// List all files in a directory
const chapterFiles = fs.readdirSync('./public/data/rawChapters');

chapterFiles.forEach((chapterFile) => {
  if (chapterFile.endsWith('.txt')) {
    console.info(`Watching ${chapterFile}`);
    // watch file modifications
    fs.watchFile(`./public/data/rawChapters/${chapterFile}`, () => {
      convertChapterData(`./public/data/rawChapters/${chapterFile}`);
    });
  }
});

const fs = require('fs');
const path = require('path');

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
      console.log(`Chapter ${chapterData.id}: ${chapterData.title} converted`);
    });
  });
};

fs.readdir('./public/data/rawChapters', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    if (file.endsWith('.txt')) {
      convertChapterData(`./public/data/rawChapters/${file}`);
    }
  });
});

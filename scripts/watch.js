/* eslint-disable no-console */
const fs = require('fs');
const yaml = require('js-yaml');

const convertChapterData = (chapterFilePath) => {
  fs.readFile(chapterFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const chapterData = {};

    // Find the 2 sections in the file
    const sections = data.split('------');
    if (sections.length !== 2) {
      console.error('File does not have 3 sections');
      return;
    }

    // Parse the information section
    const infos = sections[0];
    const infosObj = yaml.load(infos);
    chapterData.infos = infosObj;

    // Content section
    const content = sections[1];
    chapterData.content = content.trim().replace(/\r?\n/g, '<br/>');

    // // save to json file
    const newPath = `./public/data/chapters/${chapterFilePath.split('/').pop().replace('txt', 'json').replace('chapter', '')}`;
    fs.writeFile(newPath, JSON.stringify(chapterData, null, 4), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Chapter ${chapterData.infos.id}: '${chapterData.infos.title}' converted`);
    });
  });
};
// List all files in a directory
const chapterFiles = fs.readdirSync('./data/rawChapters');

chapterFiles.forEach((chapterFile) => {
  if (chapterFile.endsWith('.txt')) {
    const fileName = `./data/rawChapters/${chapterFile}`;
    console.info(`Watching ${chapterFile}`);
    // watch file modifications
    fs.watchFile(fileName, () => { convertChapterData(fileName); });
  }
});

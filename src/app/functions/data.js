/* eslint-disable no-console */
// Data functions

export const getBook = async () => {
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/data/book.json`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getChapter = async (chapterFilename) => {
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/data/chapters/${chapterFilename}`);
    const data = await res.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
};

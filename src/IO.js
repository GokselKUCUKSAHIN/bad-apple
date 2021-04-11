const fs = require('fs');

/**
 * @author Göksel KÜÇÜKŞAHİN
 * @Date 11/04/2021
 * @param path of file.
 * @return {string} data read from file.
 */
const readFile = (path) => {
  let data = ""; // null/not defined safe
  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (err) {
    console.error('An Error occurred!\n', err);
  }
  return data;
}

/**
 * @author Göksel KÜÇÜKŞAHİN
 * @Date 10/04/2021
 * @param path file path for saving.
 * @param pages target page data for writing on a file.
 */
const writeFile = (path, pages) => {
  const file = fs.createWriteStream(path);
  file.on('error', (err) => { /* error handling */
  });
  if (Array.isArray(pages))
    pages.forEach(page => file.write(page));
  else
    file.write(pages);
  file.end();
}

module.exports.writeFile = writeFile;
module.exports.readFile = readFile;
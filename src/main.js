const badapple = require('./bad-apple');
/**
 * Main Method.
 * @author Göksel KÜÇÜKŞAHİN
 * @Date 10/04/2021
 */
const badapple = require("./bad-apple");

(async () => {
  try {
    await badapple();
  } catch (exception) {
    console.log(exception);
  }
})();
const badapple = require('./bad-apple');
/**
 * Main Method.
 * @author Göksel KÜÇÜKŞAHİN
 * @Date 10/04/2021
 */
(async () => {
  try {
    await badapple();
  } catch (exception) {
    console.log(exception);
  }
})();
function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));
    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}
const getResults = async (...players) => {
  try {
    const results = await Promise.all(
      players.map(async (player) => await luckyDraw(player))
    );
    console.log(results);
  } catch (e) {
    console.log(e);
  }
};

getResults('Sabino', 'Luigi', 'Laura');
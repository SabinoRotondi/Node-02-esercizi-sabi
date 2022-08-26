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
luckyDraw('Sabino')
    .then((data) => console.log(data))
    .then(() => luckyDraw('Laura'))
    .then((data) => console.log(data))
    .then(() => luckyDraw('Luigi'))
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
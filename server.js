const {parseString} = require('xml2js');
const request = require('request');

var lottoResults;

request('https://national-lottery.co.uk/results/lotto/draw-history/xml', (err, res, body) => {
    lottoResults = parseString(body, (err, result) => {
        lottoResults = result;
        showResults();
    });
});

function showResults() {

    const game = lottoResults['draw-results']['game'][0];
    const draw = game.draw[0];
    const balls = game.balls[0];

    console.log("LOTTO RESULTS FOR %s", draw['draw-date']);
  
    var ballsArray = []
    
    balls.ball.forEach(b => {
        ballsArray.push(b['_'])
    });
  
    balls['bonus-ball'].forEach(bb => {
        ballsArray.push(bb['_'] + "(BB)")
    });
  
    console.log(ballsArray.join(", "));
}

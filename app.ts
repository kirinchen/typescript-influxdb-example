

console.log('Hello world');





var readline = require('readline');
let cs = readline.createInterface(process.stdin, process.stdout);
cs.setPrompt('guess> ');
cs.prompt();
cs.on('line', function (line) {
    if (line === "right") this.close();
    this.rl.prompt();
}).on('close', function () {
    process.exit(0);
});
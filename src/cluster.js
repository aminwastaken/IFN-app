const cluster = require('cluster');
const numberCPUs = require('os').cpus().length;
require('./dataProvider');

if (cluster.isMaster) {

  for (let i = 0; i < numberCPUs; i++) {

    cluster.fork();
  }

  cluster.on('exit', (work, code, signal) => {

    console.log(`Le travaille ${work.process.pid} mort avec le code ${code} et le signal ${signal}`);

  });

} else {
  require('./index');
}

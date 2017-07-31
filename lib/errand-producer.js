var kue = require('kue');
var queue = kue.createQueue();
var async = require('async');
var program = require('commander');
var jsonfile = require('jsonfile');

program
  .option('-j --job [value]', 'json file describing list of tasks')
  .option('-d --dir [value]', 'location of command')
  .parse(process.argv);

var job = jsonfile.readFileSync(program.job);

function graceful() {
  process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

function addContext(obj) {
  obj.context = { "dirname" : program.dir };
  return obj;
}

if (job.queue.execution == 'synchronous') {

  async.eachSeries(job.tasks, function(task, callback) {

    var job = queue.create(task.task, addContext(task.data)).on('complete', function() {
     callback();
    }).save();

  }, function(err) {
    if(err) {
      console.log("There was an error" + err);
    }
    graceful();
  });

}

if (job.queue.execution == 'asynchronous') {

  async.each(job.tasks, function(task, callback) {

    var job = queue.create(task.task, addContext(task.data)).on('complete', function() {
     callback();
    }).save();

  }, function(err) {
    if(err) {
      console.log("There was an error" + err);
    }
    graceful();
  });

}
var kue = require('kue');
var queue = kue.createQueue();
var async = require('async');
var program = require('commander');
var jsonfile = require('jsonfile');
var _ = require('underscore');

program
  .option('-j --job [value]', 'json file describing list of tasks')
  .option('-d --dir [value]', 'location of command')
  .option('-s --map [value]', 'json file describing list of objects for mapping task list to')
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

switch (typeof program.map) {

  case 'undefined':

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

    break;

  default:

    var map = jsonfile.readFileSync(program.map);

    async.eachSeries(map, function(item, callback_item) {

      var _job = job;

      console.log('*** ',item,' ',item.key);

      _.each(_.keys(item), function( key ) {
        console.log(key,' ',item[key]);
        var re = new RegExp(key,"g");
        _job=JSON.parse(JSON.stringify(_job).replace(re,item[key]));
      });

      console.log(_job);

      if (_job.queue.execution == 'synchronous') {

        async.eachSeries(_job.tasks, function(task, callback_task) {

          var job = queue.create(task.task, addContext(task.data)).on('complete', function() {
           callback_task();
          }).save();

        }, function(err) {
          if(err) {
            console.log("There was an error" + err);
          }
          callback_item();
        });

      }

      if (_job.queue.execution == 'asynchronous') {

        async.each(_job.tasks, function(task, callback_task) {

          var job = queue.create(task.task, addContext(task.data)).on('complete', function() {
           callback_task();
          }).save();

        }, function(err) {
          if(err) {
            console.log("There was an error" + err);
          }
          callback_item();
        });

      }

    }, function(err) {
      if(err) {
        console.log("There was an error" + err);
      }
      graceful();
    });

  
}  


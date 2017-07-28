# errand
> errand task automation producer

Errand provides task automation. Errand uses a list of tasks to complete jobs. Work is performed by [errand components](https://www.npmjs.com/search?q=keywords:errand&page=1&ranking=optimal). The [task list](https://github.com/errandjs/errand#example-task-list) is used to configure errand components.

## Usage

```

npm install

node ./node_modules/errand/lib/errand-producer.js --job .\errand-sample-job.json

```
Notes:

1. Prior to running `errand-producer.js` required components must be running. Refer to [errand-example](https://github.com/errandjs/errand-example) for suggested strategy for how to deploy errand worker components using [pm2](http://pm2.keymetrics.io/).
2. `--job` contains tasks list


## Dependencies

[redis](http://redis.io/)


## Example Task List

```

{
	"queue": {
		"execution":"replace-with-queue-task-execution-mode"
	},
	"tasks": [

		{
			"task": "replace-with-task-name",
			"data": {
				"description": "replace-with-task-description",
				"request": { ... }
			}
		}

	]
}

```

Notes:

* **queue** - queue options
* **queue.execution** - required queue task execution mode, either `synchronous` where each task is processed sequentially or `asynchronous` where each task does not wait for previously submitted task(s)
* **tasks** - required task list
* **tasks[].task** - required task name
* **tasks[].data.description** - optional task description
* **tasks[].data.request** - required task payload

## Links

* [Roadmap](https://trello.com/b/GHzcBJvL/roadmap)
* [Issues, suggestions and recommendations](https://github.com/errandjs/errand/issues)
* [@errandjs](https://twitter.com/errandjs)

## How to contribute

The objective of [errand](https://github.com/errandjs/errand) is to create a useful set of components that can be used for digital marketing automation. Feel free to provide feedback and request new features in [issues](https://github.com/errandjs/errand-logger/issues). 

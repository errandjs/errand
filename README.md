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
2. `--job` contains tasks list.
3. `--dir` contains file location of resources, setting required for components with file resources for example file location of email template files used by errand-message, directory location is passed without trailing slash.
4. `--map` contains json file describing list of objects for mapping task list to.


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

## Example using mapping

The following section describes how to use the map option.

### Result of mapping example

```

hello a this is 1
hello b this is 2

```

### Exmaple of task list with mapping placeholders

```

{
  "queue": {
    "execution":"synchronous"
  },

  "tasks": [

    {
      "task": "errand-logger",
      "data": {
        "description": "message to user",
        "request": {
          "message": "hello {{_id}} this is {{me}}"
        }
      }
    }

  ]
}


```

### Example of the json mapping object used to create [mapping exmple](#result-of-mapping-example)

```

[
  {
    "{{_id}}": "a",
    "{{me}}": "1"
  },
  {
    "{{_id}}": "b",
    "{{me}}": "2"
  }
]


```

## Links

* [Roadmap](https://trello.com/b/GHzcBJvL/roadmap)
* [Issues, suggestions and recommendations](https://github.com/errandjs/errand/issues)
* [@errandjs](https://twitter.com/errandjs)

## How to contribute

The objective of [errand](https://github.com/errandjs/errand) is to create a useful set of components that can be used for digital marketing automation. Feel free to provide feedback and request new features in [issues](https://github.com/errandjs/errand-logger/issues). 

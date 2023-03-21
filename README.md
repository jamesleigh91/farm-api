# Farm API

This is a technical test to evaluate your integration and web development knowledge. We will accept submissions in any of NodeJS (TypeScript or JavaScript), PHP, Java and Python.

Please avoid using a full web application framework such as NestJS or Laravel as they do a lot of the decision making for you and we want to see what decisions and choices you make. You are free however, to use smaller packages to speed up development process.

## Task

* Implement a simple RESTful API that:
  * Makes available the data in [this file](/data.json)
  * Provides ability to add/edit/delete data
  * Provides ability to paginate response (default 30 items per page)
  * Provides ability to query data sets on their field values and linked field values (e.g. `farmer_id` in applications)

### Extra / Bonus Points

* If you have extra time feel free to add extra features you think would be appropriate, e.g:
  * Authentication
  * Rate Limiting

### Note

* Must demonstrate good development practices.
* We will be looking at your git history to understand your process, so please make it clear with appropriate commit messages.

## Info

The above task should be clear and manageable to be completed within ~2 hours timeframe for the experienced developer. If you have any questions feel free to ask as soon as possible as this is a time-critical task.
 
We aren't providing a skeleton project for this.

We will be evaluating this as evidence of your ability to develop quality code, so please keep that in mind and consider test coverage and good principles. **Better to do a smaller deliverable of excellent quality than to provide more features but in a slap-dash fashion.**


## Build versions

- node v16.16.0
- npm 8.11.0
- typescript (see package.json)

## Running locally

There are two ways of running locally **docker** and simply via **node** on the local machine. Both mechanisms need to run 

```
npm install
```

#### Node on local machine

```
npm run build
```

This does the traspile job and creates the dist folder

```
npm run local
```

starts the server on port 8080

#### Docker

Note: Needs docker daemon running on local machine
```
./docker-build-run.sh
```

Build the docker container and runs on 8080 (this will not work if trying to run on local at the same time due to conflicting ports)

## Testing (manual)

A Postman collection is located at the root of the project and can be imported into postman, if using docker and changing the port these url's will need to be updated accordingly.

## Testing (unit)

Using jest for all unit tests, to run:

```
npm run test
```

This will create a coverage directory on the root level which has been git ignored.

## Structure

The application has been built using hexagonal architecture, so the different domains posses different data structures, domains here:

- rest
- storage

So the object being served via the api will be mapped to a more api friendly response. This is separeted as in the future it makes life really easy to switch from one interface to another as the services:

- application
- farmers

control the domain logic.

So moving the datastore out of json in memory to something more remote becomes a simple change and the api level does not need any update.
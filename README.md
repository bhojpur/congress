# Bhojpur Congress - Deliberation System

The Bhojpur Congress is a software-as-a-service product used as a `Deliberation Engine` based on [Bhojpur.NET Platform](https://github.com/bhojpur/platform) for application delivery.

## Running your Bhojpur IAM instance

Firstly, you need to start the MySQL database server `bhojpur` database exists in the MySQL server so that [Bhojpur IAM](https://github.com/bhojpur/iam) can connect to it.

Next, you need to start the [Bhojpur IAM](https://github.com/bhojpur/iam) web services `backend` API server running on top of the [Bhojpur Web](https://github.com/bhojpur/web) server engine. It provides `authentication` and `authorization` business logic to the [Bhojpur Congress](https://github.com/bhojpur/congress) backend. A sample of configuration settings is stored in the `conf/app.conf` file. Please note that it points to `http://localhost:8000` (for example only). In case, you see the following error, it means your MySQL database in not accessible for some reasons.

- **Error 1049: Unknown database 'dbname'Running syncUsers()..**

Next, the [Bhojpur IAM](https://github.com/bhojpur/iam) `frontend` web application (written in `React`, `Node.js`) is required to enable the `Single Sign-On` (SSO) capabilities in your [Bhojpur Congress](https://github.com/bhojpur/congress) application. Please note that `frontend` web application is available on `http://localhost:7001` (for example only). You launch it using `yarn run start` from the `pkg/webui` folder.

Both of these applications could be hosted eiher locally (in development mode using separate Terminal windows) or deployed on a private- / public- Cloud (in production mode).

## Configuring your Web Application in the Bhojpur IAM

The [Bhojpur Congress](https://github.com/bhojpur/congress) application must be registered in the [Bhojpur IAM](https://github.com/bhojpur/iam) so that proper `authentication` and `authorization` can work properly. The registration process offers certain configuration settings put in the `conf/app.conf` file. Typically, the System Administrator would do it for you.

For example, in the [Bhojpur IAM](https://github.com/bhojpur/iam) administrative user interface

- If you are new tenant, a new `organization`, `role`, `user` must be created 
- An `app-congress` application is registered from `Applications` menu
- Required permissions must be granted to the new `user`
- Callback URL points to `http://localhost:3000/callback`

## Running your Web Application

Firstly, ensure that your MySQL database server is running and `congress` database exists in the MySQL server so that [Bhojpur Congress](https://github.com/bhojpur/congress) can connect to it.

Next, you need to start the [Bhojpur Congress](https://github.com/bhojpur/congress) web services `backend` API server running on top of the [Bhojpur Web](https://github.com/bhojpur/web) server engine. Check the `bhojpurEndpoint` settings in the `conf/app.conf` file. It points to the [Bhojpur IAM](https://github.com/bhojpur/iam) backend web services API server. Please note that `backend` web service is available on `http://localhost:12000` (for example only).

 Next, the [Bhojpur Congress](https://github.com/bhojpur/congress) `frontend` web application (written in `React`, `Node.js`) must be started. Please note that `frontend` web application is available on `http://localhost:3000` (for example only). You launch it using `yarn run start` from the `pkg/webui` folder.
 
 You can run it either locally (in development mode using separate Terminal windows) or on a private- / public- Cloud (in production mode).

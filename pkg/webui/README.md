# Bhojpur Congress - Web User Interface

This is a web application frontend for a deliberation management system used by distributed enterprises. It was bootstrapped with the [Create React App](https://github.com/facebook/create-react-app).

## Pre-requisites

The [Bhojpur Congress](https://github.com/bhojpur/congress) requires a running relational database (e.g., MySQL server) to be operational. In this example, I have using a community edition of `MySQL` database server to be utilized by the Bhojpur IAM. You must create a database (e.g., `congress`) first.

```bash
$ mysql -u root -p
mysql> CREATE DATABASE congress;
Query OK, 1 row affected (0.04 sec)

mysql> quit
Bye

```

then, you need to modify the [Bhojpur Congress](https://github.com/bhojpur/congress) configuration to point to your relational database instance. Now, you should edit the `conf/app.conf` file, modify `dataSourceName` to correct relational database info, which follows this format:

```bash
username:password@tcp(database_ip:database_port)/
```

Also, you need to run an instance of [Bhojpur IAM](https://github.com/bhojpur/iam) server for the purpose of user authentication and application-level authorization.

### `yarn run start`

Runs the web application in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the web browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the web application app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

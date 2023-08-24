##  Installation

``` bash
# clone the repo
$ git clone https://github.com/balanka/iws-ui.git my-project

# go into app's directory
$ cd my-project

# install app's dependencies
$ yarn install
```

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

see also:
[User Guide](CRA.md)

### Basic usage

``` bash
# dev server  with hot reload at http://localhost:3000
$ yarn start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ yarn run build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
CoreUI-React#v2.0.0
├── public/          #static files
│   ├── assets/      #assets
│   └── index.html   #html template
│
├── src/             #project root
│   ├── containers/  #container source
│   ├── scss/        #user scss/css source
│   ├── views/       #views source
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   └── routes.js    #routes config
│
└── package.json
```
Prepare Docker posgres Install
```
mkdir -p $HOME/docker/volumes/postgres
sudo mkdir -p /var/lib/postgresql/data
## psql -h localhost -U postgres -W yourPostgresPWD -d iws2
```
## Documentation



## Contributing

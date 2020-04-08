# front-end

This is a Vue-based front-end for the shelter-caller system. It allows administrators to view counts and edit shelter information. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
This will run the vue development server. It will expect to to find the local API from bed count back-end running. 
The API URI for development is set in `.env.development`

### Compiles and minifies for production
```
npm run build
```
This will build the Vue app and put the build artifacts in the folder indicated in `vue.config.js`. The default is to look for the sibling folder `"../bedcount_backend/static/frontend/"` which will allow the API code to serve them from App Engine. Once a new build is made of the front-end app the back end app will need to be redeployed in order to serve it.

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```


module.exports ={
    "js":{
      "@babel/core": "^7.16.0",
      "@babel/plugin-transform-runtime": "^7.16.5",
      "@babel/preset-env": "^7.16.5",
      "babel-loader": "^8.2.3",
      "copy-webpack-plugin": "^10.2.4",
      "css-loader": "^6.5.0",
      "html-loader": "^3.0.0",
      "html-webpack-plugin": "^5.5.0",
      "mini-css-extract-plugin": "^2.4.5",
      "style-loader": "^3.3.1",
      "webpack": "^5.60.0",
      "webpack-cli": "^4.9.1",
      "webpack-dev-server": "^4.3.1",
      "webpack-merge": "^5.8.0"
    } ,
    "ts":{
      "@babel/core": "^7.16.0",
      "@babel/plugin-transform-runtime": "^7.16.5",
      "@babel/polyfill": "^7.12.1",
      "@babel/preset-env": "^7.16.5",
      "@babel/preset-typescript": "^7.16.5",
      "babel-loader": "^8.2.3",
      "copy-webpack-plugin": "^10.2.4",
      "css-loader": "^6.5.0",
      "html-loader": "^3.0.0",
      "html-webpack-plugin": "^5.5.0",
      "mini-css-extract-plugin": "^2.4.5",
      "style-loader": "^3.3.1",
      "typescript": "^4.5.4",
      "webpack": "^5.60.0",
      "webpack-cli": "^4.9.1",
      "webpack-dev-server": "^4.3.1",
      "webpack-merge": "^5.8.0"
    },
      "dependencies": {
        "@babel/runtime": "^7.16.5",
        "@babel/runtime-corejs3": "^7.16.5",
        "core-js": "^3.19.3",
        "cross-env": "^7.0.3",
        "nodom3": "^0.1.8"
      },
      "scripts": {
        "build": "npx webpack --config ./config/webpack.prod.js",
        "serve": " npx webpack serve --config ./config/webpack.dev.js"
      },
}
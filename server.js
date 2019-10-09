const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 9000;

app.use(express.static(publicPath));
app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(port, () => {
  console.log('**********************************');
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
  console.log(`http://127.0.0.1:${port}`);
  console.log(`http://0.0.0.0:${port}`);
  console.log('**********************************\n\n');
});

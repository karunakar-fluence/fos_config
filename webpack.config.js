const generate = require('generate-file-webpack-plugin');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports  = (env) => {
  return {
    entry : "/index.js",
    optimization: {
        minimize: false,
    },

    plugins: [
       generate({
            file: env.client+'.config.js',
            content: () => {
                const configFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, './config/production/'+env.client+'.json')).toString());
                return template('./template/config-template.hbs')(configFile);
            }
        }),
    ]
  }
};



function template(file) {
    return handlebars.compile(fs.readFileSync(path.resolve(__dirname, file)).toString());
}
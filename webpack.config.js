const path = require('path');
const webpack = require('webpack');

const WatchExternalFilesPlugin = () => {
    WatchExternalFilesPlugin.prototype.apply = (compiler) => {
      compiler.plugin('after-compile', (compilation, callback) => {
        ['./templates', './config', './modules'].forEach(path => compilation.contextDependencies.add(path));
        callback();
      });
    };
  };

module.exports = (env, argv) => {
    const config = {
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            contentBase: './dist',
            historyApiFallback: {
                index: './uwu.html',
              },
            hot: true,
        },
        plugins: [new WatchExternalFilesPlugin()]
    };

    if (argv.mode === 'development') {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return config;
};

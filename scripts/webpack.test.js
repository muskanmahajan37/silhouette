var webpack = require('webpack');
var extend = require('./webpack.base');
var shell = require('shelljs');
var package = require('./../package.json');

////////////////////////////////////////////////////////////////////////
//====================================================================//
////////////////////////////////////////////////////////////////////////
//====================================================================//
////////////////////////////////////////////////////////////////////////

let config = extend({
    entry: './src/test.js',
    output: {
        path: __dirname + './../dist',
        filename: 'test.bundle.js',
        libraryTarget: 'umd',
    },
    externals: Object.keys(package.dependencies).reduce((a, d) => {
        // adds all runtime dependencies to the exclude list for testing
        // in a node environment for accurate code coverage reporting.
        a[d] = d;
        return a;
    }, { tap: 'tap' }),
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            comments: false,
        }),
    ]
});

////////////////////////////////////////////////////////////////////////
//====================================================================//
////////////////////////////////////////////////////////////////////////
//====================================================================//
////////////////////////////////////////////////////////////////////////

webpack(config, (err, stat) =>{
    console.log(err !== null ? err : '> running bundle...');
    try {
        shell.exec('npm run test-rig');
    } catch(err){
        console.error(err);
    }
});

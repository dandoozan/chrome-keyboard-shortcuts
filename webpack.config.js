const path = require('path');
const fs = require('fs');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');

const PATH_TO_SRC = path.join(__dirname, 'src');
const JS_DIR_NAME = 'js';
const CONTENT_SCRIPTS_DIR_NAME = 'contentScripts';

function generateEntriesForDir(pathToDir) {
    //get the files in the dir that end in ".js"
    return glob.sync(`${pathToDir}/*.js`).reduce((obj, filename) => {
        obj[path.parse(filename).name] = filename;
        return obj;
    }, {});
}

function generateOutputFileName(entryInfo) {
    //this creates the same structure that the entry files have
    const entryPath = entryInfo.chunk.entryModule.context;
    return path.join(
        entryPath.substring(PATH_TO_SRC.length),
        '[name].bundle.js'
    );
}

function getFilesToCopy() {
    //copy all files/dirs in "src" that are NOT "js"
    //todo: use glob for this
    return fs.readdirSync(PATH_TO_SRC).filter(file => file !== JS_DIR_NAME);
}

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        popup: './js/popup.js',
        // background: './src/js/background.js',
        contentScript: './js/contentScripts/contentScript.js',
        ...generateEntriesForDir(
            path.join(__dirname, 'src/js/contentScripts/pageSpecific')
        ),
    },
    output: {
        filename: generateOutputFileName,
        library: 'this_can_be_anything',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin(
            getFilesToCopy().map(fileOrDirName => ({
                from: fileOrDirName,
                to: fileOrDirName, //I have to specify "to" in order to get the same dir hierarchy structure when the contents are copied over to dist
                ignore: ['.DS_Store'],
            }))
        ),
        //output files as es6 modules (so that I can use es6 import in contentScript)
        new EsmWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                //css rule
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devtool: 'cheap-source-map',
    resolve: {
        //set "symlinks" to false so that webpack looks for dependencies in this project (not in the symlinked
        //file location).  This allows me to use dependencies (eg. lodash) in my "utils" file (which i symlink
        //here) and it will use the "lodash" from this project
        symlinks: false,
    },
};

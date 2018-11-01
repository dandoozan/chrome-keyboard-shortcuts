//todo: figure out how to move this file to CommonChromeExtensions so that I can
//use it in other projects

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const _ = require('lodash');
const u = require('../../CommonJavaScript');

const SRC_DIR_NAME = 'src';
const DIST_DIR_NAME = 'dist';
const JS_DIR_NAME = 'js';
const CONTENT_SCRIPT_DIR_NAME = 'contentScripts';

function generateContentScriptEntries() {
    //read in all the files in srcJs/contentScripts
    const filenames = u.getAllFileNamesInDir(path.join(__dirname, SRC_DIR_NAME, JS_DIR_NAME, CONTENT_SCRIPT_DIR_NAME));

    //filter bc i only need the js files
    const jsFilenames = filenames.filter((filename) => filename.endsWith('.js'));

    //reduce them to an obj with their name as the key and path as the value
    const entries = jsFilenames.reduce((accum, filename) => {
        const fileBaseName = u.stripFileExtension(filename);
        accum[fileBaseName] = path.join(__dirname, SRC_DIR_NAME, JS_DIR_NAME, CONTENT_SCRIPT_DIR_NAME, filename);
        return accum;
    }, {});

    //return that
    return entries;
}

function generateEntriesObject() {
    const baseEntriesObj = {
        popup: path.join(__dirname, SRC_DIR_NAME, JS_DIR_NAME, 'popup.js'),
        background: path.join(__dirname, SRC_DIR_NAME, JS_DIR_NAME, 'background/background.js'),
    };
    const contentScriptEntries = generateContentScriptEntries();
    return _.merge(baseEntriesObj, contentScriptEntries);
}

function generateOutputFileName(entryInfo) {
    //this creates the same structure that the entry files have
    const entryParentDirAbsolutPath = entryInfo.chunk.entryModule.context;
    const entryParentDirName = path.basename(entryParentDirAbsolutPath);

    //put the output file in a containing parent dir if the entry is in one (ie.
    //if the entry file's containing dir is anything other than "srcJs"))
    let outputParentDirName = '';
    if (entryParentDirName !== JS_DIR_NAME) {
        outputParentDirName = entryParentDirName;
    }
    return path.join(JS_DIR_NAME, outputParentDirName, '[name].bundle.js');
}

module.exports = {
    entry: generateEntriesObject,
    plugins: [
        new CleanWebpackPlugin([DIST_DIR_NAME]),
        new CopyWebpackPlugin([
            path.join(SRC_DIR_NAME, 'manifest.json'),
            {
                from: path.join(SRC_DIR_NAME, 'images'),
                to: 'images'
            },
            {
                from: path.join(SRC_DIR_NAME, 'css'),
                to: 'css'
            },
            path.join(SRC_DIR_NAME, 'popup.html'),
        ]),
    ],
    output: {
        filename: generateOutputFileName,
        path: path.join(__dirname, DIST_DIR_NAME),
    },
};
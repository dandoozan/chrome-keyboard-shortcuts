const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATH_TO_SRC = path.join(__dirname, 'src');
const JS_DIR_NAME = 'js';
const CONTENT_SCRIPTS_DIR_NAME = 'contentScripts';

const FILES_AND_DIRS_TO_COPY_TO_DIST = [
    'manifest.json',
    'popup.html',
    'images',
    'css',
];


function stripFileExtension(fileName) {
    return fileName.substring(0, fileName.lastIndexOf('.'));
}

function generateEntriesForContentScripts() {
    const pathToContentScriptsDir = path.join(
        PATH_TO_SRC,
        JS_DIR_NAME,
        CONTENT_SCRIPTS_DIR_NAME
    );

    //get the files in the contentScripts dir that
    //  -end in ".js"
    //  -do NOT start with "_"
    let filenames = fs
        .readdirSync(pathToContentScriptsDir)
        .filter(
            fileName => fileName.endsWith('.js') && !fileName.startsWith('_')
        );

    //now reduce them to an obj with their name as the key and path as the value
    return filenames.reduce((obj, filename) => {
        const fileBaseName = stripFileExtension(filename);
        obj[fileBaseName] = path.join(pathToContentScriptsDir, filename);
        return obj;
    }, {});
}

function generateOutputFileName(entryInfo) {
    //this creates the same structure that the entry files have
    const entryParentDirAbsolutePath = entryInfo.chunk.entryModule.context;
    const entryParentDirName = path.basename(entryParentDirAbsolutePath);

    //put the output file in a containing parent dir if the entry is in one (ie.
    //if the entry file's containing dir is anything other than "js"))
    let outputParentDirName = '';
    if (entryParentDirName !== JS_DIR_NAME) {
        outputParentDirName = entryParentDirName;
    }
    return path.join(JS_DIR_NAME, outputParentDirName, '[name].bundle.js');
}

module.exports = {
    entry: {
        main: path.join(PATH_TO_SRC, JS_DIR_NAME, 'main.js'),
        BrowserActions: path.join(PATH_TO_SRC, JS_DIR_NAME, 'BrowserActions.js'),
        ...generateEntriesForContentScripts(),
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin(
            FILES_AND_DIRS_TO_COPY_TO_DIST.map(fileOrDirName => ({
                from: path.join('src', fileOrDirName),
                to: fileOrDirName, //I have to specify "to" in order to get the same dir hierarchy structure when the contents are copied over to dist
                ignore: ['.DS_Store'],
            }))
        ),
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
    output: {
        filename: generateOutputFileName,
    },
    devtool: 'cheap-source-map',
    resolve: {
        //set "symlinks" to false so that webpack looks for dependencies in this project (not in the symlinked
        //file location).  This allows me to use dependencies (eg. lodash) in my "utils" file (which i symlink
        //here) and it will use the "lodash" from this project (so i don't have to install it in
        //the CommonChromeExtensions project)
        symlinks: false,
    },
};

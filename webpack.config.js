const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");

const PATH_TO_SRC = path.join(__dirname, 'src');
const JS_DIR_NAME = 'js';
const CONTENT_SCRIPTS_DIR_NAME = 'contentScripts';

function stripFileExtension(fileName) {
    return fileName.substring(0, fileName.lastIndexOf('.'));
}

function generateEntriesForDir(pathToDir) {
    //get the files in the dir that end in ".js"
    let filenames = fs
        .readdirSync(pathToDir)
        .filter(fileName => fileName.endsWith('.js'));

    //now reduce them to an obj with their name as the key and path as the value
    return filenames.reduce((obj, filename) => {
        const fileBaseName = stripFileExtension(filename);
        obj[fileBaseName] = path.join(pathToDir, filename);
        return obj;
    }, {});
}

function fileExists(pathToFile) {
    return fs.existsSync(pathToFile);
}

function generateEntries() {
    let entries = {};

    //add popup if it exists
    let pathToPopup = path.join(PATH_TO_SRC, JS_DIR_NAME, 'popup.js');
    if (fileExists(pathToPopup)) {
        entries.popup = pathToPopup;
    }

    //add background if it exists
    let pathToBackground = path.join(PATH_TO_SRC, JS_DIR_NAME, 'background.js');
    if (fileExists(pathToBackground)) {
        entries.background = pathToBackground;
    }

    //add content script files
    entries = {
        ...entries,
        ...generateEntriesForDir(
            path.join(PATH_TO_SRC, JS_DIR_NAME, CONTENT_SCRIPTS_DIR_NAME)
        ),
    };

    return entries;
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
    return fs.readdirSync(PATH_TO_SRC).filter(file => file !== JS_DIR_NAME);
}

module.exports = [
    {
        entry: generateEntriesForDir(
            path.join(PATH_TO_SRC, 'js', 'contentScripts', 'pageSpecific')
        ),
        output: {
            filename: generateOutputFileName,
            library: 'mylib',
            libraryTarget: 'var',
        },
        devtool: 'cheap-source-map',
        resolve: {
            //set "symlinks" to false so that webpack looks for dependencies in this project (not in the symlinked
            //file location).  This allows me to use dependencies (eg. lodash) in my "utils" file (which i symlink
            //here) and it will use the "lodash" from this project (so i don't have to install it in
            //the CommonChromeExtensions project)
            symlinks: false,
        },
        plugins: [
            new EsmWebpackPlugin()
        ]
    },
    {
        entry: generateEntries,
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new CopyWebpackPlugin(
                getFilesToCopy().map(fileOrDirName => ({
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
            //here) and it will use the "lodash" from this project
            symlinks: false,
        },
    },
];

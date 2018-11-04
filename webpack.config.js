const path = require('path');
const _ = require('lodash');
const w = require('../../CommonJavaScript').webpack;

const SRC_DIR_ABSOLUTE_PATH = path.join(__dirname, 'src');
const JS_DIR_ABSOLUTE_PATH = path.join(SRC_DIR_ABSOLUTE_PATH, 'js');
const CONTENT_SCRIPT_DIR_ABSOLUTE_PATH = path.join(JS_DIR_ABSOLUTE_PATH, 'contentScripts');
const FILES_AND_DIRS_TO_COPY_TO_DIST = ['manifest.json', 'popup.html', 'images', 'css'];

module.exports = {
    entry: _.merge({
        popup: path.join(JS_DIR_ABSOLUTE_PATH, 'popup.js'),
        background: path.join(JS_DIR_ABSOLUTE_PATH, 'background.js'),
    }, w.generateEntriesForAllFilesInDir(CONTENT_SCRIPT_DIR_ABSOLUTE_PATH, '_')),
    plugins: w.generateBasePlugins()
        .concat(w.generateCopyFilesPlugin(FILES_AND_DIRS_TO_COPY_TO_DIST)),
    module: {
        rules: [
            w.generateCssRule()
        ],
    },
    output: {
        filename: w.generateOutputFileName,
    },
}
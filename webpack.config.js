const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');

const PATH_TO_SRC = path.join(__dirname, 'src');

module.exports = {
    context: PATH_TO_SRC,
    entry: {
        // background: './src/js/background.js',
        popup: './js/popup/popup.js',
        _main: './js/contentScripts/_main.js',

        //generate entries for the page-specific content scripts
        ...glob
            .sync(`${PATH_TO_SRC}/js/contentScripts/*.js`, {
                ignore: '**/_*.js',
            })
            .reduce((obj, pathToFile) => {
                obj[path.parse(pathToFile).name] = pathToFile;
                return obj;
            }, {}),
    },
    output: {
        //output the files in the same dir structure as src
        filename: entryInfo =>
            path.join(
                entryInfo.chunk.entryModule.context.substring(
                    PATH_TO_SRC.length
                ),
                '[name].bundle.js'
            ),

        //I have to set "library" to something so that EsmWebpackPlugin works
        library: 'this_can_be_anything',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),

        //copy everything in "src" except the "js" dir
        new CopyWebpackPlugin(
            glob
                .sync(`${PATH_TO_SRC}/*`, { ignore: `**/js` })
                .map(pathToFile => {
                    let basename = path.parse(pathToFile).base;
                    return {
                        from: basename,
                        to: basename, //I have to specify "to" in order to get the same dir hierarchy structure when the contents are copied over to dist
                        ignore: ['.DS_Store'],
                    };
                })
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

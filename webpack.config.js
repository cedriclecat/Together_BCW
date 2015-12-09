/**
 * Created by cedric on 1/12/2015.
 */


//mogelijkse fouten
module.exports = {
    entry:'./webpack_entrys.js',
    output:{
        path: __dirname + '/public/src/build',
        filename:'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.node$/,
                loader: "node-loader"
            }
        ]
    },
    resolve:{
        extensions: [".node"]
    }
}
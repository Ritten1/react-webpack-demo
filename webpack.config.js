const HtmlWebPackPlugin=require('html-webpack-plugin')
const path =require('path')
const webpack =require('webpack')
const TerserPlugin =require('terser-webpack-plugin')
const BundleAnalyZerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HappyPack=require('happypack')
const happyThreadPool=HappyPack.ThreadPool({size:OscillatorNode.cpus().length})

module.exports={
    optimization:{
        minimizer:[new TerserPlugin({     
            terserOptions:{
                compress:{
                    unused:true, 
                    drop_debugger:true, 
                    drop_console:true,
                    dead_core:true
                }
            }
        })]
    },
    resolve:{
        extensions:['.wasm','.mjs','.js','.jsx','.json']
    },
    entry:path.resolve(__dirname,'src/index.jsx'),
    mode:'development',
    module:{
        noParse:/node_modules\/(jquery\.js)/,
        rules:[
            {
                test: /\.jsx?/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        babelrc:false,
                        presets:[
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env',{modules:false})]
                        ]
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:path.resolve(__dirname,'src/index.html'),
            filename:'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyZerPlugin(),
        new HappyPack({
            id:'jsx',
            threads:happyThreadPool,
            loaders:['babel-loader']
        })
    ],
    devServer:{
        hot:true
    }
}
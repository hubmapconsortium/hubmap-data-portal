
const path = require('path');
const HWP = require('html-webpack-plugin');

module.exports = {
    entry: ["@babel/polyfill", path.join(__dirname, '/src/index.js')],
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    module:{
        rules:[{
            test: /\.js$|\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
            loader: 'file-loader?name=[name].[ext]' 
        },
        {
            test: /\.svg$/,
            use: [{
                loader:'@svgr/webpack',
                    options: 
                    {
                        svgo: false
                }
             }],
            /* use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    template: (
                      { template },
                      opts,
                      { imports, componentName, props, js, exports }
                    ) => template.ast`
                      ${imports}
      
                      const ${componentName} = (${props}) => {
                        return ${js};
                      };
      
                      export default ${componentName};
                    `,
                  },
                },
              ], */
        },
    ]
    },
    plugins:[
        new HWP({template: path.join(__dirname,'/src/index.html')})
    ]

}
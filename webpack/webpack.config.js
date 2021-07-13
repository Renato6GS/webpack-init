const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const javascriptRules = {
   test: /\.js$/,
   exclude: /(node_modules)/,
   use: {
       loader: 'babel-loader',
       options: {
           presets: ['@babel/preset-react', '@babel/preset-env'],
           plugins: []
       }
   }
}

const cssRules = {
   test: /\.(sa|sc|c)ss$/,
   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
};

const imageRules = {
   test: /\.(jpg|png|gif|jpeg|svg)$/,
   use: {
      loader: 'file-loader',
      options: {
         name: '[name].[ext]',
         outputPath: (url, resourcePath, context) => {
            // `resourcePath` is original absolute path to asset
            // `context` is directory where stored asset (`rootContext`) or `context` option
            // To get relative path you can use
            const relativePath = path.relative(context, resourcePath);

            if (`src${path.sep}static${path.sep}img${path.sep}desktop${path.sep}${url}` === relativePath) {
              return `static/img/desktop/${url}`;
            }

            return `static/img/${url}`;
          },
         useRelativePath: true,
      },
   },
};

const handleBarsRules = {
   test: /\.handlebars/,
   loader: 'handlebars-loader',
};

const imageMinifyRules = {
   loader: 'image-webpack-loader',
   options: {
      mozjpeg: {
         progressive: true,
      },
      // optipng.enabled: false will disable optipng
      optipng: {
         enabled: true,
      },
      pngquant: {
         quality: [0.8, 0.9],
         speed: 4,
      },
      gifsicle: {
         interlaced: false,
      },
      // the webp option will enable WEBP
      webp: {
         quality: 75,
      },
   },
};

module.exports = {
   entry: './src/app.js',
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/bundle.js',
   },
   module: {
      rules: [javascriptRules, cssRules, imageRules, handleBarsRules, imageMinifyRules],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.handlebars',
         minify: {
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
         },
      }),
      new MiniCssExtractPlugin({
         filename: 'css/[name]-styles.css',
      }),
   ],
};

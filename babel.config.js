module.exports = {
  presets: ['module:metro-react-native-babel-preset', "module:react-native-dotenv", "mobx"
  ],
  plugins: [
    ["module-resolver", {
      "alias": {
        "@": "./src"
      }
    }],
    'babel-plugin-styled-components',
    '@babel/plugin-transform-flow-strip-types'
  ],
};

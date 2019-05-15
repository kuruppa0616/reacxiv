module.exports = {
  presets: ['module:metro-react-native-babel-preset', "module:react-native-dotenv",
  ],
  plugins: [
    ["module-resolver", {
      "alias": {
        "@": "./src"
      }
    }],
    'babel-plugin-styled-components'
  ],
};

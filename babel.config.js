module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo' , '@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-transform-arrow-functions',
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  };
};

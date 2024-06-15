module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env:{
    production:{
      plugins:['react-native-paper/babel']
    }
  },
  plugins: [

    ["nativewind/babel"],
    ["module:react-native-dotenv",
    {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
    }
    ]
  
  ],
};

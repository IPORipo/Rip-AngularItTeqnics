// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB_B-ehSxHQU-xm-MsxSwUAxojWZlgdlHU",
    authDomain: "riptricksapp.firebaseapp.com",
    databaseURL: "https://riptricksapp.firebaseio.com",
    projectId: "riptricksapp",
    storageBucket: "riptricksapp.appspot.com",
    messagingSenderId: "302004692031"
  }
};

// It is config object for firebase

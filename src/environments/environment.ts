// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC1Mlyq9kB8VnzHQYEu2EL7T0dXBmktoAg',
    authDomain: 'regatta-6a365.firebaseapp.com',
    databaseURL: 'https://regatta-6a365.firebaseio.com',
    projectId: 'regatta-6a365',
    storageBucket: 'regatta-6a365.appspot.com',
    messagingSenderId: '860819599535'
  },
  board: {
    viewboxHeight: 300,
    caseDimensions: {
      width: 11,
      height: 10
    }
  },
  svgServerUrl: 'http://localhost:8056/svg-regatta.php?svgfile=',
  cardsCountPerPlayer: 5,
  cast: {
    applicationId: '023A162F',
    namespace: 'urn:x-cast:com.google.cast.regatta'
  }
};

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  svgServerUrl: 'http://localhost/svg-regatta.php?svgfile=',
  cardsCountPerPlayer: 5,
  cast: {
    applicationId: '023A162F',
    namespace: 'urn:x-cast:com.google.cast.regatta'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

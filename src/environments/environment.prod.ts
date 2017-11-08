export const environment = {
  production: true,
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
  svgServerUrl: 'http://cyclo.nfcave.com/svg-regatta.php?svgfile=',
  cardsCountPerPlayer: 5,
  cast: {
    applicationId: '023A162F',
    namespace: 'urn:x-cast:com.google.cast.regatta'
  }
};

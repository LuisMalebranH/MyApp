// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
export const environment = {
  production: false
  firebase: {
    apiKey: "AIzaSyCGhkAa38J6bG4Rh0e1aVgjPF-Aiv5l4c8",
    authDomain: "inventariojc-998d0.firebaseapp.com",
    projectId: "inventariojc-998d0",
    storageBucket: "inventariojc-998d0.appspot.com",
    messagingSenderId: "315664327262",
    appId: "1:315664327262:web:73ad80845c3fbe4b360acf",
    measurementId: "G-XT1615QG4M"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

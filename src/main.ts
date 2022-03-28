import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBShU1-4GyL74QSiMyDNIOCy7La19Ip8No",
    authDomain: "todo-58d0f.firebaseapp.com",
    projectId: "todo-58d0f",
    storageBucket: "todo-58d0f.appspot.com",
    messagingSenderId: "1089596736461",
    appId: "1:1089596736461:web:1310f3524d7885b8c0ba84"
  };

export const app = initializeApp(firebaseConfig);

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
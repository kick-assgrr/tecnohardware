import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule }  from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {FormsModule} from '@angular/forms'

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent],


  imports: [BrowserModule, IonicModule.forRoot(),AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireAuthModule,HttpClientModule,FormsModule,AngularFirestoreModule],

            providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              provideFirebaseApp(() => initializeApp(environment.firebase)),
              provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
              provideStorage(() => getStorage())],
  bootstrap: [AppComponent],
})
export class AppModule {}
 
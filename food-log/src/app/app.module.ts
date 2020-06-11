import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { AgmCoreModule } from "@agm/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ResolveLog } from "./resolvers/resolve-log";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NewlogComponent } from "./tab1/newlog/newlog.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { PhotoComponent } from "./tab1/photo/photo.component";

@NgModule({
  declarations: [AppComponent, NewlogComponent, PhotoComponent],
  entryComponents: [NewlogComponent, PhotoComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ swipeBackEnabled: false }),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCdaYWR8k62rtrfC2vlRDoJERgOOgSfdgc"
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ResolveLog,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

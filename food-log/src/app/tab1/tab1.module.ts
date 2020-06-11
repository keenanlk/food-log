import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab1Page } from "./tab1.page";
import { AgmCoreModule } from "@agm/core";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { PhotoComponent } from "./photo/photo.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: "", component: Tab1Page }]),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCdaYWR8k62rtrfC2vlRDoJERgOOgSfdgc"
    })
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}

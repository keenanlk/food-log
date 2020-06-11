import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab2Page } from "./tab2.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { AgmCoreModule } from "@agm/core";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: "", component: Tab2Page }]),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCdaYWR8k62rtrfC2vlRDoJERgOOgSfdgc"
    })
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}

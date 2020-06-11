import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { ResolveLog } from "../resolvers/resolve-log";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "tab1",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab1/tab1.module").then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: "tab1/logdetail",
        resolve: { log: ResolveLog },
        loadChildren: () =>
          import("../tab1/logdetail/logdetail.module").then(
            m => m.LogdetailPageModule
          )
      },
      {
        path: "tab2",
        resolve: { log: ResolveLog },
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab2/tab2.module").then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab3/tab3.module").then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: "tab3/map/:id",
        loadChildren: () =>
          import("../tab3/map/map.module").then(m => m.MapPageModule)
      },
      {
        path: "tab4",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab4/tab4.module").then(m => m.Tab4PageModule)
          }
        ]
      },

      {
        path: "",
        redirectTo: "/tabs/tab1",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/tab1",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

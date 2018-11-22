import { PipeComponent } from "./pipe/pipe.component";
// This is a tecnique to write routes outside app.module (it means write in another module)
// that will be included in app.module

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { DataComponent } from "./servers/data/data.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RoutGuardService } from "./TestServers/rout-guard.service";
import { NewFormsComponent } from "./new-forms/new-forms.component";
import { ReactiveFormComponent } from "./reactive-form/reactive-form.component";
import { TestRipServiceComponent } from "./test-rip-service/test-rip-service.component";
import { FirestoreComponent } from "./firestore/firestore.component";

// This is array of type Routes that should be passed as an argument
// in RouterModule.forRoot(-) function
const ripRoutes: Routes = [
  // First argument is path(route) for first(parent component we shouldnot use '/')
  // Second is that component, that corresponts to this route
  //pathMatch property-if we will     this route will be called when exactly this rpute will be caled
  // and not when it will be part of full route
  { path: "", component: ServersComponent, pathMatch: "full" },
  { path: "simple-form", component: NewFormsComponent },
  { path: "reactive-form", component: ReactiveFormComponent },
  { path: "firestore", component: FirestoreComponent },

  { path: "test-service", component: TestRipServiceComponent },
  { path: "pipe", component: PipeComponent },
  // We can add children route,so after in parrent component if we will write
  //<router-outlet></router-outlet> and fill parentsroute+childroute in parents route
  // on palace of <router-outlet></router-outlet> will be shown that children component
  {
    path: "servers",
    component: ServersComponent,
    children: [
      {
        path: "server",
        component: ServerComponent,
        children: [{ path: "data", component: DataComponent }]
      }
    ]
  },
  // we should look at tghis example and understand that route with dynamic
  // property (:id) is comming after this route,bcouse if this route was after dynamic,than
  // this route would never come in action bcouse roter would thought about this route
  // (servers/new) as a dynamically filled route
  { path: "servers/new", component: ServerComponent },
  // This form allows us to pass paramtere in path(after slash).Important is that
  // We are forced to pass para meter
  // canActivate parameter holds service that should implement(CanActivate interface).
  // This service will run before activating this route.it can return several types.Also
  {
    path: "servers/:id/:name",
    canActivate: [RoutGuardService],
    //its to add guard to only its childs.We can add "canActivate :[RoutGuardService]"
    // On all childs but it will be harder if we have a lot of childs
    canActivateChild: [RoutGuardService],
    component: ServersComponent
  },

  { path: "page-not-found", component: PageNotFoundComponent },

  //** is a wildcard that catches all kind of routes.
  //so we should know that anything that will be under this path
  //wont be readen becouse route will be catched by this statement(if we will write it
  //in top,none of routes will be usable and readen)
  { path: "**", redirectTo: "page-not-found" }
];

@NgModule({
  imports: [
    // useHash:true-is for hasbag reloading.Its to say to server that we ant not controller according to that route,
    //we want root element and after hashtag components should be handeled by js
    RouterModule.forRoot(ripRoutes, { useHash: true })
  ],
  // in export we are writting modules that should be accessible from module,
  // that imports our modlue(AppRoutingModule)
  exports: [RouterModule]
})
export class AppRoutingModule {}

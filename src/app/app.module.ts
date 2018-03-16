import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//important for FormsModule's import
import { AppComponent } from './app.component';
//imports are part of typescrypt not angular and we should not write .ts it will be wriiten automatically
import { ServersComponent } from './servers/servers.component';
import { DirectiveWithRendererDirective } from './directive/directive-with-renderer.directive';
import { DirectiveWithoutRendererDirective } from './directive/directive-without-renderer.directive';
import { StructuralDirectiveDirective } from './directive/structural-directive.directive';

import { LogService } from './TestServers/ripserver.server';
// for animations
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// for routers
import { Routes,RouterModule } from '@angular/router';
import { ServerComponent } from './servers/server/server.component';
import { DataComponent } from './servers/data/data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './routing.module';
import { LogService2 } from './TestServers/ripserver2.server';
import { RoutGuardService } from './TestServers/rout-guard.service';
import { NewFormsComponent } from './new-forms/new-forms.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FilterPipe } from './filter.pipe';
import { PipeComponent } from './pipe/pipe.component';
import { ShortenPipe } from './shorten.pipe';

// I have placed routes in seperate routing.module.ts file
// const ripRoutes:Routes=[
//   {path:'',component:ServersComponent}
// ]

//from here we are adding different feauters to app
// Components and directives
@NgModule({
  declarations: [
    AppComponent,
    ServersComponent,
    DirectiveWithoutRendererDirective,
    DirectiveWithRendererDirective,
    StructuralDirectiveDirective,
    ServerComponent,
    DataComponent,
    PageNotFoundComponent,
    NewFormsComponent,
    ReactiveFormComponent,
    FilterPipe,
    PipeComponent,
    ShortenPipe
  ],
  // here we are adding modules
  imports: [
    BrowserModule,
    // is added to have ability to us formGroups(Reactive form)
    ReactiveFormsModule,
    // Is used to use ngModel 
    FormsModule,
    //is added for form listener that we use to write text input to anour object(name)
    // i have placed routes in seperate rowes,thats why i placed 
    // RouterModule.forRoot(ripRoutes) in seperate file.So now i have only imoirt 
    // AppRoutingModule that imports my routs
    // RouterModule.forRoot(ripRoutes) 
    AppRoutingModule
  ],
  // here we are adding services
  providers: [
    // This is service created by me
    // When we are creating it in app module we can use this instance in
    // this modules child components declaring this service only in constuctor
    // without declaring providers in them.If we dont declate in child components 
    // will be created only 1 instance of this service.If we will declare
    // then will be created as much service instances as we will declare(in providers)
    LogService,
    LogService2,
    RoutGuardService
    ,
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    //   },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

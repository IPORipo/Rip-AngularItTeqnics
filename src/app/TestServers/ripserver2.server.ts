import { Injectable } from "@angular/core";
import { LogService } from "./ripserver.server";

// This annotation is important bcouse to inject service 
// class should have some kind of decorator(directive,component..)
// So here we are using Injectable decorator bcouse our class isnot component and not directive
// or other thing
@Injectable()
export class LogService2{
    constructor(private logService:LogService){
        
        // This is example of catching event trown by logService
        // (service that is injected into this service)
        // subscribe method is listening to itself(Emitter)
        // and if emit is done this subscrube method is done
        // (here is observeable principle) everywehere,wehere subscribe is done
        // event will be cached
        logService.logAdd.subscribe(
            (log:string)=>console.log(`this is log thrown by first
            and cached by second service `+log)
        );
    }
    printService(){
        console.log("riplog");
    }
}
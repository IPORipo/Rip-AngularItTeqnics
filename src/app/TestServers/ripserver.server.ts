import { Injectable, EventEmitter } from "@angular/core";

export class LogService{
    logAdd = new EventEmitter<string>();
    printLog(log:string){
        console.log(log);
        this.logAdd.emit(log);
    }
}
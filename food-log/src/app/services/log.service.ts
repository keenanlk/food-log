import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Log } from "../models/log";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LogService {
  //url: string = "http://192.168.1.13:3000/logs";
  url: string = "https://floating-citadel-08737.herokuapp.com/logs";
  currentLog: Log;

  constructor(private httpClient: HttpClient) {}

  //get list of logs by user
  getLogsByUser(id: number) {
    return this.httpClient.get<Log[]>(this.url + "/users/" + id);
  }

  //set current log to be used
  setCurrentLog(log: Log) {
    this.currentLog = log;
    console.log(log);
  }

  //gets the current log that is set
  getCurrentLog(): Observable<any> {
    return of(this.currentLog).pipe(delay(1000));
  }

  //create a new log in db
  createLog(log: Log): Promise<any> {
    return this.httpClient.post<any>(this.url, log).toPromise();
  }
}

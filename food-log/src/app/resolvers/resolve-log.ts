import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { LogService } from "../services/log.service";
import { UserService } from "../services/user.service";

@Injectable()
export class ResolveLog implements Resolve<Observable<string>> {
  constructor(private api: LogService, private userService: UserService) {}
  resolve() {
    return this.api.getCurrentLog();
  }

  resolveLogs(id: number) {
    return this.api.getLogsByUser(id);
  }
}

import { Component, OnInit } from "@angular/core";
import { Log } from "src/app/models/log";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-logdetail",
  templateUrl: "./logdetail.page.html",
  styleUrls: ["./logdetail.page.scss"]
})
export class LogdetailPage implements OnInit {
  log: Log;

  constructor(private route: ActivatedRoute) {}

  //get log detail from resolver
  ngOnInit() {
    this.log = this.route.snapshot.data.log;
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Log } from "src/app/models/log";
import { LogService } from "../../services/log.service";
import * as lodash from "lodash";

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})
export class MapPage implements OnInit {
  private sub: any;
  public id;
  logs: Log[];
  public lon;
  public lat;
  public geolocationPosition;

  constructor(private logService: LogService, private route: ActivatedRoute) {}

  ngOnInit() {
    //get current location
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          (this.geolocationPosition = position), console.log(position);
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
        },
        error => {
          switch (error.code) {
            case 1:
              console.log("Permission Denied");
              break;
            case 2:
              console.log("Position Unavailable");
              break;
            case 3:
              console.log("Timeout");
              break;
          }
        }
      );
    }

    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      console.log(this.id);
      this.getLogsByUser();
    });
  }

  getLogsByUser() {
    this.logService.getLogsByUser(this.id).subscribe(data => {
      //only show unique locations
      this.logs = lodash.uniqBy(data, "location");

      console.log(data);
    });
  }
}

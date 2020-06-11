import { Component, OnInit } from "@angular/core";
import { PopoverController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-photo",
  templateUrl: "./photo.component.html",
  styleUrls: ["./photo.component.scss"]
})
export class PhotoComponent implements OnInit {
  url;
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    console.log(this.url);
  }
}

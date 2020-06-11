import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"]
})
export class Tab4Page implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  //logout and navigate back to login screen
  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("");
    });
  }
}

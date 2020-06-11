import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: "root"
})
export class PhotoService {
  private path = "gs://log-log-f981e.appspot.com";
  constructor(private afStorage: AngularFireStorage) {}
}

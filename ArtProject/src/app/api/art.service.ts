import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ArtService {
  constructor(private http: HttpClient) {}

  public getArt(input: String) {
    return this.http.get(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + input

    );
  }

  public getArtId(input: String) {
    return this.http.get(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + input
    );
  }

}
/*
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ArtService {
  constructor(private http: HttpClient) {}

  public getArt(input: String) {
    return this.http.get(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + input

    );
  }

  public getArt(text: String) {
    return this.http.get(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + text
    );
  }
}
*/

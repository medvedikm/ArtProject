import { Component } from "@angular/core";
import { ArtService } from "../api/art.service";
import { LoadingController } from "@ionic/angular";
import { HistoryRecord } from "../models/history-record.model";
import { HistoryService } from "../api/history.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  input: String;
  IDs: String[];
  NameAndTitle: String[] = [];
  loadingDialog: any;

  constructor(
    private artService: ArtService,
    public loadingController: LoadingController,
    private historyService: HistoryService
  ) {}

  public btnSearchClicked(): void {
    if (this.input.length > 0) {
      this.presentLoading();
      this.artService.getArtId(this.input).subscribe((data) => {
        this.IDs = data["objectIDs"].slice(0, 5);

        for (let i = 0; i < 5; i++) {
          this.artService.getArt(this.IDs[i]).subscribe((data) => {
            let output =
              data["artistDisplayName"] == ""
                ? `${data["title"]} => Author unspecified `
                : `${data["title"]} => ${data["artistDisplayName"]}`;
            this.NameAndTitle.push(output);
            this.loadingDialog.dismiss();
          });
        }
      });
    }
  }

  public addToFavourites(name: String) {
    let record = new HistoryRecord(name);
    this.historyService.saveRecord(record);
  }

  async presentLoading() {
    this.loadingDialog = await this.loadingController.create({
      message: "Searching ...",
    });
    await this.loadingDialog.present();
  }
}

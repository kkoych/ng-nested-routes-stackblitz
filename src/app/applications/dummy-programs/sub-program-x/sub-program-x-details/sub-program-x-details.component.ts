import { Component } from "@angular/core";
import { DetailPage } from "../../../../company/interfaces/page";
import { SubProgramXDetailsDefinition } from "./sub-program-x-details.definition";

@Component({
  template: ` <sp-detail-page [page]="page"></sp-detail-page> `,
})
export class SubProgramXDetailsComponent {
  page: DetailPage;

  constructor() {
    this.page = SubProgramXDetailsDefinition;
  }
}

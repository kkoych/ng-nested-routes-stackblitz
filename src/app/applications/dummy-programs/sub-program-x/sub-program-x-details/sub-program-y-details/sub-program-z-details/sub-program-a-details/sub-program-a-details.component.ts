import { Component } from "@angular/core";
import { DetailPage } from "../../../../../../../company/interfaces/page";
import { SubProgramADetailsDefinition } from "./sub-program-a-details.definition";

@Component({
  template: ` <sp-detail-page [page]="page"></sp-detail-page> `,
})
export class SubProgramAComponent {
  page: DetailPage;

  constructor() {
    this.page = SubProgramADetailsDefinition;
  }
}

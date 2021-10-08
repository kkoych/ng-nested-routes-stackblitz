import { Component } from "@angular/core";
import { DetailPage } from "../../../../../company/interfaces/page";
import { SubProgramYDetailsDefinition } from "./sub-program-y-details.definition";

@Component({
  template: ` <sp-detail-page [page]="page"></sp-detail-page> `,
})
export class SubProgramYComponent {
  page: DetailPage;

  constructor() {
    this.page = SubProgramYDetailsDefinition;
  }
}

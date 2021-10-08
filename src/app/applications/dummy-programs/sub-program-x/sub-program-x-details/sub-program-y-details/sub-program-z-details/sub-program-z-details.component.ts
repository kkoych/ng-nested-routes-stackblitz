import { Component } from "@angular/core";
import { DetailPage } from "../../../../../../company/interfaces/page";
import { SubProgramZDetailsDefinition } from "./sub-program-z-details.definition";

@Component({
  template: ` <sp-detail-page [page]="page"></sp-detail-page> `,
})
export class SubProgramZComponent {
  page: DetailPage;

  constructor() {
    this.page = SubProgramZDetailsDefinition;
  }
}

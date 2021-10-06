import { Component } from "@angular/core";
import { DetailPage } from "src/app/company/interfaces/page";
import { SubProgramBDetailsDefinition } from "./sub-program-b.definition";

@Component({
  template: `<sp-detail-page [page]="page"></sp-detail-page> `,
})
export class SubProgramBDetailsComponent {
  page: DetailPage;

  constructor() {
    this.page = SubProgramBDetailsDefinition;
  }
}

import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { State } from "@progress/kendo-data-query";
import { FilterAction } from "../../enums/filter-action.enum";
import { FilterRequest, QueryFilter } from "../../interfaces/filter";

@Component({
  selector: "sp-filter",
  templateUrl: "./filter.html",
  styleUrls: ["./filter.scss"],
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;

  @Output()
  filterAction = new EventEmitter<FilterRequest>();

  ngOnInit() {
    this.filterForm = new FormGroup({});
    const formControl = new FormControl();

    this.filterForm.addControl("productName", formControl);
  }

  public applyFilter() {
    const formValues = this.filterForm.getRawValue();
    let queryFilter: Array<QueryFilter> = [];

    if (formValues["productName"] !== null) {
      queryFilter = [
        {
          field: "productName",
          operator: "eq",
          value: formValues["productName"],
        },
      ];
    }

    const state: State = {
      take: 15,
      skip: 0,
      sort: [],
      filter: {
        logic: "and",
        filters: formValues["productName"] !== null ? queryFilter : [],
      },
      group: [],
    };

    this.filterAction.emit({
      state: state,
      filters: queryFilter,
      filterAction: FilterAction.Filter,
      filterLayoutId: "-1",
    });
  }

  public clearFilter() {
    this.filterForm.reset();
    const state: State = {
      take: 15,
      skip: 0,
      sort: [],
      filter: {
        logic: "and",
        filters: [],
      },
      group: [],
    };

    this.filterAction.emit({
      state: state,
      filters: [],
      filterAction: FilterAction.Clear,
      filterLayoutId: "-1",
    });
  }
}

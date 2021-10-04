import { State } from "@progress/kendo-data-query";
import { FilterAction } from "../enums/filter-action.enum";

export interface FilterRequest {
  state: State;
  filters: Array<QueryFilter>;
  filterAction: FilterAction;
  filterLayoutId?: string;
  childPath?: string;
  childGridFilter?: Array<QueryFilter>;
}

export interface QueryFilter {
  field: string;
  operator: string;
  value: string | number | boolean | Array<string | number>;
  deviation?: string;
}

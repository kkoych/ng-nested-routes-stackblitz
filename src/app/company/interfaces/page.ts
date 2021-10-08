import { DataResult, State } from "@progress/kendo-data-query";
import { FormField } from "./field";
import { GridFilter } from "./filter";
import { Column } from "./grid";
import { GridInfo } from "./grid";

export interface MasterPage {
  pageInfo: PageInfo;
  pageGrid: PageGrid;
}

export interface DetailPage {
  pageInfo: PageInfo;
  pageForm?: PageForm;
  pageGrids?: Array<PageGrid>;
}

export interface PageInfo {
  title: string;
  path?: string;
}

export interface PageForm {
  source?: Source;
  fieldSets: Array<FormFieldSet>;
}

export interface PageGrid {
  gridInfo: GridInfo;
  pagerSizes?: Array<number>;
  defaultPagerSize?: number;
  source: Source;
  columns: Array<Column>;
  childs?: Array<Childpage>;
  gridFilter?: GridFilter;
}

export interface Source {
  resourceName: string;
  dataSetName: string;
  tempTableName: string;
  primaryKeys?: Array<string>;
  foreignKeys?: Array<{ masterField: string; childField: string }>;
}

export interface Childpage {
  title: string;
  path: string;
  securityId?: string;
  isEnabled?: boolean;
}

export interface PageData {
  dataItems: SPDataResult;
  state: State;
  selectedJSDOId?: string;
}

export interface SPDataResult extends DataResult {
  countExact?: boolean;
}

export interface FormFieldSet {
  title?: string;
  id?: number;
  index?: number;
  fields?: Array<FormField>;
  hidden?: boolean;
  default?: boolean;
  collapse?: boolean;
}

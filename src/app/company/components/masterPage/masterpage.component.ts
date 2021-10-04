import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { products } from "../../../products";
import { parseUrlPathInSegments } from "../../classes/url-path-parser";
import { FilterAction } from "../../enums/filter-action.enum";
import { GridAction } from "../../enums/grid-action.enum";
import { FilterRequest } from "../../interfaces/filter";
import { GridRequest } from "../../interfaces/grid";
import {
  Childpage,
  MasterPage,
  PageData,
  PageGrid,
} from "../../interfaces/page";
import { SelectedDataService } from "../../services/selected-data.service";

@Component({
  selector: "sp-master-page",
  templateUrl: "./masterpage.component.html",
  styleUrls: ["./masterpage.component.scss"],
})
export class MasterPageComponent implements OnChanges, OnInit {
  @Input()
  page: MasterPage;
  @Input()
  pageGrid: PageGrid;
  @Input()
  isRoot: boolean;

  public localChilds: Array<Childpage>;
  public localPageData: PageData;
  public localPageGrid: PageGrid;
  public activePath = "";
  public queryParamsState: any = {};

  private queryParamsRow: any = {};
  private subscribers: any = {};

  constructor(
    private router: Router,
    private selectedDataService: SelectedDataService
  ) {}

  ngOnChanges() {
    this.localPageGrid = Object.assign({}, this.pageGrid);

    this.localPageData = {
      dataItems: {
        countExact: true,
        data: [],
        total: 0,
      },
      state: {
        filter: {
          logic: "and",
          filters: [],
        },
      },
    };

    this.localPageGrid.defaultPagerSize = 15;

    if (!this.localPageData.state.take) {
      this.localPageData.state.take = this.localPageGrid.defaultPagerSize;
    }

    if (!this.localPageData.state.skip) {
      this.localPageData.state.skip = 0;
    }

    // normally the data is fetched by unique source from definition file,
    // now all the grids have same data for example purpose
    this.localPageData.dataItems.data = products as any;
    this.localPageData.dataItems.total = products.length;
  }

  ngOnInit() {
    this.localChilds = Object.assign([], this.localPageGrid.childs);

    this.subscribers.routerSubscription = this.router.events.subscribe(
      (routerEvent: any) => {
        if (routerEvent instanceof NavigationEnd) {
          this.setActivePath();
        }
      }
    );
  }

  public filterAction(filterRequest: FilterRequest) {
    switch (filterRequest.filterAction) {
      case FilterAction.Filter: {
        this.filter(filterRequest);
        break;
      }
      case FilterAction.Clear: {
        this.clearFilter();
        break;
      }
      default: {
        break;
      }
    }
  }

  private filter(filterRequest: FilterRequest) {
    if (filterRequest.filters.length > 0) {
      this.localPageData.dataItems.data = [];
      this.localPageData.dataItems.total = 0;

      for (let i = 0; i < products.length; i++) {
        if (products[i].ProductName === filterRequest.filters[0].value) {
          this.localPageData.dataItems.data.push(products[i]);
          this.localPageData.dataItems.total = products.length;
        }
      }
      this.localPageData.state = filterRequest.state;
    }
  }

  private clearFilter() {
    this.localPageData.dataItems.data = products;
    this.localPageData.dataItems.total = products.length;
  }

  // Switch to correct grid action from grid
  public gridAction(gridRequest: GridRequest) {
    switch (gridRequest.gridAction) {
      case GridAction.SelectionChange: {
        this.selectionChangedManual(gridRequest.data);
        break;
      }
      default: {
        break;
      }
    }
  }

  // Manual selection change (grid row click)
  private async selectionChangedManual(dataWrapper: any) {
    const copyLocalPageData: PageData = Object.assign({}, this.localPageData);
    copyLocalPageData.selectedJSDOId = dataWrapper.dataItem
      ? dataWrapper.dataItem["ProductID"]
      : undefined;

    // Create optional query params
    const queryParamsRow = this.createQueryParamsRowFromRowAndKeys(
      dataWrapper.dataItem,
      ["ProductID"]
    );
    let queryParamsState = {};
    if (this.localPageGrid.defaultPagerSize) {
      queryParamsState = this.createQueryParamsFromState(
        this.localPageData.state
      );
    }
    const queryParams = Object.assign(queryParamsRow, queryParamsState);

    let childPath = "";
    if (this.localChilds && this.localChilds.length > 0) {
      console.log(this.activePath);
      childPath = this.activePath ? this.activePath : this.localChilds[0].path;
      console.log("child: " + childPath, "activepath: " + this.activePath);
    }

    if (!dataWrapper.dataItem) {
      childPath = "";
    }

    console.log(childPath);
    const browseResult = await this.navigateToNewURL(queryParams, childPath);

    if (browseResult) {
      this.queryParamsRow = queryParamsRow;
      this.queryParamsState = queryParamsState;
      this.localPageData = Object.assign({}, copyLocalPageData);
    } else {
      this.localPageData = Object.assign({}, this.localPageData);
    }

    this.selectedDataService.selectedData(dataWrapper.dataItem);
  }

  // Parse current url and add new parameters
  private navigateToNewURL(queryParams: any, childURL?: string) {
    const path = this.page.pageInfo.path;
    const useFullPaths = [];

    // Get the latest path segments for defining a base path
    this.router
      .parseUrl(this.router.url)
      .root.children.primary.segments.map((segment) => {
        useFullPaths.push(segment.path);
      });

    let baseURL = useFullPaths.join("/");

    // Convert selection to queryParams
    const pathQueryObject = {};
    if (Object.keys(queryParams).length !== 0) {
      pathQueryObject[path] = JSON.stringify(queryParams);
    }

    if (childURL) {
      this.activePath = childURL;
      // Paste the childURL to the baseURL
      baseURL += "/" + childURL;
    } else {
      this.activePath = "";
    }

    const navUrlArray = baseURL.split("/").filter((str) => str.length > 0);

    // Remove duplicate paths
    const removeDuplicatePaths = [...new Set(navUrlArray)];

    return this.router.navigate(removeDuplicatePaths, {
      queryParams: pathQueryObject,
    });
  }

  // Change route to new path
  public activatePath(path: string) {
    this.navigateToNewURL(this.queryParamsRow, path);
  }

  private setActivePath() {
    // const pathSegments = this.router.url
    //   .split("/")
    //   .filter((segment) => segment);
    // const index = pathSegments.lastIndexOf(this.page.pageInfo.path);
    // console.log(pathSegments, this.page.pageInfo.path);
    // if (pathSegments[index + 1]) {
    //   this.activePath = pathSegments[index + 1].split("?")[0];
    // } else {
    //   this.activePath = "";
    // }
  }

  // Create queryParamsRow object based on given row filtered with the primary keys
  private createQueryParamsRowFromRowAndKeys(data: any, keys: Array<string>) {
    return keys.reduce((prev, curr) => {
      const result: any = Object.assign({}, prev);
      if (data) {
        result[curr] = data[curr];
      }
      return result;
    }, {});
  }

  // Create queryParams object based on given state
  private createQueryParamsFromState(state: State) {
    return {
      take: state.take,
      skip: state.skip,
    };
  }
}

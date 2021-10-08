import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { Childpage } from "../../interfaces/page";

@Component({
  selector: "sp-page-childs-wrapper",
  templateUrl: "./page-child-wrapper.component.html",
  styleUrls: ["./page-child-wrapper.component.scss"],
})
export class PageChildsWrapperComponent implements OnChanges {
  @Input()
  pageChilds: Array<Childpage>;
  @Input()
  activePath: string;
  @Output()
  activatedPath = new EventEmitter<string>();
  public tabs: Array<{
    heading: string;
    path: string;
    active: boolean;
    isEnabled: boolean;
  }> = [];

  ngOnChanges() {
    this.initTabs();
  }

  select(tab: { heading: string; path: string; active: boolean }) {
    this.activatedPath.emit(tab.path);
  }

  initTabs() {
    this.tabs = this.pageChilds.map((page) => ({
      heading: page.title,
      path: page.path,
      active: this.activePath === page.path,
      isEnabled: page.isEnabled,
    }));
  }
}

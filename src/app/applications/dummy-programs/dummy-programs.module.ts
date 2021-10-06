import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { DummyProgramsRoutingModule } from "./dummy-programs-routing.module";
import { DummyProgramsComponent } from "./dummy-programs.component";
import { SubProgramBDetailsComponent } from "./sub-program-x/sub-program-b/sub-program-b.component";
import { SubProgramXDetailsComponent } from "./sub-program-x/sub-program-x-details/sub-program-x-details.component";
import { SubProgramYComponent } from "./sub-program-x/sub-program-x-details/sub-program-y-details/sub-program-y-details.component";
import { SubProgramAComponent } from "./sub-program-x/sub-program-x-details/sub-program-y-details/sub-program-z-details/sub-program-a-details/sub-program-a-details.component";
import { SubProgramZComponent } from "./sub-program-x/sub-program-x-details/sub-program-y-details/sub-program-z-details/sub-program-z-details.component";
import { SubProgramXComponent } from "./sub-program-x/sub-program-x.component";

@NgModule({
  imports: [DummyProgramsRoutingModule, CommonModule, SharedModule],
  declarations: [
    DummyProgramsComponent,
    SubProgramXComponent,
    SubProgramXDetailsComponent,
    SubProgramYComponent,
    SubProgramZComponent,
    SubProgramAComponent,
    SubProgramBDetailsComponent,
  ],
})
export class DummyProgramsModule {}

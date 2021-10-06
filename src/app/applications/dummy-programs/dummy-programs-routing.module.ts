import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DummyProgramsComponent } from "./dummy-programs.component";
import { SubProgramBDetailsComponent } from "./sub-program-x/sub-program-b/sub-program-b.component";
import { SubProgramBDetailsDefinition } from "./sub-program-x/sub-program-b/sub-program-b.definition";
import { SubProgramXDetailsComponent } from "./sub-program-x/sub-program-x-details/sub-program-x-details.component";
import { SubProgramXDetailsDefinition } from "./sub-program-x/sub-program-x-details/sub-program-x-details.definition";
import { SubProgramYComponent } from "./sub-program-x/sub-program-x-details/sub-program-y-details/sub-program-y-details.component";
import { SubProgramYDetailsDefinition } from "./sub-program-x/sub-program-x-details/sub-program-y-details/sub-program-y-details.definition";
import { SubProgramAComponent } from "./sub-program-x/sub-program-x-details/sub-program-y-details/sub-program-z-details/sub-program-a-details/sub-program-a-details.component";
import { SubProgramADetailsDefinition } from "./sub-program-x/sub-program-x-details/sub-program-y-details/sub-program-z-details/sub-program-a-details/sub-program-a-details.definition";
import { SubProgramZComponent } from "./sub-program-x/sub-program-x-details/sub-program-y-details/sub-program-z-details/sub-program-z-details.component";
import { SubProgramZDetailsDefinition } from "./sub-program-x/sub-program-x-details/sub-program-y-details/sub-program-z-details/sub-program-z-details.definition";
import { SubProgramXComponent } from "./sub-program-x/sub-program-x.component";
import { SubProgramXDefinition } from "./sub-program-x/sub-program-x.definition";

const routes: Routes = [
  {
    path: "",
    component: DummyProgramsComponent,
    children: [
      {
        path: SubProgramXDefinition.pageInfo.path, // sub-program-x
        component: SubProgramXComponent,
        children: [
          {
            path: SubProgramXDetailsDefinition.pageInfo.path, // details, first tab
            component: SubProgramXDetailsComponent,
            children: [
              {
                path: SubProgramYDetailsDefinition.pageInfo.path, // y-details
                component: SubProgramYComponent,
                children: [
                  {
                    path: SubProgramZDetailsDefinition.pageInfo.path, // z-details
                    component: SubProgramZComponent,
                    children: [
                      {
                        path: SubProgramADetailsDefinition.pageInfo.path, // a-details
                        component: SubProgramAComponent,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: SubProgramBDetailsDefinition.pageInfo.path, // B details, second tab
            component: SubProgramBDetailsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DummyProgramsRoutingModule {}

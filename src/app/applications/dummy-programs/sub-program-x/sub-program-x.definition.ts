import { MasterPage } from "../../../company/interfaces/page";

export const SubProgramXDefinition: MasterPage = {
  pageInfo: {
    title: "Sub Program X",
    path: "sub-program-x",
  },
  pageGrid: {
    gridInfo: {
      title: "Test Title",
    },
    pagerSizes: [5, 10, 15, 20, 50],
    defaultPagerSize: 15,
    source: {
      dataSetName: "dsJSDOTableRef",
      tempTableName: "ttJSDOTableRef",
      resourceName: "DD.JSDOTableRef",
      primaryKeys: ["ProductID"],
    },
    columns: [],
    childs: [
      {
        title: "Details",
        path: "details",
      },
      {
        title: "Second Tab",
        path: "second-tab",
      },
    ],
  },
};

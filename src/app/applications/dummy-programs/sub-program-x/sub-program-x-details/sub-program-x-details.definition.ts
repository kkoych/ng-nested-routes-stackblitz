import { DetailPage } from '../../../../company/interfaces/page';

export const SubProgramXDetailsDefinition: DetailPage = {
  pageInfo: { title: 'Details', path: 'details' },
  pageForm: {
    source: {
      dataSetName: 'dsJSDOTableRef',
      tempTableName: 'ttJSDOTableRef',
      resourceName: 'DD.JSDOTableRef',
      primaryKeys: ['ProductID']
    },
    fieldSets: []
  },
  pageGrids: [
    {
      gridInfo: {
        title: 'Program X Details Title'
      },
      pagerSizes: [5, 10, 15, 20, 50],
      defaultPagerSize: 15,
      source: {
        dataSetName: 'dsJSDOXDetailTableRef',
        tempTableName: 'ttJSDOXDetailTableRef',
        resourceName: 'DD.JSDOXDetailTableRef',
        primaryKeys: ['ProductID']
      },
      columns: [],
      childs: [
        {
          title: 'Y Details',
          path: 'y-details'
        }
      ]
    }
  ]
};

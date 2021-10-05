import { QueryFilter, DefaultFilter } from "../interfaces/filter";

export function parseQueryFiltersToFilterValues(
  queryFilters: Array<QueryFilter>,
  defaultFilter: DefaultFilter,
  addFilterSyntax?: boolean
): any {
  const result: any = {};

  // Get filter info to detect multiselect
  const fields = getFields(defaultFilter);
  // Add all normal filters to value
  queryFilters.forEach((queryFilter) => {
    if (queryFilter && queryFilter.value !== undefined) {
      const multiIndex = fields.multiSelectFields.findIndex(
        (multiSelectField) => multiSelectField.field.name === queryFilter.field
      );
      const rangeIndex = fields.rangeFields.findIndex(
        (rangeField) => rangeField.field.name === queryFilter.field
      );
      const deviationIndex = fields.deviationFields.findIndex(
        (deviationField) => deviationField.field.name === queryFilter.field
      );

      if (multiIndex === -1 && rangeIndex === -1 && deviationIndex === -1) {
        let isDefault = false;
        const filter = fields.filterFields.find(
          (filterField) => filterField.field.name === queryFilter.field
        );
        if (filter) {
          const equalsTypes = ["integer", "decimal", "logical", "date"];
          let defaultOperator = "";
          if (filter.field?.fieldType?.lookup?.returnField) {
            defaultOperator = equalsTypes.includes(
              filter.field.fieldType.lookup.returnField.progressType
            )
              ? "eq"
              : "startswith";
          } else {
            defaultOperator = equalsTypes.includes(filter.field.progressType)
              ? "eq"
              : "startswith";
          }
          isDefault = queryFilter.operator === defaultOperator;
        }

        const fieldName = addFilterSyntax
          ? "f_" + queryFilter.field
          : queryFilter.field;
        result[fieldName] =
          isDefault || !addFilterSyntax
            ? queryFilter.value
            : queryFilter.value + "_" + queryFilter.operator;
      }
    }
  });

  // Add multiselects as items array
  fields.multiSelectFields.forEach((multiSelectField) => {
    const items: Array<any> = [];
    const multiQueryFilters = queryFilters.filter(
      (queryFilter) => queryFilter.field === multiSelectField.field.name
    );
    multiQueryFilters.forEach((queryFilter) => {
      items.push(queryFilter.value);
    });
    const fieldName = addFilterSyntax
      ? "f_" + multiSelectField.field.name
      : multiSelectField.field.name;
    if (items.length > 0) {
      result[fieldName] = items;
    }
  });

  // Add range as range array
  fields.rangeFields.forEach((rangeField) => {
    const range = [];
    const rangeFilters = queryFilters.filter(
      (queryFilter) => queryFilter.field === rangeField.field.name
    );

    // Add from filter to string; get form and to value from queryFilter
    const fromFilter = rangeFilters.find(
      (rangefilter) => rangefilter.operator === "gte"
    );
    const toFilter = rangeFilters.find(
      (rangefilter) => rangefilter.operator === "lte"
    );

    // Add to filter to string; if one or two of the values are valid
    if (fromFilter || toFilter) {
      range[0] = fromFilter?.value ? fromFilter.value : null;
      range[1] = toFilter?.value ? toFilter.value : null;
    }

    const fieldName = addFilterSyntax
      ? "f_" + rangeField.field.name
      : rangeField.field.name;
    if (range.length > 0) {
      result[fieldName] = range;
    }
  });

  // Add deviation array (similar to Range array)
  fields.deviationFields.forEach((deviationField) => {
    const deviationRange = [];
    const deviationFilters = queryFilters.filter(
      (queryFilter) => queryFilter.field === deviationField.field.name
    );

    // Add from filter to string
    const fromFilter = deviationFilters.find(
      (deviationFilter) => deviationFilter.operator === "gte"
    );
    if (fromFilter && fromFilter.value) {
      deviationRange[0] = fromFilter.value;
    }

    // Add to filter to string
    const toFilter = deviationFilters.find(
      (deviationFilter) => deviationFilter.operator === "lte"
    );
    if (toFilter && toFilter.value) {
      deviationRange[1] = toFilter.value;
    }

    const fieldName = addFilterSyntax
      ? "f_" + deviationField.field.name
      : deviationField.field.name;
    if (deviationRange.length > 0) {
      result[fieldName] = deviationRange;
    }
  });

  // Add default values to result
  fields.filterFields.forEach((filterField) => {
    if (
      filterField &&
      filterField.field.value !== null &&
      filterField.field.value !== undefined
    ) {
      const fieldName = addFilterSyntax
        ? "f_" + filterField.field.name
        : filterField.field.name;
      const foundKey = Object.keys(result).find((key) => key === fieldName);
      const foundQueryFilter = queryFilters.find(
        (queryFilter) => queryFilter.field === fieldName
      );
      // Add in_inactive to URL, but should not be included in call to server
      if (
        filterField.field.name === "ind_inactive" &&
        filterField.field.value === null
      ) {
        result[fieldName] = filterField.field.value;
      }
      // Check default value exists
      if (
        filterField.field.value !== null &&
        filterField.field.value !== undefined
      ) {
        // Check queryFilter does not contain null or undefined value (indicator that null is chosen instead of default value)
        if (!foundQueryFilter && !foundKey) {
          result[fieldName] = filterField.field.value;
        }
      }
    }
  });

  return result;
}

// Flatten and sort field types
function getFields(defaultFilter: DefaultFilter) {
  const filterFields: Array<any> = [];
  defaultFilter.fields.forEach((filterField) => {
    if (filterField.field) {
      filterFields.push(filterField);
    }
  });
  const multiSelectFields = filterFields.filter(
    (filterField) => filterField.field?.fieldType?.multiSelect
  );
  const rangeFields = filterFields.filter(
    (filterField) =>
      filterField.field.isRange &&
      filterField.field.isRange === true &&
      filterField.field.isDeviation !== true
  );
  const deviationFields = filterFields.filter(
    (filterField) =>
      filterField.field.isDeviation && filterField.field.isDeviation === true
  );

  return {
    filterFields: filterFields,
    multiSelectFields: multiSelectFields,
    rangeFields: rangeFields,
    deviationFields: deviationFields,
  };
}

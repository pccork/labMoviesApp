import { useState } from "react";
import { sortMovies } from "../util"; 

interface Filter {
    name: string;
    value: string;
    condition: (item: any, value: string) => boolean;
    }

const useFiltering = ( filters: Filter[]) => {
  const [filterValues, setFilterValues] = useState(() => {
    const filterInitialValues = filters.map((f) => ({
      name: f.name,
      value: f.value,
    }));
    return filterInitialValues;
  });

  const [sortOption, setSortOption] = useState("title"); //default sort

  const filteringConditions = filters.map((f) => f.condition);
  const filterFunction = (collection: any) =>
    filteringConditions.reduce((data, conditionFn, index) => {
      return data.filter((item: any) => {
          return conditionFn(item, filterValues[index].value);
      });
    }, collection);

  const sortAndFilter = (collection: any) => {
    const filtered = filterFunction(collection);
    return sortMovies(filtered, sortOption);
  };

  return {
    filterValues,
    setFilterValues,
    filterFunction,
    sortOption,
    setSortOption,
    sortAndFilter,
  };
};

export default useFiltering;

import { useCallback, useMemo } from "react";

export type PaginationOptions = {
  pageSize: number;
  currentPage: number;
  itemCount: number;
};

/**
 * A simple react hook for creating simple pagination systems
 * @param options Options for the pagination
 * @returns pagination context
 */
export default function usePagination(options: PaginationOptions) {
  const totalPages = useMemo(() => {
    return Math.ceil(options.itemCount / options.pageSize);
  }, [options.pageSize, options.itemCount]);

  // Sometimes the page size passed is higher than the item count.
  // For example: if item count is 12, currentPage is 1 and page size is 10
  // then 1st page: [0, 10], 2nd page: [10, 12]
  //                                         ^ 12 not 20!
  const pageSize = useCallback(
    (n: number) => Math.min(options.itemCount, n * options.pageSize),
    [options.itemCount, options.pageSize],
  );

  // Combined into one memoization because of mutual dependencies
  const { startIndex, endIndex } = useMemo(
    () => ({
      startIndex: pageSize(options.currentPage),
      endIndex: pageSize(options.currentPage + 1),
    }),
    [options.currentPage, pageSize],
  );

  const hasNextPage = useMemo(() => {
    // endIndex should never exceed options.itemCount
    return endIndex < options.itemCount;
  }, [endIndex, options.itemCount]);

  const hasPreviousPage = useMemo(() => {
    return options.currentPage !== 0;
  }, [options.currentPage]);

  return {
    totalPages,
    startIndex,
    endIndex,
    hasPreviousPage,
    hasNextPage,
  };
}

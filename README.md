# React pagination

A simple React hook for creating pagination systems

This package makes no assumptions about your styling or ui, it works in React native as well.

## Installation

```sh
npm i pagination-hook
```

## Usage

```tsx
function Component() {
  const items = [1, 2, 3, 4, 5]; // use your own items

  // You're in control of the current page
  const [currentPage, setCurrentPage] = useState(0);
  const { startIndex, endIndex, hasPreviousPage, hasNextPage } = usePagination({
    pageSize: 3, // number of items per page
    currentPage,
    itemCount: items.length,
  });

  // Example controls
  return (
    <>
      <button
        disabled={!hasPreviousPage}
        onClick={() => setCurrentPage((p) => p - 1)}
      >
        prev
      </button>
      <div>Current Page: {currentPage + 1}</div>
      <button
        disabled={!hasNextPage}
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        next
      </button>

      {items.slice(startIndex, endIndex).map((v) => (
        <div key={v}>item: {v}</div>
      ))}
    </>
  );
}
```

import type { FC } from "react";

interface IPagination {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export const Pagination:FC<IPagination> = ({ totalPages, currentPage, onPageChange, maxVisiblePages = 5 }) => {
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 my-4">

      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        {"<"}
      </button>

      {visiblePages[0] > 1 && <span className="px-3 py-1.5">...</span>}

      {visiblePages.map((item) => (
        <button
          key={item}
          onClick={() => onPageChange(item)}
          className={`px-3 py-1.5 rounded border transition-colors ${
            currentPage === item ? "bg-amber-400 border-amber-400 text-white" : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {item}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && <span className="px-3 py-1.5">...</span>}

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        {">"}
      </button>
    </div>
  );
};

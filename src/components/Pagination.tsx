interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, handlePageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-5">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-7 bg-white border rounded-full mr-2"
      >
        <img src="/assets/Prev.svg" className="w-[15px]" alt="Previous" />
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        if (pageNumber > currentPage - 2 && pageNumber < currentPage + 2) {
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-8 py-6 text border rounded-full mr-2 ${
                currentPage === pageNumber ? 'bg-[#FEAF00] text-white' : 'bg-white'
              }`}
            >
              {pageNumber}
            </button>
          );
        }
        if (pageNumber === 1 || pageNumber === totalPages) {
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-8 py-6 text border rounded-full mr-2 ${
                currentPage === pageNumber ? 'bg-[#FEAF00] text-white' : 'bg-white'
              }`}
            >
              {pageNumber}
            </button>
          );
        }
        if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
          return (
            <div key={pageNumber} className="mx-2 flex items-center justify-center">
              ...
            </div>
          );
        }
        return null;
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-7 py-5 bg-white border rounded-full mr-2"
      >
        <img src="/assets/Next.svg" alt="Next" />
      </button>
    </div>
  );
};

export default Pagination;

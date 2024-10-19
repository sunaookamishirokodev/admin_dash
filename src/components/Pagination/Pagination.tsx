interface Props {
  totalOfPage: number
  totalAllPage: number
  currentPage: number
  onChangePage: (numberPage: number) => void
}

export default function Pagination({ totalOfPage, totalAllPage, currentPage, onChangePage }: Props) {
  const totalPage = Math.ceil(totalAllPage / totalOfPage) // 7 / 5 = 2 page

  const prevPage = (index: number) => {
    const numberPage = index

    if (numberPage === 0) {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChangePage && onChangePage(numberPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const nextPage = (index: number) => {
    const numberPage = index

    console.log("click")
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChangePage && onChangePage(numberPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleChangePage = (index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChangePage && onChangePage(index)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const listPage = Array(totalPage)
    .fill(0)
    .map((_, index) => {
      return (
        <div key={index} className="flex items-center">
          <button
            onClick={() => handleChangePage(index + 1)}
            className={`w-[40px] h-[40px] text-whiteColor hover:opacity-50 duration-200 ${currentPage === index + 1 ? "bg-gray-300" : "bg-[#f2f2f2]"}`}
          >
            {index + 1}
          </button>
        </div>
      )
    })

  return (
    <div className="pt-5">
      <div className="flex items-center justify-center">
        <button
          onClick={() => prevPage(currentPage - 1)}
          disabled={currentPage === 0}
          className={`${currentPage === 1 ? "cursor-not-allowed" : ""} flex items-center justify-center gap-2 bg-[#f2f2f2] w-[40px] h-[40px] text-textColor hover:opacity-50 duration-200`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        {listPage}
        <button
          onClick={() => nextPage(currentPage + 1)}
          disabled={currentPage === totalPage}
          className={`${currentPage === totalPage ? "cursor-not-allowed" : ""} flex items-center justify-center gap-2 bg-[#f2f2f2] w-[40px] h-[40px] text-textColor hover:opacity-50 duration-200`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

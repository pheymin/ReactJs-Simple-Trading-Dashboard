import React from 'react'
import './index.css'

const Pagination = ({
    totalItems,
    itemsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i);
    }

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const handleArrowClick = (direction) => {
        const offset = direction === "prev" ? -1 : 1;
        const index = pages.indexOf(currentPage);
        const newPages = pages.slice(index + offset, index + offset + 5);
        setCurrentPage(newPages[0]);
    };

    return (
        <div className="pagination">
            <button
                className='arrow'
                onClick={() => handleArrowClick("prev")}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {pages.filter((page) => {
                const index = pages.indexOf(page);
                return index >= pages.indexOf(currentPage) - 2 && index <= pages.indexOf(currentPage) + 2;
            })
                .map((page, index) => (
                    <button
                        key={index}
                        id="page-btn"
                        onClick={() => handleClick(page)}
                        className={page === currentPage ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}
            <button
                className='arrow'
                onClick={() => handleArrowClick("next")}
                disabled={currentPage === pages[pages.length - 1]}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination

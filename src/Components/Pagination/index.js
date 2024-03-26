import React from "react";
import "./pagination.css"
const Pagination = ({currentPage, paginate, totalPages}) => {
    return(
        <div className="pagination">
            <button
                className="navigate-btn"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <img src="backward.png" alt="backward" className="navigate-position" />
            </button>
            <div>{currentPage}</div>
            <button
                className="navigate-btn"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <img src="forward.png" alt="forward" className="navigate-position" />
            </button>
        </div>
    )
}
export default Pagination;
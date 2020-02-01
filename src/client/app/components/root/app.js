import React, { useState } from 'react';
import Pagination from 'react-pagination-lite';

const PaginationDemo = () => {
    const [activePage, setActivePage] = useState(1);

    return (
        <div className="pagination-container">
            <Pagination
                range={3}
                activePage={activePage}
                totalCount={27}
                itemsPerPage={5}
                onPaginate={pageId => {
                    setActivePage(pageId);
                }}
            />
        </div>
    );
};
export default PaginationDemo;

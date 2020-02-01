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
                styles={{
                    navigationBtns: {
                        activeIconColor: '#000',
                        inactiveIconColor: '#b5b5b5',
                        borderColor: '#eeeeee'
                    },
                    paginationCells: {
                        padding: '0 12px',
                        activeBgColor: '#92a772',
                        inactiveBgColor: '#f2f2f2',
                        textColor: '#000000'
                    }
                }}
            />
        </div>
    );
};
export default PaginationDemo;

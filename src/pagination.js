import React, { useState } from 'react';
import { render } from 'react-dom';
import Pagination from 'react-pagination-lite';

const PaginationDemo = () => {
    const [activePage, setActivePage] = useState(1);

    return (
        <Pagination
            range={3}
            activePage={activePage}
            totalCount={27}
            itemsPerPage={5}
            onPaginate={pageId => {
                setActivePage(pageId);
            }}
        />
    );
};

render(<PaginationDemo />, document.getElementById('root'));

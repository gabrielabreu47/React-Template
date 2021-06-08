import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { get } from 'services';

const PaginationComponent = ({
    controller, 
    currentPage = 1,
    perPage = 10,
    paginationDisplayedLimit = 3,
    orderBy = 'Id desc',
    onDataLoaded = () => {},
}) => {

    const [_totalPagination, _setTotalPagination] = useState(0);
    const [_paginationNumbersDisplayed, _setPaginationNumbersDisplayed] = useState(paginationDisplayedLimit);
    const [_totalRows, _setTotalRows] = useState([]);
    const [_displayRows, _setDisplayRows] = useState([]);
    const [_currentPage, _setCurrentPage] = useState(currentPage);
    
    useEffect(() => {
        (async function mounted() {
            await calculatePages();
        })();
        return function cleanup() {
            _setTotalRows([]);
        };
    }, [_currentPage]);

    const calculatePages = async () => {
        const skip = (perPage * (_currentPage - 1));
        const endpoint = controller + `?$orderby=${orderBy}&$top=${perPage}&$skip=${skip}&$count=true`;
        const response = await get(endpoint);
        const totalPagination = Math.ceil(response.data.count / perPage);
        resolveData(totalPagination, response.data.data);
    }

    const resolveData = (totalPagination, data) => {
        onDataLoaded(data);
        _setTotalPagination(totalPagination);
        const totalRows = generatePaginationRows(totalPagination);
        if (_displayRows.length == 0 && totalRows.length > _paginationNumbersDisplayed) {
            const displayNumbers = totalRows.slice(0, _paginationNumbersDisplayed);
            _setDisplayRows(displayNumbers);
        }
        _setTotalRows(totalRows);
    }

    const generatePaginationRows = (limit) => {
        let arr = [];
        for (let i = 0; i < limit; i++) {
            arr.push(i + 1);
        }
        return arr;
    }

    const onNextPageClicked = (newCurrentPage) => {
        if (!_displayRows.some(x => x >= newCurrentPage)) {
            const startIndex =  _totalRows.indexOf(newCurrentPage);
            const displayNumbers = _totalRows.slice(startIndex, startIndex + _paginationNumbersDisplayed);
            _setDisplayRows(displayNumbers);
        }
        _setCurrentPage(newCurrentPage);
    }

    const onBeforePageClicked = (newCurrentPage) => {
        if (!_displayRows.some(x => x <= newCurrentPage)) {
            const startIndex =  (_totalRows.indexOf(newCurrentPage) - _paginationNumbersDisplayed) + 1;
            const endIndex = startIndex + _paginationNumbersDisplayed;
            let displayNumbers = _totalRows.slice(startIndex, endIndex);
            _setDisplayRows(displayNumbers);
        }
        _setCurrentPage(newCurrentPage);
    }

    return (
        <>
            <Pagination>
                <Pagination.Prev disabled={_currentPage === 1} onClick={() => { onBeforePageClicked(_currentPage - 1); }}/>
                {
                    _displayRows.map((iteration) => {
                        return (
                            <Pagination.Item onClick={() => { _setCurrentPage(iteration); }} key={iteration} active={_currentPage === iteration}> {iteration} </Pagination.Item>
                        )
                    })
                }
                <Pagination.Next disabled={_currentPage === _totalPagination} onClick={() => { onNextPageClicked(_currentPage + 1); }}/>
            </Pagination>
        </>
    );
};

export default PaginationComponent;
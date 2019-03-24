import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';


const propTypes = {
    items: PropTypes.array.isRequired,
    onPageChange: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 10
}
class Pagination extends Component{
    constructor(props){
        super(props);

        this.state = {
            pager: {}
        }
    }

    componentWillMount(){
        // set page if item array is null

        if(this.props.items && this.props.items.length){
            this.setPage(this.props.initialPage);
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    // componentDidUpdate(prevProps,prevState){
    //     // reset page if items array has changed
    //     if(this.prop.items !== prevProps.items){
    //         this.setState(this.props.initialPage);
    //     }
    // }

    setPage(page){
        let {items, pageSize } = this.props;

        let pager = this.state.pager;

        if(page < 1 || page > pager.totalPages ){
            return;
        }
        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);

        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state

        this.setState({
            pager:pager
        });

        // call change page function in app component/file
        this.props.onPageChange(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize){
        // default to first page

        currentPage = currentPage || 1;

        // default page size is 10

        pageSize = pageSize || 10;

        // calculate total pages
        
        const totalPages = Math.ceil(totalItems/pageSize);

        var startPage, endPage;

        if(totalPages <= 10){
            // less than 10 total pages so show all

            startPage = 1;
            endPage = totalPages;
        } else{
            // more than 10 pages, calculate start and end pages
            if(currentPage <= 6){
                startPage = 1;
                endPage = 10;
            }

            else if(currentPage + 4 >= totalPages){
                startPage = totalPages - 9;
                endPage = totalPages;

            }else{
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }


        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to repeat in the pager control
        const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };

    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (



            // trying to use this logic below in Pagination
            
            // <ul className="pagination">
            //     <li className={pager.currentPage === 1 ? 'disabled' : ''}>
            //         <a href="#" onClick={() => this.setPage(1)}>First</a>
            //     </li>
            //     <li className={pager.currentPage === 1 ? 'disabled' : ''}>
            //         <a href="#" onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
            //     </li>
            //     {pager.pages.map((page, index) =>
            //         <li key={index} className={pager.currentPage === page ? 'active' : ''}>
            //             <a href="#" onClick={() => this.setPage(page)}>{page}</a>
            //         </li>
            //     )}
            //     <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
            //         <a href="#" onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
            //     </li>
            //     <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
            //         <a href="#" onClick={() => this.setPage(pager.totalPages)}>Last</a>
            //     </li>
            // </ul>

            // what i have so far
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pager.pages.length}
                rowsPerPage={10}
                page={() => this.setPage(pager.currentPage - 1)}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={() => this.setPage(pager.currentPage + 1)}
                // onChangeRowsPerPage={() => this.setPage(pager.totalPages)}
            />

        );
    }

}
Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
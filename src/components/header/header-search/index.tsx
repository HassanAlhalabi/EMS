import { useState } from "react";
import { Fade, Form } from "react-bootstrap";
import SearchResult from "./search-result";

const HeaderSearch = () => {

    const [searching, setSearching] = useState(false);

    const handleSearchingStart = () => setSearching(true);
    const handleSearchingEnd = () => setSearching(false);

    return (
        <div className="search-box">
            <Form className="position-relative">
                <Form.Control 
                    className="search-input fuzzy-search" 
                    type="search" 
                    placeholder="Search..." 
                    aria-label="Search" 
                    onFocus={handleSearchingStart} 
                    onBlur={handleSearchingEnd}/>
                        <span className="fas fa-search search-box-icon"></span> 
            </Form>
            <Fade in={searching}>
                <div 
                    className="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none"
                    onClick={handleSearchingEnd}>
                    <div className="btn-close-falcon" aria-label="Close"></div>
                </div>
            </Fade>
            <Fade in={searching}>
                <div className="dropdown-menu border font-base start-0 mt-2 py-0 overflow-hidden w-100">
                    <div className="scrollbar list pb-3" style={{maxHeight: '24rem'}}>

                        <SearchResult id="1" title="Anna Karen" image="imagelink" />
                        <SearchResult id="1" title="Anna Karen" image="imagelink" />
                        <SearchResult id="1" title="Anna Karen" image="imagelink" />


                    </div>
                    <div className="text-center mt-n3">
                        <p className="fallback fw-bold fs-1 d-none">No Result Found.</p>
                    </div>
                </div>  
            </Fade>
     
        </div>
    )
}

export default HeaderSearch

import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import data from "../books.json"

import "./SearchBar.css";

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([])
    const [selectedItem, setSelectedItem] = useState(-1)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleClose = (e) => {
        setSearch("");
        setSearchData([])
        setSelectedItem(-1)
    }

    const handlekeyDown = (e) => {
        if(selectedItem < searchData.length){
            if(e.key === "ArrowUp" && selectedItem > 0){
                setSelectedItem(prev => prev - 1)
            }
            else if(e.key === "ArrowDown" && selectedItem < searchData.length-1){
                setSelectedItem(prev => prev + 1)
            }
            else if(e.key === "Enter" && selectedItem>=0){
                window.open(searchData[selectedItem].show.url)
            }

            //Existing Data
            // else if(e.key === "Enter" && selectedItem>=0){
            //     window.open(searchData[selectedItem].link)
            // }
        }else{
            setSelectedItem(-1)
        }
    }

    useEffect(()=> {
        if(search!==""){
            fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
            .then((res)=> res.json())
            .then((data)=> setSearchData(data))

            //Existing data
            // const newFilterData = data.filter(book => {
            //     return book.title.toLowerCase().includes(search.toLowerCase())
            // })
            // setSearchData(newFilterData)
        }else{
            setSearchData([])
        }
    },[search])


    return (
        <section className='search_section'>
            <div className='search_input_div'>
                <input
                    type='text'
                    className='search_input'
                    placeholder='Search...'
                    autoComplete='off'
                    value={search}
                    onChange={handleChange}
                    onKeyDown={handlekeyDown}
                />
                <div className='search_icon'>
                    {search=="" ? <SearchIcon /> : <CloseIcon onClick={handleClose} />}                    
                </div>
            </div>
            <div className='search_result'>
                {searchData.map((el, i)=> {
                    return <a 
                                href={el.show.url} 
                                key={i} 
                                target='_blank' 
                                className={selectedItem === i 
                                ? "search_suggestion_line active" 
                                : "search_suggestion_line"}>
                                {el.show.name}
                            </a>                   
                })}
            
                 {/* Existing data*/}
                {/* {searchData.slice(0,10).map((el, i)=> {
                    return <a 
                                href={el.link} 
                                key={i} 
                                target='_blank' 
                                className={selectedItem === i 
                                ? "search_suggestion_line active" 
                                : "search_suggestion_line"}>
                                {el.title}
                            </a>              
                })} */}
            </div>
        </section>
    );
};

export default SearchBar;

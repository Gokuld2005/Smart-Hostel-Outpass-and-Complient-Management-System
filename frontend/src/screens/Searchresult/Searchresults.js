
import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import axios from 'axios';
import List from './List';


const Searchresults = () => {

    const [data, setdata] = useState([])
    // fetch notes which is from backend
    const userInfo = localStorage.getItem("userInfo"); 
    const fetchData = async () => {
        // putting { } around data variable means we are destructuring it to get the exact data 
        const { data } = await axios.get("http://localhost:5000/api/data");
        setdata(data);
    }
    // useeffect is used to get the notes data after page is rendered 
    useEffect(() => {
        fetchData()
    }, [])


    // search functionality 
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };


    return (
        <>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
            <List input={inputText} />
            

        </>
    )
}

export default Searchresults

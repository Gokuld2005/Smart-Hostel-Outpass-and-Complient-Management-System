
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Outpass from '../../components/Outpass';


const List = (props) => {

    const [data, setdata] = useState([])
    // fetch notes which is from backend 
    const fetchData = async () => {
        // putting { } around data variable means we are destructuring it to get the exact data 
        const { data } = await axios.get("http://localhost:5000/api/data");
        setdata(data);
    }
    // useeffect is used to get the notes data after page is rendered 
    useEffect(() => {
        fetchData()
    }, [])


    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(props.input)
        }
    })


    return (
        <>
            {filteredData.map((data) => (
                < Outpass
                    // searchText={inputText}
                    key={data.id}
                    name={data.name}
                    appdate={data.appdate}
                    fromtime={data.fromtime}
                    totime={data.totime}
                    place={data.place}
                    status={data.status}
                    reason={data.reason}
                    dept={data.dept}
                    year={data.year} />
            ))}
        </>
    )
}

export default List



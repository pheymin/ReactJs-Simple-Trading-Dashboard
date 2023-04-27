import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import PubSub from 'pubsub-js';
import Pagination from '../pagination';

export default function Instruments() {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const dataRef = useRef([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://13.212.255.177/api/priceData/technical-test');
            const data = await response.json();
            const sortedData = data.sort((a, b) => a.Symbol.localeCompare(b.Symbol));
            setData(sortedData);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 2000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if (search !== '') {
            const filtereddata = data.filter(item => item.Symbol.toLowerCase().includes(search.toLowerCase()));
            setData(filtereddata);
        }
    }, [search])

    useEffect(() => {
        //compare previous data with current data
        const latestData = data;
        dataRef.current = latestData;

        //update Spread Table
        PubSub.publish('data', data);

    }, [data])

    //pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    //row
    let redArrow = <span style={{ color: "red", width: 30 }}>↓</span>
    let greenArrow = <span style={{ color: "green", width: 30 }}>↑</span>

    const renderData = currentItems.map((item, index) => {
        const prevData = dataRef.current;

        const isBidHigher = parseFloat(item.Bid) > parseFloat(prevData[index]?.Bid);
        const isAskHigher = parseFloat(item.Ask) > parseFloat(prevData[index]?.Ask);

        const bidClass = isBidHigher ? 'green' : 'red';
        const askClass = isAskHigher ? 'green' : 'red';
        return (
            <tr key={index}>
                <td id='first-row'>
                    <div>
                        {isAskHigher ? greenArrow : redArrow}
                        <span>{item.Symbol}</span>
                    </div>
                </td>
                <td className={bidClass}>{parseFloat(item.Bid).toFixed(2)}</td>
                <td className={askClass}>{parseFloat(item.Ask).toFixed(2)}</td>
                <td className={item.DailyChange > 0 ? 'red' : 'green'} >{parseFloat(item.DailyChange).toFixed(2)}</td>
            </tr>
        )
    });

    return (
        <div id='instument-container' className='container'>
            <div id='header-container' className='flex'>
                <h4>Instruments</h4>
                <input type="text" onChange={e => setSearch(e.target.value)} placeholder='Search' />
            </div>
            <table>
                <thead>
                    <tr>
                        <th className='first-row'>Symbol</th>
                        <th>Bid</th>
                        <th>Ask</th>
                        <th>Daily Change</th>
                    </tr>
                </thead>
                <tbody>
                    {renderData}
                </tbody>
            </table>
            <Pagination
                totalItems={data.length}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage} />
        </div>
    )
}

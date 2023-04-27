import React, { useEffect, useState } from 'react'
import './index.css'
import PubSub from 'pubsub-js';

export default function SpreadTable() {
    const [data, setData] = useState([]);
    const [highestSpread, setHighestSpread] = useState(0);
    const [highestSpreadCurrency, setHighestSpreadCurrency] = useState("");
    const [lowestSpread, setLowestSpread] = useState(0);
    const [lowestSpreadCurrency, setLowestSpreadCurrency] = useState("");

    useEffect(() => {
        PubSub.subscribe('data', (_, data) => {
            setData(data);
        })
    }, [])

    useEffect(() => {
        data.forEach(item => {
          if (item.Spread > highestSpread) {
            setHighestSpread(parseFloat(item.Spread).toFixed(2));
            setHighestSpreadCurrency(item.Symbol);
          }
          if (item.Spread < lowestSpread) {
            setLowestSpread(parseFloat(item.Spread).toFixed(2));
            setLowestSpreadCurrency(item.Symbol);
          }
        });
      }, [data]);

    return (
        <div className='container st-container'>
            <h3>Spread Table</h3>
            <div className='details'>
                <h4>The highest spread curency pair</h4>
                <p>{highestSpreadCurrency} = {highestSpread}</p>
            </div>
            <div className='details'>
                <h4>The lowest spread curency pair</h4>
                <p>{lowestSpreadCurrency} = {lowestSpread}</p>
            </div>
        </div>
    )
}

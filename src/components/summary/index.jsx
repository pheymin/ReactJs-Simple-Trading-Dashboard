import React from 'react'
import './index.css'

export default function Summary() {

    const data = [
        {
            "title": "TOTAL TRAFFIC",
            "value": "123,456",
            "icon": "/src/assets/Group 17.png"
        },
        {
            "title": "NEW USERS",
            "value": "2,345",
            "icon": "/src/assets/Group -1.png"
        },
        {
            "title": "SALES",
            "value": "924",
            "icon": "/src/assets/Group -2.png"
        },
        {
            "title": "PERFORMANCE",
            "value": "48.65%",
            "icon": "/src/assets/Group -3.png"
        },
    ]

    return (
        <div className='summary-container'>
            {data.map((item) => {
                return (
                    <div key={item.title} className='container summary-card'>
                        <div className='summary-data'>
                            <h6>{item.title}</h6>
                            <h4>{item.value}</h4>
                        </div>
                        <img src={item.icon} alt="icon" />
                    </div>
                )
            })}
        </div>
    )
}

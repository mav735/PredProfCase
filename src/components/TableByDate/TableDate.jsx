import React, { useState, useEffect } from 'react';
import './dsg.css';
import '../NavigationBar/Navigation'
import Navigation from "../NavigationBar/Navigation";

function Cell({ room, light, onClick }) {
    const cellColor = light === 1 ? 'yellow' : 'white';

    return (
        <div className="cell" style={{ backgroundColor: cellColor }} onClick={onClick}>
            {room}
        </div>
    );
}


function TableDate() {
    const [date, setDate] = useState(""); // State to store selected date
    const [data, setData] = useState([]); // State to store fetched data
    const [list, setlst] = useState([]); // State to store fetched data
    const [le, setle] = useState(0); // State to store fetched data

    useEffect(() => {
        if (date) {
            // Fetch data from the URL based on selected date
            fetch(`http://127.0.0.1:5000/?date=${date}`)
                .then(response => {
                    // Check if response is successful (status code 200)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Parse response as JSON
                    return response.json();
                })
                .then(data => {
                    // Access the element at index 1
                    const initialData = data[1];
                     setle(data[4]);
                    setlst(data[5]);
                    console.log(data[5]);
                    console.log(initialData); // Log the element at index 1
                    setData(initialData); // Set state with the fetched data
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    }, [date]); // Execute effect when 'date' state changes

    const handleCellClick = (floorIndex, rowIndex, cellIndex) => {
        let newData = [...data];
        newData[floorIndex][`floor_${rowIndex + 1}`][cellIndex]['light'] = newData[floorIndex][`floor_${rowIndex + 1}`][cellIndex]['light'] === 0 ? 1 : 0;
        setData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

    };

    return (
        <div>
            <Navigation />
            <section className="py-5">
                <div className="container py-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <p className="fw-bold text-success mb-2">Просмотр вктивности в окнах аудиторий</p>
                            <h2 className="fw-bold">Схема окон</h2>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="TableForPost text-center mx-auto">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <button type="submit">Submit</button>
                            </form>
                            {data.map((floor, floorIndex) => (
                                <div key={floorIndex} className="floor">
                                    {Object.keys(floor).map((floorName, rowIndex) => (
                                        <div key={rowIndex} className="row">
                                            {floor[floorName].map((cellData, cellIndex) => (
                                                <Cell
                                                    key={cellIndex}
                                                    room={cellData.room}
                                                    light={cellData.light}
                                                    onClick={() => handleCellClick(floorIndex, rowIndex, cellIndex)}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <h4>Количество комнат {le}</h4>
                        <h4>Коменаты с горящим светом {list.map(v => `${v}, `)}</h4>

                    </div>
                </div>
            </section>
            <footer className="bg-primary-gradient"></footer>
        </div>
    );
}

export default TableDate;

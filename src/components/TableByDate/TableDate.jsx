import React, { useState } from 'react';
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
    const initialData = [
        {
            'floor_1': [
                {'light': 0, 'room': 1},
                {'light': 1, 'room': 1},
                {'light': 0, 'room': 1},
                {'light': 1, 'room': 2},
                {'light': 0, 'room': 2},
                {'light': 0, 'room': 3}
            ],
            'floor_2': [
                {'light': 1, 'room': 4},
                {'light': 0, 'room': 4},
                {'light': 1, 'room': 4},
                {'light': 0, 'room': 5},
                {'light': 0, 'room': 5},
                {'light': 1, 'room': 6}
            ]
        }
    ];

    const [data, setData] = useState(initialData);

    const handleCellClick = (floorIndex, rowIndex, cellIndex) => {
        let newData = [...data]
        newData[floorIndex][`floor_${rowIndex + 1}`][cellIndex]['light'] = newData[floorIndex][`floor_${rowIndex + 1}`][cellIndex]['light'] === 0 ? 1 : 0
        setData(newData)
    };

    return (
        <div>
            <Navigation/>
            <section className="py-5">
                <div className="container py-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <p className="fw-bold text-success mb-2">Просмотр вктивности в окнах аудиторий</p>
                            <h2 className="fw-bold">Схема окон</h2>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="TableForPost col-md-2 col-xl-9 text-center mx-auto">
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
                    </div>
                </div>
            </section>
            <footer className="bg-primary-gradient"></footer>
        </div>

    );
}

export default TableDate;

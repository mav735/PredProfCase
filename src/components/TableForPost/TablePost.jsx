import React, { useState } from 'react';
import '../TableByDate/dsg.css';
import Navigation from "../NavigationBar/Navigation";
import data from "bootstrap/js/src/dom/data";

function Cell({ room, light, onClick }) {
    const cellColor = light === 1 ? 'yellow' : 'white';

    return (
        <div className="cell" style={{ backgroundColor: cellColor }} onClick={onClick}>
            {room}
        </div>
    );
}

function RoomInput({ onSubmit }) {
    const [numFloors, setNumFloors] = useState('');
    const [numRooms, setNumRooms] = useState('');
    const [numWindows, setNumWindows] = useState('');
    const [roomWindows, setRoomWindows] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const windowsArray = numWindows.split(',').map((window) => parseInt(window.trim()));

        const data = {};
        for (let floor = 1; floor <= parseInt(numFloors); floor++) {
            const floorData = [];
            for (let room = 1; room <= parseInt(numRooms); room++) {
                for (let window = 1; window <= windowsArray[room - 1]; window++) {
                    floorData.push({ light: 0, room: room + (floor - 1) * numRooms });
                }
            }
            data[`floor_${floor}`] = floorData;
        }

        onSubmit([data]);
    };

    return (
        <div>
            <h2>Enter Room Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="numFloors">Number of Floors:</label>
                    <input type="number" id="numFloors" value={numFloors} onChange={(e) => setNumFloors(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="numRooms">Number of Rooms on Each Floor:</label>
                    <input type="number" id="numRooms" value={numRooms} onChange={(e) => setNumRooms(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="numWindows">Number of Windows for Each Room (comma separated):</label>
                    <input type="text" id="numWindows" value={numWindows} onChange={(e) => setNumWindows(e.target.value)} />
                </div>
                <button type="submit">Generate Data</button>
            </form>
        </div>
    );
}

function TableItem({ initialData }) {
    const [data, setData] = useState(initialData);

    const handleCellClick = (floorIndex, rowIndex, cellIndex) => {
        let newData = [...data]
        newData[floorIndex][`floor_${rowIndex + 1}`][cellIndex]['light'] = newData[floorIndex][`floor_${rowIndex + 1}`][cellIndex]['light'] === 0 ? 1 : 0
        setData(newData)
    };

    return (
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
    );
}

function App() {
    const handleSubmit = (data) => {
        console.log(data);

        return (
            <div>
                <Navigation/>
                <section className="py-5">
                    <div className="container py-5">
                        <div className="row mb-5">
                            <div className="col-md-8 col-xl-6 text-center mx-auto">
                                <p className="fw-bold text-success mb-2">Добавление данных об активности</p>
                                <h2 className="fw-bold">Схема окон</h2>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <RoomInput onSubmit={handleSubmit}/>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <TableItem initialData={data}></TableItem>
                        </div>
                    </div>
                </section>
                <footer className="bg-primary-gradient"></footer>
            </div>)

    };
    return (
        <div>
            <Navigation/>
            <section className="py-5">
                <div className="container py-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <p className="fw-bold text-success mb-2">Добавление данных об активности</p>
                            <h2 className="fw-bold">Схема окон</h2>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <RoomInput onSubmit={handleSubmit}/>
                    </div>
                    <div className="row d-flex justify-content-center">

                    </div>
                </div>
            </section>
            <footer className="bg-primary-gradient"></footer>
        </div>
    );
}

export default App;

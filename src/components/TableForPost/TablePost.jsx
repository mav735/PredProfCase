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
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const windowsArray = numWindows.split(',').map((window) => parseInt(window.trim()));

        const data = [];
        for (let floor = parseInt(numFloors); floor >= 1; floor--) {
            const floorData = [];
            for (let room = 1; room <= parseInt(numRooms); room++) {
                for (let window = 1; window <= windowsArray[room - 1]; window++) {
                    floorData.push({ light: 0, room: room + (floor - 1) * numRooms });
                }
            }
            data.push({ [`floor_${floor}`]: floorData });

        }

        onSubmit([{...Object.assign({}, ...data) }, date]);
    };

    return (
        <div>
            <h2>Enter Room Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
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

function TableItem({ initialData, date }) {
    const [data, setData] = useState(initialData);

    const handleCellClick = (floorIndex, rowIndex, cellIndex) => {
        let newData = [...data]
        let counter = 0;
        Object.keys(data[0]).map(x => counter += 1)
        newData[floorIndex][`floor_${counter - rowIndex}`][cellIndex]['light'] = newData[floorIndex][`floor_${counter - rowIndex}`][cellIndex]['light'] === 0 ? 1 : 0
        setData(newData)
    };

    const sendDataToAPI = (data, date) => {
        // Example API call
        fetch('https://localhost:5000/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"date": date, "floors": data}),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data sent to API:', data);
            })
            .catch(error => {
                console.error('Error sending data to API:', error);
            });
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
            <button onClick={() => sendDataToAPI({data}, {date})}>Send Data to API</button>
        </div>
    );
}

function App() {

    const handleSubmit = (data) => {
        console.log(data);
        setPage((<div>
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
                        <TableItem initialData={[data[0]]} date={data[1]}></TableItem>
                    </div>
                </div>
            </section>
            <footer className="bg-primary-gradient"></footer>
        </div>))
    };

    const [page, setPage] = useState((
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
    ));



    return page
}

export default App;

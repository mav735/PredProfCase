import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/css/aos.min.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TablePost from "./components/TableForPost/TablePost";
import TableDate from "./components/TableByDate/TableDate";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" forceRefresh={true} exact element={<TableDate />}></Route>
                <Route path="/table_post" forceRefresh={true} exact element={<TablePost/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

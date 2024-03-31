import React from "react";
import './style.css';
const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-shrink py-3 navbar-light" id="mainNav">
            <div className="container"><a className="navbar-brand d-flex align-items-center" href="/#"> </a>
                <button
                    data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span
                    className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item active"><a href="/">Информация по комнатам</a></li>
                        <li className="nav-item"><a href="/table_post">Добавление информация</a></li>
                    </ul>
                </div>
            </div>
        </nav>);
};

export default Navigation;
import React from 'react';
import "../App.css";


export default function Toast (props) {
    return (
        <main className="toast_container">

            <div className="toast_block">
                <p>Do you really want to delete?</p>
                <button className="toast_button">Yes</button>
                <button className="toast_button">No</button>

            </div>

        </main>
    )
}


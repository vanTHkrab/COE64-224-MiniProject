"use client";

import React, { useState } from 'react';
import Header from "@/components/header";

const AboutPage = () => {

    const [count, setCount] = useState(0);

    const [name, setName] = useState("");
    console.log(name)

    // async function handleGetData() {}

    const handleGetData = async () => {
        const resource = await fetch("http://localhost:3000/api/sensor",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });

        const data = await resource.json();
        console.log(data);
    }


    handleGetData().then((data) => {
        console.log(data);
    })
    return (
        <div>
            <Header />
            <p>About Us</p>
            <p>
                {count}
            </p>
                <button onClick={() => setCount(count + 1)}>
                add
            </button>

            <form>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </form>
        </div>
    );
};

export default AboutPage;
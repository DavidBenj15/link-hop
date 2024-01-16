import React, { useState } from 'react';

const HomeComponent = () => {
    const [original, setOriginal] = useState('');
    const [short, setShort] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        // prevent page reload on submit
        e.preventDefault();

        try {
            // make POST request to server
            const response = await fetch('http://localhost:5000/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ original, short })
            });

            if (response.ok) {
                // if response is ok
                // TODO: clear form and display success message
                console.log(`Added ${original} as ${short}`);
            } else {
                // if response is not ok
                const errorMessage = await response.text();
                console.error(`Failed to add ${original} as ${short}: ${errorMessage}`);
                setErrorMessage(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Internal Server Error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'original') {
            setOriginal(value);
        } else if (name === 'short') {
            setShort(value);
        }
    };

    const componentStyle = {
        background: 'white', // white background
        color: '#002D72', // dark blue text color
        padding: '20px', // add padding for spacing
        fontFamily: 'Arial, sans-serif', // change font family
        fontWeight: 'bold', // make text bold
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // set the height of the container to full viewport height
    };

    const hopStyle = {
        color: '#68ACE5', // light blue color
        fontWeight: 'bold', // make text bold
    };

    const sectionStyle = {
        margin: '10px 0', // adjust the margin as needed
        textAlign: 'center', // center the text
    };

    const labelStyle = {
        margin: '10px 0', // add margin between "Alias" and "Shorten!"
        display: 'block', // ensure a line break after the label
        textAlign: 'center', // center the label
        fontWeight: 'bold', // make text bold
    };

    const inputStyle = {
        width: '100%', // make the input field take up full width
        boxSizing: 'border-box', // include padding and border in the width
        margin: '5px 0', // add some margin for spacing
        fontWeight: 'bold', // make text bold
    };

    const buttonStyle = {
        width: '100%', // make the button take up full width
        boxSizing: 'border-box', // include padding and border in the width
        margin: '10px 0', // add margin for spacing
        height: '50px', // set the height of the button
        backgroundColor: '#002D72', // set the background color to the light blue
        color: 'white', // set the text color to white
        fontWeight: 'bold', // make text bold
        borderRadius: '10px', // round the edges
    };

    const logoStyle = {
        width: '50px', // set the width of the logo
        marginBottom: '10px', // add margin at the bottom
    };

    return (
        <div style={componentStyle}>
            <img src={require('./image.png')} alt="Logo" style={logoStyle} />
            <h1>
                Link<span style={hopStyle}>Hop</span>
            </h1>
            <p>
                1. Enter the original URL in the "Original URL" field.<br />
                2. Provide a custom alias in the "Alias" field.<br />
                3. Click the button below to generate the shortened URL. 
            </p>
            <form onSubmit={handleSubmit} style={sectionStyle}>
                <label style={labelStyle}>
                    Original URL:
                    <input
                        type="text"
                        name="original"
                        value={original}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Alias:
                    <input
                        type="text"
                        name="short"
                        value={short}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </label>
                <button type="submit" style={buttonStyle}>
                    SHORTEN LINK
                </button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default HomeComponent;

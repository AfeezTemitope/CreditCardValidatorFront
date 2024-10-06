import React, { useState } from 'react';
import './CreditCard.css';
import Card from './assets/27554.png'

const CardValidator = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('');

const validateCard = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ card_number: cardNumber })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        setCardType(data.card_type);
        alert(`Your card is: ${data.card_type}`);
        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to validate card: ' + error.message);
        window.location.reload();
    }
};


    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            validateCard();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateCard();
    };

    return (
        <div className="card-validator">
            <img className="card" src={Card} alt="card"/>
            <h1>Credit Card Validator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter card number"
                    onKeyUp={handleKeyUp}
                />
                <button type="submit">Validate Card</button>
            </form>
        </div>
    );
}

export default CardValidator;

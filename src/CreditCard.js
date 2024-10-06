import React, { useState } from 'react';
import './CreditCard.css';
import Card from './assets/27554.png';
import Modal from './components/Modal';

const CardValidator = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            setIsModalOpen(true);
            setTimeout( ()=> {
                window.location.reload();
            }, 3000)
        } catch (error) {
            console.error('Error:', error);
            setCardType('Failed to validate card: ' + error.message);
            setIsModalOpen(true);
            setTimeout(()=>{
            window.location.reload();
            }, 3000)
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
            <img className="card" src={Card} alt="card" />
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
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={`Your card is: ${cardType}`}
            />
        </div>
    );
};

export default CardValidator;

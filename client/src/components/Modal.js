import { useState } from 'react';

function Modal({ onSubmit }) {
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={() => onSubmit(inputValue)}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;

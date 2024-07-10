import React, { useState } from 'react';
import styles from '../styles/Button.module.css';
import Modal from './Modal';
import infoIcon from './resources/info-icon.png';

const InfoButton = () => {
    const buttonStyle = {
        padding: 15,
        width: '90px'
    }
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div>
            <button style={buttonStyle} className={styles.button} onClick={() => setIsOpen(true)}>
                <img width='20' src={infoIcon} alt='info'/>
            </button>
            <Modal open={isOpen} 
                onClose={() => setIsOpen(false)} >
            </Modal>
        </div>

    );
}

export default InfoButton;
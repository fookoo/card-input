import React, { useEffect, useRef, useState } from 'react';
import { formatCreditCardNumber, formatNumber, getCreditCardType, ICreditCard } from '../../services/card.service';

import './CardInput.component.scss';

export interface ICardInputProps {
    onSubmitReady?: (card: ICreditCard) => void;
}

const currentYear = Number(
    String(new Date().getFullYear())
        .split('')
        .slice(-2)
        .join('')
    );

const CardInput: React.FC<ICardInputProps> = ({ onSubmitReady }) => {
    const inputField = useRef<HTMLInputElement>(null);
    const monthField = useRef<HTMLInputElement>(null);
    const yearField = useRef<HTMLInputElement>(null);
    const cvcField = useRef<HTMLInputElement>(null);

    const [number, setNumber] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvc, setCVC] = useState('');
    const [imageUrl, setImageUrl] = useState('assets/default.png');

    const [pos, setPos] = useState(0);
    const [isBackspace, setIsBackspace] = useState(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;

        setIsBackspace(key === 'Backspace');
    };

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputField = event.currentTarget;
        const {value, selectionStart} = inputField;
        setNumber(formatCreditCardNumber(
            value
                .replace(/\s+/g, '')
                .split('')
                .slice(0, 16)
                .join('')
            )
        );

        // preserve carriage position for better UX
        setPos((selectionStart || 0));
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputField = event.currentTarget;
        const {value} = inputField;
        setMonth(value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputField = event.currentTarget;
        const {value} = inputField;
        setYear(value);
    };

    const handleCVCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputField = event.currentTarget;
        const {value} = inputField;

        setCVC(value.split('').slice(0, 3).join(''));
   };

    const nextFieldWrapper = (nextField: React.RefObject<any>, maxLength: number, onChange: Function) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event);

            const inputField = event.currentTarget;
            const { value } = inputField;

            if (value.length >= maxLength) {
                nextField.current.focus();
            }
        };
    };

    const formatNumberFocusWrapper = (digits: number, min: number, max: number, setter: React.SetStateAction<any>) => {
        return (event: React.FocusEvent<HTMLInputElement>) => {
            const inputField = event.currentTarget;
            const {value} = inputField;

            setter(formatNumber(Number(value), digits, min, max));
        }
    };

    useEffect(() => {
        const ref = inputField.current;

        if (ref) {
            // if current pos is ' ' skip to next pos
            const {value} = ref;
            const char = value[pos - 1];

            if (char === ' ') {
                if (isBackspace) {
                    // jump back to nearest left digit
                    return setPos(pos - 1);
                }
                return setPos(pos + 1);
            }

            ref.setSelectionRange(pos, pos);
        }
    }, [pos]);

    useEffect(() => {
        if (!number.length) {
            setImageUrl(`assets/default.png`)
        } else {
            const type = getCreditCardType(number);
            setImageUrl(`assets/${type.toLocaleLowerCase()}.png`);
        }

    }, [number]);

    useEffect(() => {
        const isValid = number.length === 19 && month.length === 2 && year.length === 2 && cvc.length === 3;

        if (isValid && onSubmitReady) {
            onSubmitReady({
                number: Number(number.replace(/\s+/g, '')),
                month: Number(month),
                year: Number(year),
                cvc: Number(cvc)
            });
        }
    }, [number, month, year, cvc]);

    return (
        <div className='card-input'>
            <img src={imageUrl} alt='Logo'/>
            <input
                ref={inputField}
                type='text' pattern="\d*"
                className='number'
                value={number}
                onKeyDown={handleKeyDown}
                onChange={nextFieldWrapper(monthField, 19, handleCardNumberChange)}
                tabIndex={1}
            />
            <input
                ref={monthField}
                type='number'
                className='month'
                placeholder='MM'
                tabIndex={2}
                value={month}
                onChange={nextFieldWrapper(yearField, 2, handleMonthChange)}
                onBlur={formatNumberFocusWrapper(2, 1, 12, setMonth)}
            />
            /
            <input
                ref={yearField}
                type='number'
                placeholder='YY'
                className='year'
                tabIndex={3}
                value={year}
                onChange={nextFieldWrapper(cvcField, 2, handleYearChange)}
                onBlur={formatNumberFocusWrapper(2, currentYear, currentYear + 10, setYear)}
            />
            <input
                ref={cvcField}
                type='number'
                className='cvc'
                placeholder='CVC'
                tabIndex={4}
                value={cvc}
                onChange={handleCVCChange}

            />
        </div>
    )
};

export default CardInput;
import React from 'react';
import { ICreditCard } from '../../services/card.service';

import './CardDetail.component.scss';

interface ICardDetailProps {
    card: ICreditCard;
}

const CardDetail: React.FC<ICardDetailProps> = ({ card }) => {
    const { number, month, year, cvc } = card;

    return (
        <div className='card-detail'>
            <pre>
                {JSON.stringify(card, undefined, 2)}
            </pre>
        </div>
    )
};

export default CardDetail;
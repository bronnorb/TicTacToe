import React from 'react';
import { useParams } from 'react-router-dom';

export function GameWin(){
    let {player} = useParams();

    return(
        <div>
            player {player} wins!
        </div>
    )
}
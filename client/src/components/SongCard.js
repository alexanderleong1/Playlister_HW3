import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;

    function handleDragStart(event)  {
        // event.preventDefault();
        // STORE THE INITIAL INDEX SO WE KNOW WHERE TO PLACE IT BACK
        // FOR AN UNDO TRANSACTION
        event.dataTransfer.setData("song", index);
        
    }
    function handleDragEnter(event) {
        event.preventDefault();
    }
    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));

        // UPDATE THE MODEL 
        store.moveSong(sourceIndex, targetIndex);
    }
    function handleDragOver(event) {
        event.preventDefault();
    }
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragEnd={handleDrop}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;
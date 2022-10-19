import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';

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
        // store.moveSong(sourceIndex, targetIndex);
        let transaction = new MoveSong_Transaction(store, sourceIndex, targetIndex);
        store.moveSongTransaction(transaction);
    }
    function handleDragOver(event) {
        event.preventDefault();
    }
    function markSongForEdit(songIndex) {
        // MARK THE SONG USING THE SONG INDEX
        store.markSongForEdit(songIndex);
    }
    function showDeleteSongModal(songIndex) {
        store.showDeleteSongModal(songIndex);
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
            // onDragEnd={handleDrop}
            onDrop={handleDrop}
            onDoubleClick={() => {
                // MARK THE CURRENT SONG FOR EDITING
                store.markSongForEdit(index);

                // AND THEN SET THE FIELDS OF THE INPUT FORM
                document.getElementById("title-textfield").value=(store.markedSong ? store.markedSong.title : '');
                document.getElementById("artist-textfield").value=(store.markedSong ? store.markedSong.artist : '');
                document.getElementById("youTube-id-textfield").value=(store.markedSong ? store.markedSong.youTubeId : '');

                // AND THEN OPEN MODAL
                store.showEditModal();
            }}
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
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    showDeleteSongModal(index);
                }}
                onDoubleClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                }}
            />
        </div>
    );
}

export default SongCard;
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';

function DeleteSongModal(props) {
    const { store } = useContext(GlobalStoreContext);

    function confirmDeleteSong() {
        // FIND THE INDEX
        let songIndex = 0;
        for (let i = 0; i < store.currentList.songs.length; i++) {
            if (store.currentList.songs[i] == store.markedSong) {
                songIndex = i;
                break;
            }
        }
        let transaction = new DeleteSong_Transaction(store, store.markedSong, songIndex);
        store.deleteSongTransaction(transaction);
        // store.confirmDeleteSong();
    }

    function findPlaylistName() {
        return store.idNamePairs.filter(pair => pair._id == store.markedList);
    }

    let playlistName = findPlaylistName();
    if (playlistName && playlistName[0]) playlistName = playlistName[0].name;

    return (
        <div
            className={"modal " + (store.deleteSongModalIsActive ? "is-visible" : "")}
            id="delete-list-modal"
            data-animation="slideInOutLeft">
            <div className="modal-dialog" id='verify-delete-list-root'>
                <div className="modal-header dialog-header">
                    Remove song?
                </div>
                <div className="dialog-header">
                    <p>
                        Are you sure you wish to permanently remove {store.markedSong ? store.markedSong.title : ''} from the playlist?
                    </p>
                </div>
                <div className="modal-footer" id="confirm-cancel-container">
                    <input type="button"
                        id="delete-list-confirm-button"
                        className="modal-control"
                        onClick={confirmDeleteSong}
                        value='Confirm' />
                    <input type="button"
                        id="delete-list-cancel-button"
                        className="modal-control"
                        onClick={store.hideDeleteListModal} // TODO
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default DeleteSongModal;
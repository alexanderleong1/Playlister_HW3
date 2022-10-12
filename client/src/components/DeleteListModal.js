import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteListModal(props) {
    const { store } = useContext(GlobalStoreContext);

    function confirmDeleteList() {
        store.deletePlaylist();
    }

    function findPlaylistName() {
        return store.idNamePairs.filter(pair => pair._id == store.markedList);
    }

    let playlistName = findPlaylistName();
    if (playlistName && playlistName[0]) playlistName = playlistName[0].name;

    return (
        <div
            className={"modal " + (store.deleteListModalIsActive ? "is-visible" : "")}
            id="delete-list-modal"
            data-animation="slideInOutLeft">
            <div className="modal-dialog" id='verify-delete-list-root'>
                <div className="modal-header dialog-header">
                    Delete playlist?
                </div>
                <div className="dialog-header">
                    <p>
                        Are you sure you wish to permanently delete the {playlistName} playlist?
                    </p>
                </div>
                <div className="modal-footer" id="confirm-cancel-container">
                    <input type="button"
                        id="delete-list-confirm-button"
                        className="modal-control"
                        onClick={confirmDeleteList}
                        value='Confirm' />
                    <input type="button"
                        id="delete-list-cancel-button"
                        className="modal-control"
                        onClick={store.hideDeleteListModal}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default DeleteListModal;
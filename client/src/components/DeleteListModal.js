import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteListModal(props) {
    const { store } = useContext(GlobalStoreContext);

    function confirmDeleteList() {
        store.deletePlaylist();
    }

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
                        Are you sure you wish to permanently delete the {} playlist?
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
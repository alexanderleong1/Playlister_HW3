import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'

function EditSongModal(props) {
    const { store } = useContext(GlobalStoreContext);
    const [title, setTitle] = useState(store.markedSong ? store.markedSong.title : '');
    const [artist, setArtist] = useState(store.markedSong ? store.markedSong.artist : '');
    const [youTubeId, setYouTubeId] = useState(store.markedSong ? store.markedSong.youTubeId : '');
    
    function confirmEditList() {
        store.editSong(title, artist, youTubeId);
    }

    function handleTitleUpdate(event) {
        setTitle(event.target.value);
    }

    function handleArtistUpdate(event) {
        setArtist(event.target.value);
    }

    function handleYouTubeIdUpdate(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <div
            className={"modal " + (store.editSongModalIsActive ? "is-visible" : "")}
            id="delete-list-modal"
            data-animation="slideInOutLeft">
            <div className="modal-dialog" id='verify-delete-list-root'>
                <div className="modal-header dialog-header">
                    Edit Song
                </div>
                <div className="dialog-header">
                    <div className="dialog-center">
                        <div id="text-prompt">
                            Title:
                        </div>
                        <input id="title-textfield" onChange={handleTitleUpdate}/>
                        <div id="artist-prompt">
                            Artist:
                        </div>
                        <input id="artist-textfield" onChange={handleArtistUpdate}/>
                        <div id="youTube-id-prompt">
                            YouTube Id:
                        </div>
                        <input id="youTube-id-textfield" onChange={handleYouTubeIdUpdate}/>
                    </div>
                </div>
                <div className="modal-footer" id="confirm-cancel-container">
                    <input type="button"
                        id="delete-list-confirm-button"
                        className="modal-control"
                        onClick={confirmEditList}
                        value='Confirm' />
                    <input type="button"
                        id="delete-list-cancel-button"
                        className="modal-control"
                        onClick={store.hideDeleteListModal} // TODO: SEPARATE HIDING OF EDIT AND DELETE MODALS
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default EditSongModal;
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = (store.listNameActive || store.editSongModalIsActive || store.deleteSongModalIsActive || store.deleteListModalIsActive) ? "playlister-button-disabled" : "playlister-button";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    function handleAddSong() {
        let transaction = new AddSong_Transaction(store, {
            title: "Untitled",
            artist: "Unknown",
            youTubeId: 'dQw4w9WgXcQ'
        });
        store.addSongTransaction(transaction);
        // store.addSong();
    }
    let editStatus = false;
    if (store.listNameActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={!store.currentList || editStatus}
                value="+"
                className={enabledButtonClass  + " edit-button"}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={(!store.currentList || !store.tps.hasTransactionToUndo()) || editStatus}
                value="⟲"
                className={enabledButtonClass + " edit-button"}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={(!store.currentList || !store.tps.hasTransactionToRedo()) || editStatus}
                value="⟳"
                className={enabledButtonClass + " edit-button"}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={!store.currentList}
                value="&#x2715;"
                className={enabledButtonClass + " edit-button"}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;
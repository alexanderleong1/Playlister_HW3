import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";

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
        store.addSong();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                className="edit-button"
                disabled={editStatus}
                value="+"
                className={enabledButtonClass  + " edit-button"}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                className="edit-button"
                disabled={editStatus}
                value="⟲"
                className={enabledButtonClass + " edit-button"}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                value="⟳"
                className={enabledButtonClass + " edit-button"}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                className="edit-button"
                disabled={editStatus}
                value="&#x2715;"
                className={enabledButtonClass + " edit-button"}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;
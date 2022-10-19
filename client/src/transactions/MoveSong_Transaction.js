import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding songs.
 * It will be managed by the transaction stack.
 * 
 * @author Alexander Leong
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, oldIndex, newIndex) {
        super();
        this.store = store;
        this.oldIndex = oldIndex;
        this.newIndex = newIndex;
    }

    doTransaction() {
        // this.app.deleteSongWithRef(this.song);
        // this.store.removeSongWithId(this.song);
        this.store.moveSong(this.oldIndex, this.newIndex);
    }
    
    undoTransaction() {  
        
        // this.app.addSong(this.song);
        // this.store.addSongWithRef(this.song);
        // this.store.addSongWithIndex(this.song, this.index)

        // STORE THE SONG ID
        // this.song._id = this.store.currentList.songs[this.store.currentList.songs.length - 1]._id;
        this.store.moveSong(this.newIndex, this.oldIndex);
    }
}
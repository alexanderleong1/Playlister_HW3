import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding songs.
 * It will be managed by the transaction stack.
 * 
 * @author Alexander Leong
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store, song, index) {
        super();
        this.store = store;
        this.song = song;
        this.index = index;
    }

    doTransaction() {
        // this.app.deleteSongWithRef(this.song);
        this.store.removeSongWithId(this.song);
    }
    
    undoTransaction() {  
        // this.app.addSong(this.song);
        // this.store.addSongWithRef(this.song);
        this.store.addSongWithIndex(this.song, this.index)

        // STORE THE SONG ID
        // this.song._id = this.store.currentList.songs[this.store.currentList.songs.length - 1]._id;
    }
}
import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding songs.
 * It will be managed by the transaction stack.
 * 
 * @author Alexander Leong
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(store, song) {
        super();
        this.store = store;
        this.song = song;
    }

    doTransaction() {
        // this.app.addSong(this.song);
        this.store.addSongWithRef(this.song);

        // STORE THE SONG ID
        this.song._id = this.store.currentList.songs[this.store.currentList.songs.length - 1] ? this.store.currentList.songs[this.store.currentList.songs.length - 1]._id : '';
    }
    
    undoTransaction() {
        // this.app.deleteSongWithRef(this.song);
        this.store.removeSongWithId(this.song);
    }
}
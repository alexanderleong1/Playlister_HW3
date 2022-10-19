import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding songs.
 * It will be managed by the transaction stack.
 * 
 * @author Alexander Leong
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, song, oldSong, newSong) {
        super();
        this.store = store;
        this.song = song;
        this.oldSong = oldSong;
        this.newSong = newSong;
    }

    doTransaction() {
        this.store.editSong(this.newSong.title, this.newSong.artist, this.newSong.youTubeId);
    }
    
    undoTransaction() {
        this.store.editSongWithRef(this.song, this.oldSong.title, this.oldSong.artist, this.oldSong.youTubeId);
    }
}
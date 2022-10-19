import jsTPS_Transaction from "../common/jsTPS.js"
import api from '../api'

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
    
    async undoTransaction() {  
        // this.app.addSong(this.song);
        // this.store.addSongWithRef(this.song);
        const newSong = {
            title: this.song.title,
            artist: this.song.artist,
            youTubeId: this.song.youTubeId
        }

        await this.store.addSongWithIndex(newSong, this.index);

        let res = await api.getPlaylistById(this.store.currentList._id);
        // ONCE WE ADD THE NEW SONG WE NEED TO GET THE NEW SONG ID
        this.song = res.data.playlist.songs[this.index];
        console.log(res.data.playlist.songs);
        console.log("song", this.song, this.index);

        // STORE THE SONG ID
        // this.song._id = this.store.currentList.songs[this.store.currentList.songs.length - 1]._id;
    }
}
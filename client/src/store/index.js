import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    DELETE_CURRENT_LIST: "DELETE_CURRENT_LIST",
    MARK_LIST: "MARK_LIST",
    SHOW_DELETE_LIST_MODAL: "SHOW_DELETE_LIST_MODAL",
    ADD_SONG: "ADD_SONG",
    MOVE_SONG: "MOVE_SONG",
    MARK_SONG_FOR_EDIT: "MARK_SONG_FOR_EDIT",
    EDIT_SONG: "EDIT_SONG",
    SHOW_EDIT_SONG_MODAL: "SHOW_EDIT_SONG_MODAL"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        deleteListModalIsActive: false,
        markedList: null,
        markedSong: null
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalIsActive: false,
                    markedList: store.markedList,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalIsActive: false,
                    markedList: store.markedList,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    deleteListModalIsActive: false,
                    markedList: store.markedList,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalIsActive: false,
                    markedList: store.markedList,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.DELETE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalIsActive: false,
                    markedList: null,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalIsActive: false,
                    markedList: store.markedList,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    deleteListModalIsActive: false,
                    markedList: store.markedList,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                });
            }
            // CHANGE THE VISIBILITY OF THE DELETE LIST MODAL BASED ON THE PAYLOAD
            case GlobalStoreActionType.SHOW_DELETE_LIST_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    deleteListModalIsActive: payload,
                    markedList: store.markedList,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                })
            }
            // STORE THE PLAYLIST MARKED FOR DELETION
            case GlobalStoreActionType.MARK_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    deleteListModalIsActive: true,
                    markedList: payload,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                });
            }
            // UPDATE THE CURRENT LIST AFTER ADDING A NEW SONG
            case GlobalStoreActionType.ADD_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    deleteListModalIsActive: store.deleteListModalIsActive,
                    markedList: store.markedList,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                });
            }
            // UPDATE THE CURRENT LIST AFTER MOVING A SONG
            case GlobalStoreActionType.MOVE_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    deleteListModalIsActive: store.deleteListModalIsActive,
                    markedList: store.markedList,
                    markedSong: store.markedSong,
                    editSongModalIsActive: false
                });
            }
            // MARK A SONG FOR EDITING AND DELETING
            case GlobalStoreActionType.MARK_SONG_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalIsActive: false,
                    markedList: null,
                    markedSong: payload,
                    editSongModalIsActive: false
                });
            }
            // EDIT THE SONG
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    deleteListModalIsActive: store.deleteListModalIsActive,
                    markedList: store.markedList,
                    markedSong: null,
                    editSongModalIsActive: false
                });
            }
            // SHOW THE EDIT SONG MODAL
            case GlobalStoreActionType.SHOW_EDIT_SONG_MODAL: {
                return setStore({
                    ...store,
                    editSongModalIsActive: payload
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    store.addSong = function () {
        async function asyncAddSong() {
            let response = await api.putNewSong(store.currentList._id);

            if (response.data.success) {
                store.setCurrentList(store.currentList._id);
            }
        }

        asyncAddSong();
    }

    store.markSongForEdit = function(songIndex) {
        // MARK A SONG USING THE SONG INDEX IN THE CURRENT LIST
        // NOTE THIS IS WHERE WE GO FROM SONG INDEX TO THE SONG OBJECT REFERENCE
        function asyncMarkSong(songIndex) {
            const song = store.currentList.songs[songIndex];

            storeReducer({
                type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
                payload: song
            });

            store.markedSong = song; //TODO
        }

        asyncMarkSong(songIndex);
    }

    store.showEditModal = function() {
        // AND THEN SHOW THE MODAL
        storeReducer({
            type: GlobalStoreActionType.SHOW_EDIT_SONG_MODAL,
            payload: true
        })
    }

    // THIS FUNCTION ADDS A NEW PLAYLIST
    store.createNewList = function () {
        async function asyncCreateNewList() {
            let response = await api.postNewPlaylist();
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: playlist
                });

                // OPEN THE NEW PLAYLIST IN EDIT MODE
                store.setCurrentList(playlist._id);
            }
        }

        asyncCreateNewList();
    }

    // MARK A LIST FOR EDIT OR DELETION
    store.markList = function(playlistId) {
        function asyncMarkList(playlistId) {
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST,
                payload: playlistId
            });
        }

        asyncMarkList(playlistId);
    }

    // EDIT THE LIST WITH THE PROPER FIELDS
    // NOTE THIS IS WHERE WE ALREADY HAVE THE SONG OBJECT ID
    store.editSong = function(newTitle, newArtist, newYouTubeId) {
        async function asyncEditSong(newTitle, newArtist, newYouTubeId) {
                await api.putEditSong(store.markedSong._id, {
                title: newTitle,
                artist: newArtist,
                youTubeId: newYouTubeId
            });

            // STORE THE CHANGES FOR THE SONG AND HIDE MODAL
            storeReducer({
                type: GlobalStoreActionType.EDIT_SONG,
                payload: {}
            });

            // REFRESH THE CURRENT LIST
            store.setCurrentList(store.currentList._id);
        }

        asyncEditSong(newTitle, newArtist, newYouTubeId);


    }

    // MOVE A SONG IN A PLAYLIST
    store.moveSong = function(sourceIndex, targetIndex) {
        async function asyncMoveSong(sourceIndex, targetIndex) {
            let payload = store.currentList.songs;
            let tempSong = payload[sourceIndex];
            payload[sourceIndex] = payload[targetIndex];
            payload[targetIndex] = tempSong;

            await api.putListOrder(store.currentList._id, payload);

            let newList = store.currentList;
            newList.songs = payload;

            storeReducer({
                type: GlobalStoreActionType.MOVE_SONG,
                payload: newList
            });
        }

        asyncMoveSong(sourceIndex, targetIndex);
    }

    // DELETE A PLAYLIST
    store.deletePlaylist = function() {
        async function asyncDeletePlaylist(playlistId) {
            let response = await api.deletePlaylist(playlistId);
        
            let newIdNamePairs = store.idNamePairs;
            store.idNamePairs.forEach((pair, index) => {
                if (pair._id === playlistId) {
                    newIdNamePairs.splice(index, 1);
                }
            })

            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.DELETE_CURRENT_LIST,
                    payload: newIdNamePairs
                })
            } else {
                console.log("API FAILED TO DELETE CURRENT LIST");
            } 
        }

        asyncDeletePlaylist(store.markedList);
    }

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.showDeleteListModal = function() {
        storeReducer({
            type: GlobalStoreActionType.SHOW_DELETE_LIST_MODAL,
            payload: true
        })
    }
    store.hideDeleteListModal = function() {
        storeReducer({
            type: GlobalStoreActionType.SHOW_DELETE_LIST_MODAL,
            payload: false
        })
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}
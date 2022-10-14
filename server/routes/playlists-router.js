/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()

router.post('/playlist', PlaylistController.createPlaylist)
router.get('/playlist/:id', PlaylistController.getPlaylistById)
router.get('/playlists', PlaylistController.getPlaylists)
router.get('/playlistpairs', PlaylistController.getPlaylistPairs)
router.delete('/deleteplaylist/:id', PlaylistController.deletePlaylist)
router.put('/song/:id', PlaylistController.createSong)
router.put('/updatelistorder/:id', PlaylistController.updateListOrder)
router.put('/editsong/:id', PlaylistController.editSong)
router.delete('/deletesong/:id/:songId', PlaylistController.deleteSong)

module.exports = router
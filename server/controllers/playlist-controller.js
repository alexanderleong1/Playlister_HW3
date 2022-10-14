const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}
deletePlaylist = async (req, res) => {
    console.log("deletePlaylist body: " + req.body);

    await Playlist.deleteOne({ _id: req.params.id }, (err, _) => {
        if (err) {
            return res.status(400).json({ success: false, error: "Could not delete playlist" })
        }

        console.log("playlist: " + JSON.stringify(req.body));
        
        return res.status(200).json({ success: true })
    }).catch(err => console.log(err, req))
}
createSong = async (req, res) => {
    const body = req.body;

    const song = {
        title: body.title,
        artist: body.artist,
        youTubeId: body.youTubeId
    }

    await Playlist.findOne({_id : req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: "Could not create a new song" })
        }

        let newSongs = list.songs;
        newSongs.push(song);

        Playlist.updateOne({_id : req.params.id }, {songs: newSongs})
            .catch(err => res.status(400).json({ success: false, err: err }));
        
        return res.status(200).json({success: true, msg: "Successfully added a new song"});
    }).catch(err => res.status(400).json({ success: false, err: err }))
}
updateListOrder = async (req, res) => {
    const newListOrder = req.body.newList;

    await Playlist.updateOne({_id : req.params.id}, {songs: newListOrder})
        .catch(err => res.status(400).json({success: false, err: "Could not update the playlist ordering"}))

    return res.status(200).json({success: true, msg: "Successfully updated playlist ordering"});
}
editSong = async (req, res) => {
    const newSongTitle = req.body.newSong.title;
    const newSongArtist = req.body.newSong.artist;
    const newSongYouTubeId = req.body.newSong.youTubeId;

    await Playlist.updateOne({"songs._id" : req.params.id}, {
        $set: {
            "songs.$.title": newSongTitle,
            "songs.$.artist": newSongArtist,
            "songs.$.youTubeId": newSongYouTubeId
        }
    }).catch(err => {console.log("err")});

    return res.status(200).json({success: true});
}
deleteSong = async (req, res) => {
    Playlist.findOne({_id:req.params.id}, (err, list) => {
        // console.log(list);
    })

    await Playlist.updateOne({_id : req.params.id}, {
        $pull: {
            "songs": {_id: req.params.songId}
        }
    }, (err, resp) => {
        console.log(resp);
        if (err) return res.status(400).json({success: false})
    }).catch(err => console.log(err));

    return res.status(200).json({success: true, msg: `Successfully deleted ${req.params.songId}`});
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    deletePlaylist,
    createSong,
    updateListOrder,
    editSong,
    deleteSong
}
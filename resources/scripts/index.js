let allsongs = OnLoad();


AddNewSongBySubmit();

function AddNewSongBySubmit(){
    let form = document.getElementById("newSongForm");
    form.addEventListener('submit',function(e){
        e.preventDefault();
        let currentDate = new Date().toJSON().slice(0,10)
        let newSong = {
            title: e.target.elements.songTitle.value,
            artist: e.target.elements.songArtist.value,
            favorited: false,
            deleted: false,
            date: currentDate
        }

        let songTitleIndex = allsongs.findIndex(function(element){
            if (element.title == newSong.title) {
                return indexedDB;
            }
        })

        let songArtistIndex = allsongs.findIndex(function(element){
            if (element.artist == newSong.artist) {
                return indexedDB;
            }
        })
        if(newSong.artist === allsongs[songArtistIndex].artist && newSong.title ===allsongs[songArtistIndex].title){
            allsongs[songTitleIndex].deleted = false;
            localStorage.setItem("1", JSON.stringify(allsongs));
            var elementExists = document.getElementById(`${allsongs[songTitleIndex].title}`);
            if(elementExists == null){
                CreateNewCard(allsongs[songTitleIndex]);
            }
        }else{
            allsongs.push(newSong);
            localStorage.setItem("1", JSON.stringify(allsongs));
            CreateNewCard(newSong);
        }
        e.target.elements.songTitle.value = null;
        e.target.elements.songArtist.value = null;
    });
}

function CreateNewCard(song){
    document.getElementById("songCards")
    .insertAdjacentHTML("afterbegin",`<div class="col-md-4"><div class="card mb-4 shadow-sm"><div class="card-body"><p class="card-text">Title: ${song.title}<br>Artist: ${song.artist}<br>Date Added: ${song.date}<br>Favorited: ${song.favorited}<div class="d-flex justify-content-between align-items-center"><div class="btn-group" id = "${song.title}"><button type="button" value = "submit" onClick = "FavoriteASong()" class="btn btn-sm btn-outline-secondary" id = "${song.title}">Favorite</button><button type="button" value = "submit" class="btn btn-sm btn-outline-secondary" value = "submit" onClick = "DeleteASong()" id="delete">Delete</button></div></div></div></div></div>`);
}

function OnLoad(){
    //read in array of objects
   let allsongs = JSON.parse(localStorage.getItem("1"))
   try{let success = allsongs[0].deleted}
   catch{
    allsongs = []
    alert("songs failed to load or are unavailable")
    }

    //write all cards for objects
    for (let index = 0; index < allsongs.length; index++) {
        if(allsongs[index].deleted === false)
        {
            CreateNewCard(allsongs[index]);
        }
    }

    return allsongs;
}

function FavoriteASong(){
    let favoriteName = event.target.parentNode.id;

    let foundIndex = allsongs.findIndex(function(element){
        if (element.title == favoriteName) {
            return indexedDB;
        }
    })

    if(allsongs[foundIndex].favorited){
        allsongs[foundIndex].favorited = false;
    }else{
        allsongs[foundIndex].favorited = true;
    }

    localStorage.setItem("1", JSON.stringify(allsongs));

    window.location.reload();
}

function DeleteASong(){
    let favoriteName = event.target.parentNode.id;

    let foundIndex = allsongs.findIndex(function(element){
        if (element.title == favoriteName) {
            return indexedDB;
        }
    })

    if(allsongs[foundIndex].deleted){
        allsongs[foundIndex].deleted = false;
    }else{
        allsongs[foundIndex].deleted = true;
    }

    localStorage.setItem("1", JSON.stringify(allsongs));

    window.location.reload();
}


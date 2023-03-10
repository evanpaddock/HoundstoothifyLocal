let allsongs = OnLoad();


AddNewSongBySubmit();

function AddNewSongBySubmit(){
    let form = document.getElementById("newSongForm");
    form.addEventListener('submit',function(e){
        let currentDate = new Date().toLocaleString().slice(0,9);
        let newSong = {
            title: e.target.elements.songTitle.value,
            artist: e.target.elements.songArtist.value,
            favorited: false,
            deleted: false,
            date: currentDate,
            ID: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
                (c) =>(c ^(crypto.getRandomValues(new Uint8Array(1))[0] &(15 >> (c / 4))))
                .toString(16)
            )
        }

            let songFoundIndex = allsongs.findIndex(function(element){
            if (element.artist == newSong.artist && element.title == newSong.title) {
                return indexedDB;
            }
        })
        try{
                allsongs[songFoundIndex].deleted = false;
                allsongs[songFoundIndex].favorited = false;

                localStorage.setItem("Houndstoothify-Songs", JSON.stringify(allsongs));

                var elementExists = document.getElementById(`${allsongs[songFoundIndex].ID}`);
                if(elementExists == null){
                    window.location.reload();
                }

        }catch{
            e.preventDefault();
            allsongs.push(newSong);
            localStorage.setItem("Houndstoothify-Songs", JSON.stringify(allsongs));
            CreateNewCard(newSong);
        }
        e.target.elements.songTitle.value = null;
        e.target.elements.songArtist.value = null;
    });
}

function CreateNewCard(song){
    document.getElementById("songCards")
    .insertAdjacentHTML("afterbegin",`<div class="col-md-4"><div class="card mb-4 shadow-sm"><div class="card-body"><p class="card-text">Title: ${song.title}<br>Artist: ${song.artist}<br>Date Added: ${song.date}<br>Favorited: ${song.favorited}<div class="d-flex justify-content-between align-items-center"><div class="btn-group" id = "${song.ID}"><button type="button" value = "submit" onClick = "FavoriteASong()" class="btn btn-sm btn-outline-secondary" id = "${song.ID}">Favorite</button><button type="button" value = "submit" class="btn btn-sm btn-outline-secondary" value = "submit" onClick = "DeleteASong()" id="delete">Delete</button></div></div></div></div></div>`);
}

function OnLoad(){
    //read in array of objects
   let allsongs = JSON.parse(localStorage.getItem("Houndstoothify-Songs"))
   try{let success = allsongs[0].deleted}
   catch{
    allsongs = []
    alert("Songs failed to load or are not available.\nAdd a song to enable song stroage.")
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
    let ID = event.target.parentNode.id;

    let foundIndex = allsongs.findIndex(function(element){
        if (element.ID == ID) {
            return indexedDB;
        }
    })

    if(allsongs[foundIndex].favorited){
        allsongs[foundIndex].favorited = false;
    }else{
        allsongs[foundIndex].favorited = true;
    }

    localStorage.setItem("Houndstoothify-Songs", JSON.stringify(allsongs));

    window.location.reload();
}

function DeleteASong(){
    let ID = event.target.parentNode.id;

    let foundIndex = allsongs.findIndex(function(element){
        if (element.ID == ID) {
            return indexedDB;
        }
    })

    if(allsongs[foundIndex].deleted){
        allsongs[foundIndex].deleted = false;
    }else{
        allsongs[foundIndex].deleted = true;
    }

    localStorage.setItem("Houndstoothify-Songs", JSON.stringify(allsongs));

    window.location.reload();
}


console.log("Lets write JavaScript");

let currentSong = new Audio();  // Initialize currentSong as an Audio Object
let songs;
let currFolder;
 function secondsToMinutesSeconds(seconds){
  if(isNaN((seconds)|| seconds < 0)){
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2,'0');
  const formattedSeconds = String(remainingSeconds).padStart(2,'0');
  return `${formattedMinutes}:${formattedSeconds}`;
 }


async function getSongs(folder){
  currFolder=folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response = await a.text();
   // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs=[];
    for(let index = 0; index < as.length; index++){
        const element = as[index];
        if(element.href.endsWith(".mp3")){
           // Extract the song name from the href..........

           songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    return songs;
}

const playMusic = (track,pause=false)=>{
    currentSong.src=`/${currFolder}/` + track
    if(!pause){
    currentSong.play()
    play.src="pause.svg"
}
    document.querySelector(".songInfo").innerHTML=decodeURI(track)
    document.querySelector(".songtime").innerHTML="00:00/00:00";

}
     async function main(){
        
       songs =await getSongs("songs/ncs");
       playMusic(songs[0],true)
     console.log(songs)

     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];

     for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                               <div>${song.replaceAll("%20"," ")}</div
                              <div>Jyoti</div>
                            </div>
                            <div class="playnow">
                                  <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                        </li>`;
     }
     //Attach an event Listener to each song...
     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
        
     })

     //Attach Event Listener to play next and previous.....
     play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src="pause.svg"
        }else{
            currentSong.pause()
            play.src="play.svg"
        }
     })

     //Listen for timeupdate event
     currentSong.addEventListener("timeupdate",()=>{
      console.log(currentSong.currentTime, currentSong.duration);
      document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)} /
         ${secondsToMinutesSeconds(currentSong.duration)}`
         document.querySelector(".circle").style.left=(currentSong.currentTime / currentSong.duration) 
         * 100 + "%";
     })

     //Add an eventlistener to seekbar
     document.querySelector(".seekbar").addEventListener("click",e=>{
      let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
      document.querySelector(".circle").style.left = percent +"%";
      currentSong.currentTime=((currentSong.duration)*percent)/100
     })

     //Add an event listener for hamburger
     document.querySelector(".hamburger").addEventListener("click", ()=>{
      document.querySelector(".left").style.left="0"
     })

     //Add an event listener for close button
     document.querySelector(".close").addEventListener("click", ()=>{
      document.querySelector(".left").style.left="-120%"
     })

//Add an event listener for previous........
previous.addEventListener("click", ()=>{
  console.log("Previous clicked")
  console.log(currentSong)
  let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
  if((index - 1) >= 0){
    playMusic(songs[index - 1])
  }
})

//Add an event listener for next........
next.addEventListener("click", ()=>{
  console.log("Next clicked")
  let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
  if( (index + 1) < songs.length){
    playMusic(songs[index+1])
  }
})

//Add an event to Volume
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
  console.log("Setting Volume to", e.target.value,  "/100")
  currentSong.volume = parseInt(e.target.value)/100
})

//Load the playlist Whenever card is clicked
Array.from(document.getElementsByClassName("card")).forEach(e=>{
  console.log(e)
  e.addEventListener("click", async item=>{
    songs =await getSongs("songs/ncs");
    item.dataset.folder;
  })
})
 }

      main()







































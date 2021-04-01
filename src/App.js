// import React from "react";
import { useState, useRef} from "react"
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";



function App() {
  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const volume = e.target.volume


    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    
    Settimeupdate(
      {...Timeupdate, 
        currentTime, 
        duration,
        percentage,
        volume
      })
    };

  const onNextHandler = async() => {
    const moveEffect = Songs.findIndex(Song => 
      Song.id === Currentsong.id
  )
   await Setcurrentsong(Songs[(moveEffect + 1) % Songs.length])
    audioRef.current.play() 

  }


  const[Songs, Setsongs] = useState(data());
  const[Currentsong, Setcurrentsong] = useState(Songs[0]);
  const[Isplaying, Setisplaying] = useState(false);
  const[Timeupdate, Settimeupdate] = useState({
    currentTime: 0,
    duration: 0,
    percentage: 0,
    volume: 0
  }  
  );
  const[Librarystate, Setlibrarystate] = useState(false);
  const [Activevolume, Setactivevolume] = useState(false);
  
  return (
    <div className={`App ${Librarystate ? "active-body" : ""}`}>
      <Nav
      Librarystate={Librarystate}
      Setlibrarystate={Setlibrarystate} />

      <Song 
      Currentsong={Currentsong}
      Isplaying={Isplaying} 
       />
      
      <Player 
      Isplaying={Isplaying} 
      Setisplaying={Setisplaying} 
      Currentsong={Currentsong}
      Timeupdate={Timeupdate}
      Settimeupdate={Settimeupdate}
      audioRef={audioRef}
      Songs={Songs}
      Setsongs={Setsongs}
      Setcurrentsong={Setcurrentsong}
      Setactivevolume={Setactivevolume}
      Activevolume={Activevolume}

        />
     
      <Library 
      Songs={Songs} 
      Setcurrentsong={Setcurrentsong}
      audioRef={audioRef}
      Isplaying={Isplaying} 
      Setisplaying={Setisplaying}
      Currentsong={Currentsong}
      Setsongs={Setsongs}
      Librarystate={Librarystate}
      Setlibrarystate={Setlibrarystate} />
      
      <audio 
      onLoadedMetadata={timeUpdateHandler} 
      onTimeUpdate={timeUpdateHandler} 
      ref={audioRef} 
      src={Currentsong.audio}
      onEnded={onNextHandler}></audio>
       
    </div>
  );
}

export default App;

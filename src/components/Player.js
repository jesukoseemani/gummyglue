
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause, faVolumeDown } from '@fortawesome/free-solid-svg-icons';


const Player = ({ Currentsong, 
  Isplaying, 
  Setisplaying,
  Settimeupdate,
  Timeupdate,
  audioRef,
  Songs,
  Setcurrentsong,
  Setsongs, 
  Setactivevolume,
  Activevolume

}) => {
  

  const addingActiveState = (nextPrev) => {

    const newSong = Songs.map(S => {
      if(S.id === nextPrev.id){
         return {
           ...S,
           active: true
         }
      }else{
        return {
          ...S,
          active: false
        }
      }
    
     })
      
     Setsongs(newSong)
  }
 
const nextPreviouseffectHandler = async (direction) => {
  const moveEffect = Songs.findIndex(Song => 
      Song.id === Currentsong.id
  )
  

  if(direction === "Skip-forward"){
  await Setcurrentsong(Songs[(moveEffect + 1) % Songs.length])
  Isplaying ? audioRef.current.play() : audioRef.current.pause();

  addingActiveState(Songs[(moveEffect + 1) % Songs.length])


}
  if(direction === "Skip-back"){
    if((moveEffect - 1) % Songs.length === -1){
    await  Setcurrentsong(Songs[(Songs.length - 1)])
    Isplaying ? audioRef.current.play() : audioRef.current.pause();
    addingActiveState(Songs[(Songs.length - 1)])
      return;
    }
  await Setcurrentsong(Songs[(moveEffect - 1) % Songs.length])
  Isplaying ? audioRef.current.play() : audioRef.current.pause();
  addingActiveState(Songs[(moveEffect - 1) % Songs.length])
}
 };

  
 const playingHandler = () => {
     if(Isplaying){
       audioRef.current.pause();
       Setisplaying(!Isplaying);
     }else{
       audioRef.current.play();
       Setisplaying(!Isplaying);
     }
  };

  function getTime(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    Settimeupdate({ ...Timeupdate, currentTime: e.target.value });
  }

  const tracktrim = {
    transform: `translateX(${Timeupdate.percentage}%)`
  }
  
  const changeVolume = (e) => {
    let value = e.target.value;
    audioRef.current.volume = value;
    Settimeupdate({ ...Timeupdate, volume: value });
  };

  return (
       <div className="player">
       <div className="time-control">
       <p>{getTime(Timeupdate.currentTime)}</p>
       <div style={{background: `linear-gradient(to right, ${Currentsong.color[0]},${Currentsong.color[1]})` }} className="track">
       <input onChange={dragHandler} min={0} max={ Timeupdate.duration || 0} value={Timeupdate.currentTime} type="range" />

       <div style={tracktrim} className="animate-track"></div>
       </div>
      
       <p>{Timeupdate.duration ? getTime(Timeupdate.duration) : "0:00"}</p>
       </div>

       <div className="play-control">
       <FontAwesomeIcon onClick={() => nextPreviouseffectHandler("Skip-back")} className="skip-back" icon={faAngleLeft} size="2x" / >
        <FontAwesomeIcon onClick={playingHandler} className="play" icon={ Isplaying ? faPause : faPlay} size="2x" / >
        <FontAwesomeIcon onClick={() => nextPreviouseffectHandler("Skip-forward")} className="skip-forward" icon={faAngleRight} size="2x" / >
        <FontAwesomeIcon
          onClick={() => Setactivevolume(!Activevolume)}
          icon={faVolumeDown}
        />
        {Activevolume && (
          <input
            onChange={changeVolume}
            value={Timeupdate.volume}
            max="1"
            min="0"
            step="0.01"
            type="range"
          />
        )}
       </div>
      
     </div>
  );
}

export default Player;
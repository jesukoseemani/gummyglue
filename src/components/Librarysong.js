

const Librarysong = ({Song, Setcurrentsong, audioRef, Songs, Setsongs, Isplaying}) => {
  

  const changeSongHandler = async () => {
    
    // const song = {Song}
    // Setisplaying(true)
  await  Setcurrentsong(Song) 
 
  Isplaying ? audioRef.current.play() : audioRef.current.pause()

 const newSong = Songs.map(S => {
  if(S.id === Song.id){
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

  

  return(
    <div onClick={changeSongHandler} className={`library-song ${Song.active ? "selected" : ""}`}>
    <img alt={Song.name} src={Song.cover}></img>
    <div className="song-description">
    <h3>{Song.name}</h3>
    <h4>{Song.artist}</h4>
    </div>
    
    </div>
  )

}


export default Librarysong;
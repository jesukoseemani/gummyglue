

const Song = ({Currentsong, Isplaying}) => {
  
  
  return (
     <div className="song-container">
       <img className={Isplaying ? "rotateSong" : ""} alt={Currentsong.name} src={Currentsong.cover}></img>
        <h2>{Currentsong.name}</h2>
        <h3>{Currentsong.artist}</h3>
     </div>
  );
}

export default Song
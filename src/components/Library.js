
import Librarysong from "./Librarysong";



const Library = ({Songs, Setcurrentsong, audioRef, Isplaying, Currentsong,  Setsongs, Librarystate}) => {

return(
   <div className={`library ${Librarystate ? "active-library" : ""}`}>
     <h2>library</h2>
     <div className="library-songs">
     {Songs.map((Song) => {
      return (
      <Librarysong 
      Songs={Songs} 
      Song={Song} 
      Setcurrentsong={Setcurrentsong}
      audioRef={audioRef}
      Isplaying={Isplaying} 
      Currentsong={Currentsong}
      Setsongs={Setsongs} 
      key={Song.id} />)
      })}   
     </div>
   </div>
);
}

export default Library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';


const Nav = ({Librarystate, Setlibrarystate}) => {
  const toggleHandler = () => {
    Setlibrarystate(!Librarystate);
  }
  
  return(
    <nav>
     <h3>GUMMYGLUE</h3>
     <button onClick={toggleHandler} className="">Library  <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></button>
    </nav>
  )
}

export default Nav;
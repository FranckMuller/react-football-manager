const isPodaction = true; 
let url = null;
if(isPodaction) {
  url = 'https://react-football-manager.herokuapp.com'
} else {
  url = 'http://localhost:3000'
} 

export default url;
const isProdaction = true; 
let url = null;
if(isProdaction) {
  url = 'https://react-football-manager.herokuapp.com'
} else {
  url = 'http://localhost:3000'
} 

export default url;
class FmpaiService {

  async getAllPlayers() {
    const data = await fetch('https://react-football-manager.herokuapp.com/data.json');
    const players = await data.json();
    return players;
  };

};

export default FmpaiService;

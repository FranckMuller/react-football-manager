class FmpaiService {

  async getAllPlayers() {
    const data = await fetch('http://localhost:3000/data.json');
    const players = await data.json();
    return players;
  };

};

export default FmpaiService;

import url from '../config/process-env';

class FmpaiService {

  async getAllPlayers() {
    const data = await fetch(`${url}/data.json`);
    const players = await data.json();
    return players.map(this.transformData);
  };

  transformData(item) {
    return {
      ...item,
      image: `${url}/images/${item.image}`
    }
  }

};

export default FmpaiService;

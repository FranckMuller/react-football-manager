import url from '../config/process-env';

class FmpaiService {

  async getAllPlayers() {
    const data = await fetch(`${url}/data.json`);
    const players = await data.json();
    return players.map(this.transformData);
  };

  transformData(item) {
    return {
      purchased: false,
      cost: +item.cost,
      goldBalls: item['gold-balls'],
      id: item.id,
      image: `${url}/images/${item.image}`,
      name: item.name,
      position: item.position,
      rating: item.rating,
      accuratePasses: item['accurate-passes'],
      goals: item.goals
    };
  };

};

export default FmpaiService;

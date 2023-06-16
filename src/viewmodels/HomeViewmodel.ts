interface IHomeViewmodel {
  getIndexTitle():string,
}

export default class HomeViewmodel implements IHomeViewmodel {
  constructor() {

  }
  
  getIndexTitle():string {
    return 'Dashboard';
  }
}
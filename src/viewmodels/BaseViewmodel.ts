interface IViewmodel {
  getRouteIndex():string,
  getTitleIndex():string,
  getTitleCreate():string,
  getTitleEdit():string,
  getTitleShow():string,
}

export default class BaseViewmodel implements IViewmodel {
  getRouteIndex():string {
    return 'root';
  }

  getTitleIndex():string {
    return 'Index';
  }

  getTitleCreate():string {
    return 'Create';
  }

  getTitleEdit():string {
    return 'Edit';
  }

  getTitleShow():string {
    return 'Show';
  }
}

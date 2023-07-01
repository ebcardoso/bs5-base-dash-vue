import { AlertMessage } from "@/models/AlertMessage";

interface IViewmodel {
  getRouteIndex():string,
  getCreateRoute():string,
  getTitleIndex():string,
  getTitleCreate():string,
  getTitleEdit():string,
  getTitleShow():string,
}

export default class BaseViewmodel implements IViewmodel {
  //Default Index Route
  getRouteIndex():string {
    return 'root';
  }

  getCreateRoute():string {
    return 'root';
  }

  //Default Title Pages
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

  //Create Alerts
  createAlert(alerts:any, type:string, title:string, message:string) {
    const newAlert:AlertMessage = {
      type: type,
      title: title,
      message: message
    }
    alerts?.push(newAlert);
  }

  //Control Exhibition of Page Items
  canShowCreateButton():boolean {
    return true;
  }
}

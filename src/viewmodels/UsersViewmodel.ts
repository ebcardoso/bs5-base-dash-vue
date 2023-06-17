import BaseViewmodel from "@/viewmodels/BaseViewmodel";
import UsersDatatable from "@/datatables/UsersDatatable"
import UsersService from "@/services/UsersService";
import { User } from "@/models/User";

export default class UsersViewmodel extends BaseViewmodel {
  alertMessages:Array<Object>;
  datatable?:UsersDatatable;

  constructor() {
    super();
    this.alertMessages = [];
    this.datatable = new UsersDatatable();
  }

  getAlertMessages() {
    return this.alertMessages;
  }

  getDatatable() {
    return this.datatable;
  }

  //Route
  getRouteIndex():string {
    return 'usersIndexPath'
  }

  //Page Titles
  getTitleIndex():string {
    return "Users";
  }

  getTitleCreate():string {
    return "Create User";
  }

  getTitleEdit():string {
    return "Edit User";
  }

  getTitleShow():string {
    return "Describe User";
  }

  //Form Fields
  fieldGroups() {
    return [
      {title: "User Credentials", fields: this.fields1()},
    ]
  }

  fields1() {
    return [
      {name: "username", label: "Username:", type: "text", required: true, canShow: true},
      {name: "email", label: "E-Mail:", type: "text", required: true, canShow: true},
      {name: "password", label: "Password:", type: "password", required: true, canShow: false},
    ]
  }

  //Service Actions
  saveModel(model:User) {
    return UsersService.create(model);
  }

  editModel(model:User) {
    return UsersService.update(model);
  }

  findModel(id:string) {
    return UsersService.find(id);
  }
}

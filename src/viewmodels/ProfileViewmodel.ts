import BaseViewmodel from "@/viewmodels/BaseViewmodel";
import UsersService from "@/services/UsersService";

export default class ProfileViewmodel extends BaseViewmodel {
  alertMessages:Array<Object>;

  constructor() {
    super();
    this.alertMessages = [];
  }

  getAlertMessages() {
    return this.alertMessages;
  }

  //Page Titles
  getTitleShow():string {
    return 'My Profile';
  }

  //Form Fields
  fieldGroups() {
    return [
      {title: "About Me", fields: this.fields1()},
    ]
  }

  fields1() {
    return [
      {name: "username", label: "Username:", type: "text", required: true, canShow: true},
      {name: "email", label: "E-Mail:", type: "text", required: true, canShow: true},
    ]
  }

  //Service Actions
  findMyProfile() {
    return UsersService.myProfile();
  }
}

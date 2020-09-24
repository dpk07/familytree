import { Person as PersonInterface } from "../Interfaces";

export default class Person implements PersonInterface {
  name: String;
  coupleId: String;
  parentId: String;
  gender: String;
  constructor(name, gender) {
    gender = gender.toLowerCase();
    this.name = name;
    this.gender = gender;
    this.coupleId = null;
    this.parentId = null;
  }
  setCouple(coupleId: String) {
    this.coupleId = coupleId;
  }
  setGender(gender: String) {
    this.gender = gender;
  }
  setParent(parentId: String) {
    this.parentId = parentId;
  }
}

import { Person, Couple as CoupleInterface } from "../Interfaces";
import Gender from "./Gender";
export default class Couple implements CoupleInterface {
  name: String;
  person1: Person;
  person2: Person;
  children: Map<String, Person>;
  constructor(name) {
    this.name = name;
    this.person1 = null;
    this.person2 = null;
    this.children = new Map<String, Person>();
  }
  findSuns(): String[] {
    const result: String[] = [];
    this.children.forEach((person, name) => {
      if (person.gender == Gender.MALE) result.push(name);
    });
    return result;
  }
  findDaughters(): String[] {
    const result: String[] = [];
    this.children.forEach((person, name) => {
      if (person.gender == Gender.FEMALE) result.push(name);
    });
    return result;
  }
  setPerson1(person: Person) {
    this.person1 = person;
  }
  setPerson2(person: Person) {
    this.person2 = person;
  }
  copyChildren(couple: CoupleInterface) {
    couple.children.forEach((p: Person, name: String) => {
      this.addChild(p);
    });
  }
  addChild(person: Person) {
    this.children.set(person.name, person);
  }
}

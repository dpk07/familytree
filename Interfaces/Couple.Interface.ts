import { Person } from "./Person.Interface";
export interface Couple {
  name: String;
  person1: Person;
  person2: Person;
  children: Map<String, Person>;
  addChild(person: Person);
  copyChildren(couple: Couple);
  setPerson1(person: Person);
  setPerson2(person: Person);
  findSons(): String[];
  findDaughters(): String[];
}

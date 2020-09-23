import { Person } from "./";
export interface PersonDto {
  addPerson(person: Person);
  getPerson(name: String): Person;
  getAll(): String[];
}

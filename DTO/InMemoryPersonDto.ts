import { Person, PersonDto } from "../Interfaces";

export default class InMemoryPersonDto implements PersonDto {
  personMap: Map<String, Person> = new Map<String, Person>();
  addPerson(person: Person) {
    this.personMap.set(person.name, person);
    console.log(this.personMap);
  }
  getPerson(name: String): Person {
    return this.personMap.get(name);
  }
  getAll(): String[] {
    return Array.from(this.personMap.keys());
  }
}

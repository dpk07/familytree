import { Person, PersonDto } from "../Interfaces";

export default class InMemoryPersonDto implements PersonDto {
  personMap: Map<String, Person> = new Map<String, Person>();
  addPerson(person: Person) {
    if (this.personMap.has(person.name.toLocaleLowerCase())) {
      throw new Error(
        "Person with this name already exists. Please add a middle name."
      );
    }
    this.personMap.set(person.name.toLocaleLowerCase(), person);
  }
  getPerson(name: String): Person {
    if (!this.personMap.has(name.toLocaleLowerCase())) {
      throw new Error("Person does not exist");
    }
    return this.personMap.get(name.toLocaleLowerCase());
  }
  getAll(): String[] {
    let names: String[] = [];
    Array.from(this.personMap.values()).map((person) => {
      names.push(person.name);
    });
    return names;
  }
}

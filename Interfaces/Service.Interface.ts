import { Person, PersonDto, CoupleDto, Couple } from "../Interfaces";
export interface Service {
  personDto: PersonDto;
  coupleDto: CoupleDto;
  /**
   * Adds a new Person to the data store.
   * @param person Person object that needs to be added.
   */
  addPerson(person: Person);
  /**
   * Gets a person with the particular name.
   * @param name The name of the person to get.
   */
  getPerson(name: String): Person;
  /**
   * Adds a couple to the data store.
   * @param couple Couple object that needs to be added.
   */
  addCouple(couple: Couple);
  /**
   * Gets a couple with the particular name.
   * @param name The name of the couple to get.
   */
  getCouple(name: String): Couple;
  /**
   * Adds a Relationship to the data store.
   * @param name The name of the relationship that needs to be added.
   */
  addRelationship(name: String);

  /**
   * Sets a relationship between two people.
   * @param fromName Name of the from Person.
   * @param toName Name of the to person.
   * @param relationship Type of relationship.
   */
  setRelationship(fromName: String, toName: String, relationship: String);

  /**
   * Sets a couple between two people.
   * @param fromPerson From Person object.
   * @param toPerson To Person object.
   */
  setCouple(fromPerson: Person, toPerson: Person);
  /**
   * Sets a parent-child relationship between two people.
   * @param fromPerson From Person object.
   * @param toPerson To Person object.
   */
  setChild(fromPerson: Person, toPerson: Person);
  /**
   * Sets a child-parent relationship between two people.
   * @param fromPerson From Person object.
   * @param toPerson To Person object.
   */
  setParents(fromPerson: Person, toPerson: Person);
  /**
   * Gets the sons of a particular person.
   * @param fromName Name of the person whose sons have to be found.
   */
  findSons(fromName: String): String[];
  /**
   * Gets all the daughters of a particular person
   * (daughters,grand daughters and great grand daughters)
   * @param fromName Name of the person whose daughters have to be found.
   */
  findAllDaughters(fromName: String);
  /**
   * Lists all the people added to the family tree.
   */
  getAllPeople(): String[];
}

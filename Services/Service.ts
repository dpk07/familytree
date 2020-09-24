import { Person, Couple, Service, PersonDto, CoupleDto } from "../Interfaces";
import CoupleImpl from "../Models/Couple";
import Gender from "../Models/Gender";
export default class ServiceImpl implements Service {
  personDto: PersonDto;
  coupleDto: CoupleDto;
  relationships: Set<String> = new Set<String>();
  constructor(personDto: PersonDto, coupleDto: CoupleDto) {
    this.personDto = personDto;
    this.coupleDto = coupleDto;
  }
  getAllPeople(): String[] {
    return this.personDto.getAll();
  }
  addPerson(p: Person) {
    this.personDto.addPerson(p);
  }
  addCouple(c: Couple) {
    this.coupleDto.addCouple(c);
  }
  getPerson(name: String): Person {
    return this.personDto.getPerson(name);
  }
  getCouple(name: String): Couple {
    return this.coupleDto.getCouple(name);
  }
  addRelationship(name: String) {
    this.relationships.add(name.toLowerCase());
  }
  setRelationship(fromName: String, toName: String, relationship: String) {
    relationship = relationship.toLocaleLowerCase();
    if (!this.relationships.has(relationship)) {
      throw new Error("Relationship doesn't exist");
    }
    const fromPerson: Person = this.getPerson(fromName);
    const toPerson: Person = this.getPerson(toName);
    if (!fromPerson) {
      throw new Error(`Person with name ${fromName} not found`);
    }
    if (!toPerson) {
      throw new Error(`Person with name ${toName} not found`);
    }
    switch (relationship) {
      case "husband":
      case "wife":
      case "partner": {
        this.setCouple(fromPerson, toPerson);
        break;
      }
      case "son":
      case "child":
      case "daughter": {
        if (relationship === "son") {
          fromPerson.setGender(Gender.MALE);
        } else {
          fromPerson.setGender(Gender.FEMALE);
        }
        this.setChild(fromPerson, toPerson);
        break;
      }
      case "father":
      case "mother":
      case "parent": {
        this.setParents(fromPerson, toPerson);
        break;
      }
    }
  }
  setCouple(fromPerson: Person, toPerson: Person) {
    //Couple already exists
    if (fromPerson.coupleId) {
      const fromCouple: Couple = this.getCouple(fromPerson.coupleId);
      //Finally set person2 in the couple.
      fromCouple.setPerson2(toPerson);
      if (toPerson.coupleId) {
        if (fromPerson.coupleId === toPerson.coupleId) return;
        //If toPerson has a different couple Id, copy children from toPerson to fromPerson
        //Set fromCouple to toCouple and delete old Couple
        const toCouple: Couple = this.getCouple(toPerson.coupleId);
        fromCouple.copyChildren(toCouple);
        this.coupleDto.deleteCouple(toPerson.coupleId); //Delete the old couple
        toPerson.setCouple(fromPerson.coupleId);
      } else {
        //This means that there is just one couple
        //So we can set that couple to the toPerson.
        toPerson.setCouple(fromPerson.coupleId);
      }
    } else {
      if (toPerson.coupleId) {
        //This means that person2 has a couple already but person1 doesn't.
        const toCouple: Couple = this.getCouple(toPerson.coupleId);
        toCouple.setPerson2(fromPerson);
        fromPerson.setCouple(toPerson.coupleId);
      } else {
        //Couple doesn't exist, so create new couple
        //Set it to two people
        const couple: Couple = new CoupleImpl(fromPerson.name);
        couple.setPerson1(fromPerson);
        couple.setPerson2(toPerson);
        this.addCouple(couple);
        fromPerson.setCouple(couple.name);
        toPerson.setCouple(couple.name);
      }
    }
  }
  setChild(fromPerson: Person, toPerson: Person) {
    if (toPerson.coupleId) {
      const couple: CoupleImpl = this.getCouple(toPerson.coupleId);
      //Couple exists so just add the child to that couple.
      addChildToCouple(couple, fromPerson);
    } else {
      //Couple doesn't exist so create a couple and add the child.
      const newCouple = new CoupleImpl(toPerson.name);
      toPerson.setCouple(toPerson.name);
      newCouple.setPerson1(toPerson);
      this.addCouple(newCouple);
      addChildToCouple(newCouple, fromPerson);
    }
  }
  setParents(fromPerson: Person, toPerson: Person) {
    this.setChild(toPerson, fromPerson);
  }
  findSons(fromName: String): String[] {
    const fromPerson: Person = this.getPerson(fromName);
    //This means that the person doesn't have a couple yet, so no children.
    if (!fromPerson.coupleId) return [];
    const couple: Couple = this.coupleDto.getCouple(fromPerson.coupleId);
    return couple.findSons();
  }
  findDaughters(fromName: String): String[] {
    const fromPerson: Person = this.getPerson(fromName);
    //This means that the person doesn't have a couple yet, so no children.
    if (!fromPerson.coupleId) return [];
    const couple: Couple = this.coupleDto.getCouple(fromPerson.coupleId);
    return couple.findDaughters();
  }

  findAllDaughters(fromName: String) {
    const fromPerson: Person = this.getPerson(fromName);
    //This means that the person doesn't have a couple yet, so no children.
    if (!fromPerson.coupleId) return [];
    const couple: Couple = this.coupleDto.getCouple(fromPerson.coupleId);
    let result: String[] = [];
    //Find the daughters.
    result = [...this.findDaughters(fromName)];
    const children = Array.from(couple.children.values());
    const grandChildren: Person[] = [];
    //Find grand daughters.
    children.map((child) => {
      if (child.coupleId) {
        let currentGrandChildren = this.getCouple(child.coupleId).children;
        grandChildren.push(...Array.from(currentGrandChildren.values()));
        result.push(...this.findDaughters(child.name));
      }
    });
    //Find great grand daughters.
    grandChildren.map((grandChild) => {
      if (grandChild.coupleId) {
        result.push(...this.findDaughters(grandChild.name));
      }
    });
    return result;
  }
}

const addChildToCouple = (couple: Couple, person: Person) => {
  person.parentId = couple.name;
  couple.addChild(person);
};

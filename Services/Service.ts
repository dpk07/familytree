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
      case "daughter": {
        if (relationship === "son") {
          fromPerson.gender = Gender.MALE;
        } else {
          fromPerson.gender = Gender.FEMALE;
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
    if (fromPerson.coupleId) {
      const fromCouple: Couple = this.getCouple(fromPerson.coupleId);
      if (toPerson.coupleId) {
        const toCouple: Couple = this.getCouple(toPerson.coupleId);
        fromCouple.copyChildren(toCouple);
        this.coupleDto.deleteCouple(toPerson.coupleId);
        toPerson.coupleId = fromPerson.coupleId;
      } else {
        toPerson.coupleId = fromPerson.coupleId;
      }
      fromCouple.setPerson2(toPerson);
    } else {
      if (toPerson.coupleId) {
        const toCouple: Couple = this.getCouple(toPerson.coupleId);
        toCouple.setPerson2(fromPerson);
        fromPerson.coupleId = toPerson.coupleId;
      } else {
        const couple: Couple = new CoupleImpl(fromPerson.name);
        couple.setPerson1(fromPerson);
        couple.setPerson2(toPerson);
        this.addCouple(couple);
        fromPerson.coupleId = couple.name;
        toPerson.coupleId = couple.name;
      }
    }
  }
  setChild(fromPerson: Person, toPerson: Person) {
    const couple: CoupleImpl = this.getCouple(toPerson.coupleId);
    if (couple) {
      addChildToCouple(couple, fromPerson);
    } else {
      const newCouple = new CoupleImpl(toPerson.name);
      toPerson.coupleId = toPerson.name;
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
    if (!fromPerson) throw new Error("Person not found");
    if (!fromPerson.coupleId) return [];
    const couple: Couple = this.coupleDto.getCouple(fromPerson.coupleId);
    if (!couple) throw new Error("Couple not found");

    return couple.findSons();
  }
  findDaughters(fromName: String): String[] {
    const fromPerson: Person = this.getPerson(fromName);
    if (!fromPerson) throw new Error("Person not found");
    if (!fromPerson.coupleId) return [];
    const couple: Couple = this.coupleDto.getCouple(fromPerson.coupleId);
    if (!couple) throw new Error("Couple not found");
    return couple.findDaughters();
  }

  findAllDaughters(fromName: String) {
    const fromPerson: Person = this.getPerson(fromName);
    if (!fromPerson) throw new Error("Person not found");
    if (!fromPerson.coupleId) return [];
    const couple: Couple = this.coupleDto.getCouple(fromPerson.coupleId);
    if (!couple) throw new Error("Couple not found");
    const daughters: String[] = couple.findDaughters();
    const grandDaughters: String[] = [];
    daughters.map((daughter) => {
      grandDaughters.push(...this.findDaughters(daughter));
    });
    const greatGrandDaugters: String[] = [];
    grandDaughters.map((grandDaughter) => {
      greatGrandDaugters.push(...this.findDaughters(grandDaughter));
    });
    return [...daughters, ...grandDaughters, ...greatGrandDaugters];
  }
}

const addChildToCouple = (couple: Couple, person: Person) => {
  person.parentId = couple.name;
  couple.addChild(person);
};

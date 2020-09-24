import { Service, PersonDto, CoupleDto } from "../Interfaces";
import { InMemoryCoupleDto, InMemoryPersonDto } from "../DTO";
import Person from "../Models/Person";
import Gender from "../Models/Gender";
import ServiceImpl from "../Services/Service";

//Creating DTO Objects
//Currently using In memory dto, can be swapped with a database dto.
const inMemoryPersonDto: PersonDto = new InMemoryPersonDto();
const inMemoryCoupleDto: CoupleDto = new InMemoryCoupleDto();

//Create the service for handling queries
const service: Service = new ServiceImpl(inMemoryPersonDto, inMemoryCoupleDto);
beforeAll(() => {
  service.addRelationship("father");
  service.addRelationship("son");
  service.addRelationship("daughter");
  service.addRelationship("Husband");
  service.addRelationship("wife");
  service.addRelationship("mother");

  service.addPerson(new Person("Mary Arden", Gender.FEMALE));
  service.addPerson(new Person("Joan", Gender.FEMALE));
  service.addPerson(new Person("Joana", Gender.FEMALE));
  service.addPerson(new Person("Margaret", Gender.FEMALE));
  service.addPerson(new Person("Gilbert", Gender.MALE));
  service.addPerson(new Person("Anne", Gender.FEMALE));
  service.addPerson(new Person("Richard", Gender.MALE));
  service.addPerson(new Person("Edmund", Gender.MALE));
  service.addPerson(new Person("William", Gender.MALE));
  service.addPerson(new Person("Anne Hathaway", Gender.FEMALE));
  service.addPerson(new Person("Susanna", Gender.FEMALE));
  service.addPerson(new Person("Judith", Gender.FEMALE));
  service.addPerson(new Person("Elizabeth", Gender.FEMALE));
  service.addPerson(new Person("Beth", Gender.FEMALE));
  service.addPerson(new Person("John Hall", Gender.MALE));
  service.addPerson(new Person("Hamnet", Gender.MALE));
});

test("Adding unsupported relationship throws exception", () => {
  expect(() => service.addRelationship("Uncle")).toThrow(
    "This type of relationship is currently not supported."
  );
});

test("Adding supported relationship gets added successfully", () => {
  expect(() => {
    service.addRelationship("child");
  }).toBeTruthy();
});

test("Person gets added successfully", () => {
  let p3 = new Person("John Shakespeare", Gender.MALE);
  service.addPerson(p3);
  expect(p3).toBe(service.getPerson(p3.name));
});

test("Person with same name throws error", () => {
  let p3 = new Person("John Shakespeare", Gender.MALE);
  expect(() => service.addPerson(p3)).toThrow(
    "Person with this name already exists. Please add a middle name."
  );
});

test("John-Mary Couple gets created", () => {
  service.setRelationship("John Shakespeare", "Mary Arden", "husband");
  let couple = inMemoryCoupleDto.getCouple("John Shakespeare");
  expect(couple.person1.name).toBe("John Shakespeare");
  expect(couple.person2.name).toBe("Mary Arden");
});

test("Adding a partner to already complete Couple should throw error.", () => {
  expect(() =>
    service.setRelationship("John Shakespeare", "William", "husband")
  ).toThrow("The couple already has two members.");
});

test("Mary Arden Daughter count returns 1", () => {
  service.setRelationship("Joan", "Mary Arden", "daughter");
  let daughters = service.findAllDaughters("Mary Arden");
  expect(daughters.length).toBe(1);
});

test("Mary Arden Daughter count returns 4", () => {
  service.setRelationship("Margaret", "Mary Arden", "daughter");
  service.setRelationship("Anne", "Mary Arden", "daughter");
  service.setRelationship("Joana", "Mary Arden", "daughter");
  let daughters = service.findAllDaughters("Mary Arden");
  expect(daughters.length).toBe(4);
});

test("John Son count returns 1", () => {
  service.setRelationship("Gilbert", "Mary Arden", "son");
  let sons = service.findSons("John Shakespeare");
  expect(sons.length).toBe(1);
});

test("John Son count returns 4", () => {
  service.setRelationship("Richard", "Mary Arden", "son");
  service.setRelationship("Edmund", "Mary Arden", "son");
  service.setRelationship("William", "Mary Arden", "son");
  let sons = service.findSons("John Shakespeare");
  expect(sons.length).toBe(4);
});

test("William-Anne Couple gets created", () => {
  service.setRelationship("William", "Anne Hathaway", "husband");
  let couple = inMemoryCoupleDto.getCouple("William");
  expect(couple.person1.name).toBe("William");
  expect(couple.person2.name).toBe("Anne Hathaway");
});

test("Mary Arden Daughter count returns 5", () => {
  service.setRelationship("William", "Susanna", "father");
  let daughters = service.findAllDaughters("Mary Arden");
  expect(daughters.length).toBe(5);
});

test("Mary Arden Daughter count returns 6", () => {
  service.setRelationship("William", "Judith", "father");
  let daughters = service.findAllDaughters("Mary Arden");
  expect(daughters.length).toBe(6);
});

test("Mary Arden Daughter count returns 7", () => {
  service.setRelationship("Susanna", "Elizabeth", "mother");
  let daughters = service.findAllDaughters("Mary Arden");
  expect(daughters.length).toBe(7);
});

test("Anne Hathaway Daughter count returns 3", () => {
  let daughters = service.findAllDaughters("Anne Hathaway");
  expect(daughters.length).toBe(3);
});

test("Mary Arden Daughter count returns 7", () => {
  service.setRelationship("Elizabeth", "Beth", "mother");
  let daughters = service.findAllDaughters("Mary Arden");
  expect(daughters.length).toBe(7);
});

test("Anne Hathaway Daughter count returns 4", () => {
  let daughters = service.findAllDaughters("Anne Hathaway");
  expect(daughters.length).toBe(4);
});

test("John-Susanna Couple gets created", () => {
  service.setRelationship("John Hall", "Susanna", "husband");
  let couple = inMemoryCoupleDto.getCouple("Susanna");
  expect(couple.person2.name).toBe("John Hall");
  expect(couple.person1.name).toBe("Susanna");
});

test("William Son count returns 1", () => {
  service.setRelationship("Hamnet", "William", "son");
  let sons = service.findSons("William");
  expect(sons.length).toBe(1);
});

export interface Person {
  name: String;
  coupleId: String;
  parentId: String;
  gender: String;
  setParent(parentId: String);
  setCouple(coupleId: String);
  setGender(gender: String);
}

import { Couple, CoupleDto } from "../Interfaces";
export default class InMemoryCoupleDto implements CoupleDto {
  deleteCouple(name: String) {
    this.coupleMap.delete(name);
  }
  coupleMap: Map<String, Couple> = new Map<String, Couple>();
  addCouple(couple: Couple) {
    this.coupleMap.set(couple.name, couple);
  }
  getCouple(name: String): Couple {
    if (!this.coupleMap.has(name))
      throw new Error("Couple ID Exists, but couple not found");
    return this.coupleMap.get(name);
  }
}

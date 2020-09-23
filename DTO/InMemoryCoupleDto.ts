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
    return this.coupleMap.get(name);
  }
}

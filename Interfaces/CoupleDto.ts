import { Couple } from "./";
export interface CoupleDto {
  addCouple(couple: Couple);
  getCouple(name: String): Couple;
  deleteCouple(name: String);
}

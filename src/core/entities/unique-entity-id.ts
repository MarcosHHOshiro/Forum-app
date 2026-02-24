import { randomUUID } from "node:crypto";

export class UniqueEntityId {
  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  equals(id: UniqueEntityId) {
    if (id === null || id === undefined) {
      return false;
    }
    return this.value === id.toValue();
  }
}
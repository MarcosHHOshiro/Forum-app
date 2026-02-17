//error
export class Left {
  readonly value: any;

  constructor(value: any) {
    this.value = value;
  }
}

//success
export class Right {
  readonly value: any;

  constructor(value: any) {
    this.value = value;
  }
}

export const left = (value: any) => {
  return new Left(value);
}

export const right = (value: any) => {
  return new Right(value);
}
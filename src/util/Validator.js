class Validator {
  #data;
  #fail;
  constructor(data) {
    this.#data = this.#assertArray(data);
    this.#fail = false;
  }

  #assertArray(data) {
    if (!(data instanceof Array)) return [data];
    return data;
  }

  failed() {
    return this.#fail;
  }

  len(length) {
    if (!(this.#data instanceof Array)) this.#fail = true;

    if (this.#data.length !== length) this.#fail = true;

    return this;
  }

  onlyInt() {
    for (const num of this.#data) {
      if (!Number.isInteger(num)) this.#fail = true;
    }

    return this;
  }

  inRange(begin, end) {
    for (const num of this.#data) {
      if (num < begin || num > end) this.#fail = true;
    }

    return this;
  }

  unique() {
    const numberSet = new Set(this.#data);

    if (numberSet.size !== this.#data.length) this.#fail = true;

    return this;
  }
}

export default Validator;

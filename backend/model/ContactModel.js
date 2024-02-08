export default class ContactModel {
  #contact_id;
    #email;
  #phone;
  #subject;
  #address;
  #message;

  constructor(email, phone, subject, address, message) {
    this.#email = this.validateEmail(email);
    this.#phone = this.validatePhone(phone);
    this.#subject = subject;
    this.#address = address;
    this.#message = message;
  }

  validateEmail(email) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return email;
    } else {
      throw new Error("Invalid email format");
    }
  }

  validatePhone(phone) {
    let re = /^9\d{9}$/;
    if (re.test(phone)) {
      return phone;
    } else {
      throw new Error(
        "Phone number must start with 9 and have exactly 10 digits"
      );
    }
  }

  getContact_id() {
    return this.#contact_id;
  }

  getEmail() {
    return this.#email;
  }

  getPhone() {
    return this.#phone;
  }

  getSubject() {
    return this.#subject;
  }

  getAddress() {
    return this.#address;
  }

  getMessage() {
    return this.#message;
  }

  setEmail(value) {
    this.#email = this.validateEmail(value);
  }

  setPhone(value) {
    this.#phone = this.validatePhone(value);
  }

  setSubject(value) {
    this.#subject = value;
  }

  setAddress(value) {
    this.#address = value;
  }

  setMessage(value) {
    this.#message = value;
  }
}


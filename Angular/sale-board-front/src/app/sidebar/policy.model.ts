class Seller {
  public firstName: string;
  public lastName: string;


  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export class Policy {
  public seller: Seller;
  public policyValue: string;


  constructor(seller: Seller, policyValue: string) {
    this.seller = seller;
    this.policyValue = policyValue;
  }
}

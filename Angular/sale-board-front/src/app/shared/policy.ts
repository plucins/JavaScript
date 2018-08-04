
export class Policy {
  id: number;
  brand = 'Marka';
  policyNumber: string;
  customer = new Customer();
  policyValue: string;
  incomeSource = 'Kolejka';
  saleDate: string;
  extraInfo: string;
  seller = new Seller();

  constructor() {
  }

}

export class Customer {
  id: number;
  phoneNumber: string;

  constructor() {
  }

}

export class Seller {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;

  constructor() {
  }

}

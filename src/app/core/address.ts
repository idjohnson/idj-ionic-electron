import { Endpoint } from "./endpoint";

export class Address {
  // These fields come from the Dispatcher API
  public addressId: number | string = 8;
  public addressLine1: string = '';
  public addressLine2: string = '';
  public houseNumber: string = '';
  public prefixDirectional: string = '';
  public streetName: string = '';
  public community: string = '';
  public state: string = '';
  public longitude: string = '';
  public latitude: string = '';
  public postalCode: string = '';
  public zipPlusFour: string = '';
  public addressStatus: string = '';
  public endpoint: Endpoint;

  // These fields are local app enhancements
  public name: string = '';
  public lastUsed: string = '';
  public icon: string = '';
  public isProvisioned: boolean = false;


  constructor(
    address1: string = '',
    address2: string = '',
    community: string = '',
    state: string = '',
    postalCode: string = '',
    longitude: string = '',
    latitude: string = '',
    name: string = '',
    icon: string = '',
  ) {
    this.name = name;
    this.icon = icon;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.community = community;
    this.state = state;
    this.postalCode = postalCode;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  toString() : string {
    let result = `${this.addressLine1||''} ${this.addressLine2||''} ${this.community||''}, ${this.state} ${this.zip}`;
    return result;
  }
}

/*
getAddressesByPhone(phone: string): Promise<Address[]> {
  const url = `${dispatcherApi.url}/GetAddressesByDid/${phone}`;

  return this.http.get(url)
    .retry(2)
    .map(x => {
      var result: Address[] = x.json();
      return result;
    })
    .toPromise();
}

validateAddress(address: Address): Promise<Address> {
  const url = `${dispatcherApi.url}/ValidateAddress`;

  return this.http.post(url, address)
    .map(x => {
      let result: Address = x.json();
      return result;
    }).toPromise();
}

addAddress(address: Address): Promise<Address> {
  const url = `${dispatcherApi.url}/AddAddress`;

  return this.http.post(url, address)
  .map(x => {
    let result: Address = x.json();
    return result;
  }).toPromise();
}

provisionAddress(address: Address): Promise<boolean> {
  const url = `${dispatcherApi.url}/ProvisionAddress`;
  var headers = new Headers();
  this.createHeaders(headers);

  return this.http.post(url, address.addressId, { headers: headers })
    .map(x => {
      return true;
    }).toPromise();
}

createHeaders(headers: Headers) {
  headers.append('Authorization', dispatcherApi.auth);
  headers.append('Accept', 'application/json');
}

removeAddress(address: Address): Promise<boolean> {
  const url = `${dispatcherApi.url}/RemoveAddress/${address.addressId}`;
  return this.http.delete(url)
    .map(x => true)
    .toPromise();
}

//ipc
updateLocations(addresses: Address[]) {
  if (this.electron.ipcRenderer) {
    this.electron.ipcRenderer.send('Locations', addresses);
  }
}

//setup
fetchPerson(): Promise<Person> {
  var p = Promise.resolve<Person>(this.person);
  return p;
}

setPerson(person: Person): Promise<Person> {
  this.person.name = person.name;
  this.person.phone = person.phone;
  return this.fetchPerson();
}

//address service
async fetchAll(): Promise<Address[]> {
  let person = await this.setupService.fetchPerson();
  let addresses = await this.dispatcher
    .getAddressesByPhone(person.phone);
  this.ipc.updateLocationsMenu(addresses);
  return addresses;
}

validate(address: Address): Promise<Address> {
  return this.dispatcher.validateAddress(address);
}

async add(address: Address): Promise<Address> {
  let person = await this.setupService.fetchPerson();
  address.endpoint = {
    callerName: person.name,
    did: person.phone
  };

  return this.dispatcher.addAddress(address);
}

provision(address: Address): Promise<boolean> {
  return this.dispatcher.provisionAddress(address);
}

remove(address: Address): Promise<boolean> {
  return this.dispatcher.removeAddress(address);
}

*/

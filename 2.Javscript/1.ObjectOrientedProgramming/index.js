//Introduction To Object Oriented Programming

class Person {
  constructor(name, age) {
    this.name = name; //This Are Fields Not Variables in OOPS
    this.age = age; //This Are Fields Not Variables in OOPS
    this.job = "";
  }

  //Method To GetName
  getName = () => {
    //This Are Methods not functions In OOPS
    return this.name;
  };

  //Method To GetAge
  getAge = () => {
    //This Are Methods not functions In OOPS
    return this.age;
  };

  setJob(job) {
    this.job = job;
  }
}
// Instantiating the class (creating an instance)
let Person1 = new Person("Pedro", 19); //The new keyword is used to instantiate (create) an object from  class.
let Person2 = new Person("Moise Keane", 23);

console.log(Person1); // Output: Person { name: 'Pedro', age: 19 }
console.log(Person2); // Output: Person { name: 'Moise Keane', age: 23 }

class House {
  constructor(address, price, residents) {
    this.address = address;
    this.price = price;
    this.residents = residents;
  }

  //Method to Get Address
  getAddress = () => {
    return this.address;
  };

  //Method To Get Price
  getPrice = () => {
    return this.price;
  };
  //Method to Get Residents
  getResidents = () => {
    return this.residents;
  };

  //Method To Add Residence
  addResidents = (resident) => {
    this.residents.push(resident);
  };
}

let Pedro = new Person("Pedro", 19);
let David = new Person("David", 21);

//Instantiang The Class
// let house = new House("jkjkjk", 280000, [Pedro, David]);
// console.log(house);

// let Paulo = new Person("Paulo", 19);
// house.addResidents(Paulo);
// console.log(house.getResidents());

//Abstraction
// house1.addResidents(new Person("Pedro", 19));

let house = new House("adsg", 2030, []);
console.log(house.getResidents());

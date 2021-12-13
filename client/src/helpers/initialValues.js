import { binaryToArray } from "helpers/daysHandler";

export const customerRegistration = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

export const clientRegistration = {
  ...customerRegistration,
  storeName: "",
  category: [],
  number: "",
  address: "",
  state: "Delhi",
  city: "",
  pincode: "",
  role: "Client",
};

export const user = {
  name: "",
  email: "",
  password: "",
  storeName: "",
  category: [],
  number: "",
  address: "",
  state: "Delhi",
  city: "",
  pincode: "",
  role: "Customer",
};

export const directory = {
  storeName: "",
  user: "",
  email: "",
  number: "",
  category: [],
  address: "",
  state: "Delhi",
  city: "",
  pincode: "",
};

export const directoryAdditional = (directory) => {
  return {
    description: directory.description,
    website: directory.website,
    tagline: directory.tagline,
    username: directory.username,
    features: [...directory.features],
    products: [...directory.products],
    services: [...directory.services],
    gallery: [...directory.gallery],
    details: JSON.parse(JSON.stringify(directory.details)),
    timings: JSON.parse(JSON.stringify(directory.timings)),
    location: JSON.parse(JSON.stringify(directory.location)),
    faq: JSON.parse(JSON.stringify(directory.faq)),
    directoryImages: [],
  };
};

export const directoryUpdate = (directory) => {
  return {
    ...directoryAdditional(directory),
    storeName: directory.storeName,
    user: directory.user,
    email: directory.email,
    number: directory.number,
    address: directory.address,
    state: directory.state,
    city: directory.city,
    pincode: directory.pincode,
    category: [...directory.category],
  };
};

export const clientUpdate = (user, directory) => {
  return {
    name: user.name,
    profileImage: null,
    storeName: directory.storeName,
    category: [...directory.category],
    number: directory.number,
    address: directory.address,
    state: directory.state,
    city: directory.city,
    pincode: directory.pincode,
  };
};

export const product = (
  _product = {
    name: "",
    description: "",
    category: "",
    price: 0,
    countInStock: 0,
    petType: [],
    breedType: "",
    weight: 0,
    size: {
      length: 0,
      height: 0,
      width: 0,
    },
    isVeg: false,
    ageRange: {
      min: 0,
      max: 0,
    },
  }
) => {
  return {
    name: _product.name,
    description: _product.description,
    category: _product.category,
    price: _product.price,
    countInStock: _product.countInStock,
    petType: _product.petType,
    breedType: _product.breedType,
    weight: _product.weight,
    size: _product.size,
    isVeg: _product.isVeg,
    ageRange: _product.ageRange,
    productImages: [],
  };
};

export const service = (
  _service = {
    name: "",
    description: "",
    address: "",
    nameOfIncharge: "",
    numberOfIncharge: "",
    timings: {
      from: "00:00",
      to: "00:00",
    },
    days: [],
    category: "",
    price: 0,
    petType: [],
    breedType: "",
    ageRange: {
      min: 0,
      max: 0,
    },
  }
) => {
  return {
    name: _service.name,
    description: _service.description,
    address: _service.address,
    nameOfIncharge: _service.nameOfIncharge,
    numberOfIncharge: _service.numberOfIncharge,
    timings: _service.timings,
    days: typeof _service.days === "number" ? binaryToArray(_service.days) : _service.days,
    category: _service.category,
    price: _service.price,
    petType: _service.petType,
    breedType: _service.breedType,
    ageRange: _service.ageRange,
    serviceImages: [],
  };
};

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
    ...directoryAdditional(),
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

export const product = (_product) => {
  return {
    name: _product.name || "",
    description: _product.description || "",
    category: _product.category || "",
    price: _product.price || 0,
    countInStock: _product.countInStock || 0,
    petType: _product.petType || [],
    breedType: _product.breedType || "",
    weight: _product.weight || 0,
    size: _product.size || {
      length: 0,
      height: 0,
      width: 0,
    },
    isVeg: _product.isVeg || false,
    ageRange: _product.ageRange || {
      min: 0,
      max: 0,
    },
    productImages: [],
  };
};

export const service = (_service) => {
  return {
    name: _service.name || "",
    description: _service.description || "",
    address: _service.address || "",
    nameOfIncharge: _service.nameOfIncharge || "",
    numberOfIncharge: _service.numberOfIncharge || "",
    timings: _service._timings || {
      from: "00:00",
      to: "00:00",
    },
    days: _service ? binaryToArray(_service.days) : [],
    category: _service.category || "Others",
    price: _service.price || 0,
    petType: _service.petType || [],
    breedType: _service.breedType || "",
    ageRange: _service.ageRange || {
      min: 0,
      max: 0,
    },
    serviceImages: [],
  };
};

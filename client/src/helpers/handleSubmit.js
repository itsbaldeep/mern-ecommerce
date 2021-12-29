import { arrayToBinary } from "helpers/daysHandler";

export const directoryAdditional = (values, directory) => {
  // Converting to FormData and updating only modified fields
  const fd = new FormData();

  // Plain text fields
  if (values.description !== directory.description) fd.append("description", values.description);
  if (values.tagline !== directory.tagline) fd.append("tagline", values.tagline);
  if (values.website !== directory.website) fd.append("website", values.website);
  if (values.username !== directory.username) fd.append("username", values.username);

  // Stringifying objects
  const detailsJSON = JSON.stringify(values.details);
  if (detailsJSON !== JSON.stringify(directory.details)) fd.append("details", detailsJSON);
  const timingsJSON = JSON.stringify(values.timings);
  if (timingsJSON !== JSON.stringify(directory.timings)) fd.append("timings", timingsJSON);
  const faqJSON = JSON.stringify(values.faq);
  if (faqJSON !== JSON.stringify(directory.faq)) fd.append("faq", faqJSON);
  const locationJSON = JSON.stringify(values.location);
  if (locationJSON !== JSON.stringify(directory.location)) fd.append("location", locationJSON);

  // Stringifying arrays
  if (values.features.toString() !== directory.features.toString())
    fd.append("features", values.features);
  if (values.gallery.toString() !== directory.gallery.toString())
    fd.append("gallery", values.gallery);
  if (values.products.toString() !== directory.products.toString())
    fd.append("products", values.products);
  if (values.services.toString() !== directory.services.toString())
    fd.append("services", values.services);

  // Images
  const filesLength = values.directoryImages.length;
  if (filesLength > 0) {
    for (let i = 0; i < filesLength; i++) fd.append("directoryImages", values.directoryImages[i]);
  }
  return fd;
};

export const directoryUpdate = (values, directory) => {
  const fd = directoryAdditional(values, directory);
  if (values.storeName !== directory.storeName) fd.append("storeName", values.storeName);
  if (values.address !== directory.address) fd.append("address", values.address);
  if (values.state !== directory.state) fd.append("state", values.state);
  if (values.city !== directory.city) fd.append("city", values.city);
  if (values.pincode !== directory.pincode) fd.append("pincode", values.pincode);
  if (values.number !== directory.number) fd.append("number", values.number);
  if (values.user !== (directory.user?._id || "")) fd.append("user", values.user);
  if (values.category.toString() !== directory.category.toString())
    fd.append("category", values.category);
  return fd;
};

export const clientUpdate = (values, user, directory) => {
  // Updating only those fields that have been modified
  const data = {};
  for (const value in values) {
    if (values[value] !== directory[value]) data[value] = values[value];
  }
  if (values.name !== user.name) data.name = values.name;

  // Fixing category comparision
  if (values.category.toString() === directory.category.toString()) delete data.category;

  // Converting to FormData
  const fd = new FormData();
  for (const key in data) fd.append(key, data[key]);
  return fd;
};

export const newProduct = (values) => {
  // Converting to FormData
  const fd = new FormData();
  for (const key in values) fd.append(key, values[key]);
  fd.set("size", JSON.stringify(values.size));
  fd.set("ageRange", JSON.stringify(values.ageRange));
  fd.set("affiliateLinks", JSON.stringify(values.affiliateLinks));
  fd.delete("productImagesUpload");

  // Prioritizing links first
  if (values.productImages.length > 0) return fd;

  // Move productImagesUpload to productImages in form data
  fd.delete("productImages");
  const filesLength = values.productImagesUpload.length;
  if (filesLength > 0) {
    for (let i = 0; i < filesLength; i++) fd.append("productImages", values.productImagesUpload[i]);
  }
  return fd;
};

export const updateProduct = (values, product) => {
  // Converting to FormData and updating only modified fields
  const fd = new FormData();

  // Plain text fields
  if (values.name !== product.name) fd.append("name", values.name);
  if (values.description !== product.description) fd.append("description", values.description);
  if (values.seller !== product.seller) fd.append("seller", values.seller);
  if (values.category !== product.category) fd.append("category", values.category);
  if (values.price !== product.price) fd.append("price", values.price);
  if (values.countInStock !== product.countInStock) fd.append("countInStock", values.countInStock);
  if (values.isVeg !== product.isVeg) fd.append("isVeg", values.isVeg);
  if (values.weight !== product.weight) fd.append("weight", values.weight);
  if (values.breedType !== product.breedType) fd.append("breedType", values.breedType);

  // Object fields
  const sizeJSON = JSON.stringify(values.size);
  if (sizeJSON !== JSON.stringify(product.size)) fd.append("size", sizeJSON);
  const ageRangeJSON = JSON.stringify(values.ageRange);
  if (ageRangeJSON !== JSON.stringify(product.ageRange)) fd.append("ageRange", ageRangeJSON);
  const affiliateLinksJSON = JSON.stringify(values.affiliateLinks);
  if (affiliateLinksJSON !== JSON.stringify(product.affiliateLinks))
    fd.append("affiliateLinks", affiliateLinksJSON);

  // Array fields
  if (values.petType.toString() !== product.petType.toString())
    fd.append("petType", values.petType);

  // If image links are modified, update the links and ignore file uploads
  if (values.productImages.toString() !== product.productImages.toString()) {
    fd.append("productImages", values.productImages);
    return fd;
  }

  // If image links are not modified, add files to the formdata
  const filesLength = values.productImagesUpload.length;
  if (filesLength > 0) {
    for (let i = 0; i < filesLength; i++) fd.append("productImages", values.productImagesUpload[i]);
  }
  return fd;
};

export const newService = (values) => {
  // Converting to FormData
  const fd = new FormData();
  for (const key in values) if (values[key] !== "") fd.append(key, values[key]);
  fd.set("timings", JSON.stringify(values.timings));
  fd.set("ageRange", JSON.stringify(values.ageRange));
  // Converting days to binary number
  fd.set("days", arrayToBinary(values.days));

  // Images
  const filesLength = values.serviceImages.length;
  if (filesLength > 0) {
    for (let i = 0; i < filesLength; i++) fd.set("serviceImages", values.serviceImages[i]);
  }
  return fd;
};

export const updateService = (values, service) => {
  // Converting days to binary number
  const daysBinary = arrayToBinary(values.days);

  // Converting to FormData and updating only modified fields
  const fd = new FormData();

  // Plain text fields
  if (values.name !== service.name) fd.append("name", values.name);
  if (values.description !== service.description) fd.append("description", values.description);
  if (values.seller !== service.seller) fd.append("seller", values.seller);
  if (values.category !== service.category) fd.append("category", values.category);
  if (values.price !== service.price) fd.append("price", values.price);
  if (values.address !== service.address) fd.append("address", values.address);
  if (values.nameOfIncharge !== service.nameOfIncharge)
    fd.append("nameOfIncharge", values.nameOfIncharge);
  if (values.numberOfIncharge !== service.numberOfIncharge)
    fd.append("numberOfIncharge", values.numberOfIncharge);
  if (values.breedType !== service.breedType) fd.append("breedType", values.breedType);
  if (daysBinary !== service.days) fd.append("days", daysBinary);

  // Object fields
  const timingsJSON = JSON.stringify(values.timings);
  if (timingsJSON !== JSON.stringify(service.timings)) fd.append("timings", timingsJSON);
  const ageRangeJSON = JSON.stringify(values.ageRange);
  if (ageRangeJSON !== JSON.stringify(service.ageRange)) fd.append("ageRange", ageRangeJSON);

  // Array fields
  if (values.petType.toString() !== service.petType.toString())
    fd.append("petType", values.petType);

  // Images
  const filesLength = values.serviceImages.length;
  if (filesLength > 0) {
    for (let i = 0; i < filesLength; i++) fd.append("serviceImages", values.serviceImages[i]);
  }
  return fd;
};

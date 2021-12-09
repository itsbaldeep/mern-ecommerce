import * as Yup from "yup";

export const customerRegistration = Yup.object({
  name: Yup.string()
    .min(3, "Must be atleast 3 characters")
    .max(32, "Must be 32 characters or less")
    .required("Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 charaters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Re-enter your password"),
  terms: Yup.bool().oneOf([true], "You are required to check this"),
});

export const directoryRegistration = Yup.object({
  storeName: Yup.string()
    .min(3, "Business Name must contain atleast 3 characters")
    .max(64, "Business Name is too long")
    .required("Please provide a business name"),
  category: Yup.array().min(1, "Pick atleast one category").of(Yup.string()),
  number: Yup.number("Please provide a valid number").required("Please provide a phone number"),
  address: Yup.string()
    .min(8, "Address is too short")
    .max(256, "Address is too long")
    .required("Please provide an address"),
  state: Yup.string().required("Please provide a state"),
  city: Yup.string().required("Please provide a city"),
  pincode: Yup.number().required("Please provide a pincode"),
});

export const user = Yup.object({
  name: Yup.string()
    .min(3, "Must be atleast 3 characters")
    .max(32, "Must be 32 characters or less")
    .required("Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 charaters")
    .required("Password is required"),
  storeName: Yup.string()
    .min(3, "Business Name must contain atleast 3 characters")
    .max(64, "Business Name is too long"),
  category: Yup.array().of(Yup.string()),
  number: Yup.number("Please provide a valid number"),
  address: Yup.string().min(8, "Address is too short").max(256, "Address is too long"),
  state: Yup.string(),
  city: Yup.string(),
  pincode: Yup.number(),
});

export const directoryAdditional = Yup.object({
  features: Yup.array()
    .max(10, "You can only have a maximum of 10 features")
    .of(
      Yup.string()
        .required("This is a required field")
        .min(4, "This feature is too short")
        .max(16, "This feature is too long")
    ),
  details: Yup.array()
    .max(10, "You can only have a maximum of 10 details")
    .of(
      Yup.object({
        title: Yup.string()
          .required("The title is required")
          .min(4, "This title is too short")
          .max(12, "This title is too long"),
        content: Yup.string()
          .required("The description is required")
          .min(4, "This description is too short")
          .max(64, "This description is too long"),
      })
    ),
  website: Yup.string().matches(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
    "Please provide a valid website"
  ),
  tagline: Yup.string().max(32, "The tagline is too long"),
  description: Yup.string().max(1024, "The description is too long"),
  username: Yup.string(),
  products: Yup.array()
    .max(25, "You can only have a maximum of 25 products")
    .of(
      Yup.string()
        .required("This is a required field")
        .min(4, "This product name is too short")
        .max(32, "This product name is too long")
    ),
  services: Yup.array()
    .max(25, "You can only have a maximum of 25 products")
    .of(
      Yup.string()
        .required("This is a required field")
        .min(4, "This product name is too short")
        .max(32, "This product name is too long")
    ),
  location: Yup.object({
    lat: Yup.number(),
    lng: Yup.number(),
  }),
  timings: Yup.array()
    .max(7)
    .of(
      Yup.array()
        .max(2)
        .of(
          Yup.object({
            from: Yup.string(),
            to: Yup.string(),
          })
        )
    ),
  faq: Yup.array()
    .max(10)
    .of(
      Yup.object({
        question: Yup.string().min(2, "Question is too short").max(32, "Question is too long"),
        answer: Yup.string().min(2, "Answer is too short").max(1024, "Answer is too long"),
      })
    ),
  gallery: Yup.array().of(Yup.string()),
});

export const directoryUpdate = directoryRegistration.concat(directoryAdditional);

export const clientUpdate = Yup.object({
  name: Yup.string()
    .min(3, "Must be atleast 3 characters")
    .max(32, "Must be 32 characters or less")
    .required("Please enter your new name"),
}).concat(directoryRegistration);

export const product = Yup.object({
  name: Yup.string()
    .min(5, "Product name is too short")
    .max(32, "Product name is too long")
    .required("Please provide a product name"),
  description: Yup.string()
    .min(8, "Product description is too short")
    .max(1024, "Product description is too long")
    .required("Please provide a product description"),
  category: Yup.string().required("Pick atleast one category"),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Please provide a price"),
  countInStock: Yup.number()
    .positive("Please provide a positive count")
    .required("Please provide a count in stock"),
  petType: Yup.array().min(1, "Please provide a pet type").of(Yup.string()),
  breedType: Yup.string(),
  weight: Yup.number().min(0, "Weight must be positive"),
  size: Yup.object({
    length: Yup.number().min(0, "Length must be positive"),
    height: Yup.number().min(0, "Height must be positive"),
    width: Yup.number().min(0, "Width must be positive"),
  }),
  isVeg: Yup.boolean(),
  ageRange: Yup.object({
    min: Yup.number().min(0, "Minimum age should be atleast 0"),
    max: Yup.number().min(0, "Maximum age should be atleast 0"),
  }),
});

export const service = Yup.object({
  name: Yup.string()
    .min(5, "Product name is too short")
    .max(32, "Product name is too long")
    .required("Please provide a product name"),
  description: Yup.string()
    .min(8, "Product description is too short")
    .max(1024, "Product description is too long")
    .required("Please provide a product description"),
  category: Yup.string().required("Pick atleast one category"),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Please provide a price"),
  address: Yup.string()
    .min(8, "Address is too short")
    .max(128, "Address is too long")
    .required("Please provide address"),
  nameOfIncharge: Yup.string()
    .min(3, "Name of incharge is too short")
    .max(32, "Name of incharge is too long")
    .required("Please provide a name of the incharge for this service"),
  numberOfIncharge: Yup.string()
    .matches(
      /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
      "Please provide a valid phone number of the incharge"
    )
    .required("Please provide a phone number of the incharge"),
  timings: Yup.object({
    from: Yup.string().required("Please provide timings of this service"),
    to: Yup.string().required("Please provide timings of this service"),
  }),
  days: Yup.array().min(1, "Please pick atleast one day when this service is provided"),
  petType: Yup.array().min(1, "Please provide a pet type").of(Yup.string()),
  breedType: Yup.string(),
  ageRange: Yup.object({
    min: Yup.number().min(0, "Minimum age should be atleast 0"),
    max: Yup.number().min(0, "Maximum age should be atleast 0"),
  }),
});

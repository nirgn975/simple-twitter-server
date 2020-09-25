const users = [
  { firstName: "Nir", lastName: "Galon", username: "nirgn", email: "nir@example.com",  active: true, password: "12345", country: "israel", website: "https://nir.galon.io" },
  { firstName: "Adi", username: "adi", email: "adi@example.com", active: false, password: "123456", birthday: new Date(Date.now() - (24 * 60 * 60 * 1000)) },
];

export default users;

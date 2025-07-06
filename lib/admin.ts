const newUser = await authClient.admin.createUser({
  name: "Test User",
  email: "test@example.com",
  password: "password123",
  role: "user", // this can also be an array for multiple roles (e.g. ["user", "sale"])
  data: {
    // any additional on the user table including plugin fields and custom fields
    customField: "customValue",
  },
});
Add `.env` file, update the information form `.env.sample`.

To run the project
```
npm start
```

To see the prisma stdio:
```
  npx prisma studio
```


## Routes
'/health' - Get

'/auth'  - authenticate
```
post("/register");
post("/login");
```

'/user'   - authenticate
```
get("/profile");
```

'/subscription'  - authenticate | authorizeRole(USER_ROLE.CUSTOMER)
```
post("/");
get("/:userId");
put("/:subscriptionId");
delete("/:subscriptionId");
```


'/plan' - authenticate  | authorizeRole(USER_ROLE.ADMIN)
```
post("/"); // Create a new plan
put("/:planId"); // Update an existing plan
get("/"); // Get all plans
get("/:planId"); // Get a plan by ID
delete("/:planId"); // Delete a plan
```
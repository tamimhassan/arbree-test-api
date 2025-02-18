import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import subscriptionRoutes from './routes/subscription'
import planRoutes from "./routes/plan";
import { authenticateUser } from "./middleware/auth";
import { authorizeRole } from "./middleware/authorizeRole";
import { USER_ROLE } from "./utils/enum";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Hello')
})

app.use("/auth", authRoutes);
app.use("/user", authenticateUser, userRoutes);
app.use("/subscription", authenticateUser, authorizeRole(USER_ROLE.CUSTOMER),subscriptionRoutes);
app.use("/plan", authenticateUser, authorizeRole(USER_ROLE.ADMIN), planRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

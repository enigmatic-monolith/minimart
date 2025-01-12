import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authenticateToken, AuthRequest } from "./middleware/authentication";
import { authorizeRole } from "./middleware/authorization";
import productRoutes from "./routes/productRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(authenticateToken);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/product", productRoutes);
app.use("/task", taskRoutes);

// For testing purposes
app.get("/user_info", (req: AuthRequest, res: Response) => {
  res.send(req.user);
})

app.get("/admin_only", authorizeRole(['admin']), (req: AuthRequest, res: Response) => {
  res.send("Logged in as Admin");
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
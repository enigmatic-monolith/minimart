import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authenticateToken, AuthRequest } from "./middleware/authentication";
import { authorizeRole } from "./middleware/authorization";
import productRoutes from "./routes/productRoutes";
import taskRoutes from "./routes/taskRoutes";
import productRequestRoutes from "./routes/productRequestRoutes";
import userManagementRoutes from "./routes/userManagementRoutes";
import auditRoutes from "./routes/auditRoutes";
import orderRoutes from "./routes/orderRoutes";
import cors from "cors";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const openApiDocumentation = JSON.parse(fs.readFileSync("./openapi.json", 'utf-8'));

app.use(cors({
  origin: process.env.ORIGIN as string,
  optionsSuccessStatus: 200,
}))
app.use(express.json()); 
app.use(authenticateToken);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/product", productRoutes);
app.use("/task", taskRoutes);
app.use("/product_request", productRequestRoutes);
app.use("/users", userManagementRoutes);
app.use("/audit", auditRoutes);
app.use("/order", orderRoutes);

// For testing purposes
app.get("/user_info", (req: AuthRequest, res: Response) => {
  res.send(req.user);
})

app.get("/admin_only", authorizeRole(['admin']), (req: AuthRequest, res: Response) => {
  res.send("Logged in as Admin");
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
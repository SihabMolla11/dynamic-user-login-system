import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
// import session from "express-session";
import helmet from "helmet";
import appRoutes from "./routes/routes";
import connectDB from "./utils/db";
import cookieParser from "cookie-parser";


dotenv.config();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 8000;

const origin = [
  "http://localhost:3000",
];

app.use(
  cors({
    origin,
    credentials: true,
    methods: ["PUT", "GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.use(cookieParser());



app.use(helmet());
app.use(express.json({ limit: "8gb" }));
app.use(express.urlencoded({ limit: "8gb", extended: false }));

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET as string,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "development",
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   }),
// );


// Database Connection
 connectDB();

app.use("/api/v1", appRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export { app };


const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routers/userRoutes")
const outpassRoutes = require("./routers/outpassRoutes")
const qrRoutes = require("./routers/qrRoutes")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware") 
const cors= require("cors");
const path = require("path");
const complaintRoutes = require("./routers/complaintRoutes");


dotenv.config();
connectDB()
const app = express()
app.use(express.json())

app.use(cors())
const PORT = process.env.PORT;
app.listen(PORT,console.log(`server started on port ${PORT}`))

app.get("/",(req,res) => {
    res.redirect('/login');
})

app.use("/api/users",userRoutes);
app.use("/api/outpass", outpassRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/complaints", complaintRoutes);

// --------------------------deployment------------------------------
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}
// --------------------------deployment------------------------------

// incase if invalid url or other error occurs 
// middlewares takes care of it 
app.use(notFound);
app.use(errorHandler);
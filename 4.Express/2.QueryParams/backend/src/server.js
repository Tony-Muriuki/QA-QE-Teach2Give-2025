"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
// Configuring Dotenv
dotenv_1.default.config();
// Instance of Express
const app = (0, express_1.default)();
// Loading Variables
const port = process.env.PORT;
console.log(`Server running on port: ${port}`);
// Enable CORS only for http://localhost:5173
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
}));
// Get the current Directory
const _dirname = path_1.default.resolve();
console.log("Project Root Directory:", _dirname);
// Synchronously Read The File
const eventsData = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(_dirname, "src", "db", "eventsData.json"), "utf8"));
// Sample Event Data
const events = [
    {
        id: 1,
        title: "Summer Music Festival",
        price: 50,
        location: "New York",
        company: "Music Festivals Inc.",
    },
    {
        id: 2,
        title: "Food and Wine Expo",
        price: 75,
        location: "San Francisco",
        company: "Food and Wine Events LLC",
    },
    {
        id: 3,
        title: "Comic Con",
        price: 35,
        location: "Los Angeles",
        company: "Comic Con International",
    },
    {
        id: 4,
        title: "Art and Design Fair",
        price: 20,
        location: "Chicago",
        company: "Art and Design Expo LLC",
    },
    {
        id: 5,
        title: "Holiday Market",
        price: 5,
        location: "New York",
        company: "Holiday Markets Inc.",
    },
];
// Default route
app.get("/", (req, res) => {
    res.send("Hello World, I am Learning Express!");
});
// API route to respond with Events Data
app.get("/api/eventData", (req, res) => {
    // res.setHeader("Content-Type", "application/json");
    res.send(eventsData);
});
//Now lets create a Get API ROUTE that Filters Events Based On Query Parameters
app.get("/api/eventsFilter", (req, res) => {
    try {
        const { title, location, company, price } = req.query;
        //On the first events the whole events havent been filtered
        let filteredEvents = [...events];
        //Filtered Logic
        if (title) {
            filteredEvents = filteredEvents.filter((event) => {
                event.title
                    .toLowerCase()
                    .includes(title.toLocaleLowerCase());
            });
        }
        if (location) {
            filteredEvents = filteredEvents.filter((event) => event.location
                .toLowerCase()
                .includes(location.toLowerCase()));
        }
        if (company) {
            filteredEvents = filteredEvents.filter((event) => event.company.toLowerCase().includes(company.toLowerCase()));
        }
        if (price) {
            const priceNumber = Number(price);
            if (!isNaN(priceNumber)) {
                filteredEvents = filteredEvents.filter((event) => event.price <= priceNumber);
            }
        }
        res.status(200).json({ events: filteredEvents });
        return;
    }
    catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
// Create Server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});

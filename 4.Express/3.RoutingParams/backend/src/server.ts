import express from "express";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { readFileSync } from "fs";
import path from "path";
import cors from "cors";

// Configuring Dotenv
dotenv.config();

// Instance of Express
const app = express();

// Loading Variables
const port = process.env.PORT;
console.log(`Server running on port: ${port}`);

// Enable CORS only for http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Get the current Directory
const _dirname = path.resolve();
console.log("Project Root Directory:", _dirname);

// Synchronously Read The File
const eventsData = JSON.parse(
  readFileSync(path.join(_dirname, "src", "db", "eventsData.json"), "utf8")
);

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
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World, I am Learning Express!");
});

// API route to respond with Events Data
app.get("/api/eventData", (req: Request, res: Response) => {
  // res.setHeader("Content-Type", "application/json");
  res.send(events);
});

//Now lets create a Get API ROUTE that Filters Events Based On Query Parameters
app.get("/api/eventsFilter", (req: Request, res: Response) => {
  try {
    const { title, location, company, price } = req.query;
    //On the first events the whole events havent been filtered
    let filteredEvents = [...events];
    console.log(filteredEvents);
    //Filtered Logic
    if (title) {
      filteredEvents = filteredEvents.filter((event) => {
        event.title
          .toLowerCase()
          .includes((title as string).toLocaleLowerCase());
      });
    }
    if (location) {
      filteredEvents = filteredEvents.filter((event) =>
        event.location
          .toLowerCase()
          .includes((location as string).toLowerCase())
      );
    }
    if (company) {
      filteredEvents = filteredEvents.filter((event) =>
        event.company.toLowerCase().includes((company as string).toLowerCase())
      );
    }
    if (price) {
      const priceNumber = Number(price);
      if (!isNaN(priceNumber)) {
        filteredEvents = filteredEvents.filter(
          (event) => event.price <= priceNumber
        );
      }
    }

    res.status(200).json({ events: filteredEvents });
    return;
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

//Getting Events By Id
app.get("/api/events/:id", (req: Request, res: Response) => {
  try {
    const eventsId = Number(req.params.id); // Convert it to a number
    console.log(eventsId);

    if (isNaN(eventsId)) {
      res.status(400).json({ message: "Invalid event Id" });
      return;
    }

    // Find the event with that id in the dataset
    const event = events.find((eventObj) => eventObj.id === eventsId); // ✅ Fix

    console.log(event);
    if (!event) {
      res.status(404).json({ message: "Event Not Found" });
      return;
    }

    // Event Found
    res.send(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" }); // Changed status code to 500
  }
});

//Handling Multiple Route Parameters
app.get("/api/events/:category/:id", (req: Request, res: Response) => {
  const { category, id } = req.params;
  res.send(`Category:${category},EventsId:${id}`);
});

//Handling of Optional Route Parameters
app.get("/api/events/:id?", (req: Request, res: Response) => {
  const eventId = req.params.id;
  if (eventId) {
    try {
      const eventsId = Number(req.params.id); // Convert it to a number
      console.log(eventsId);

      if (isNaN(eventsId)) {
        res.status(400).json({ message: "Invalid event Id" });
        return;
      }

      // Find the event with that id in the dataset
      const event = events.find((eventObj) => eventObj.id === eventsId); // ✅ Fix

      console.log(event);
      if (!event) {
        res.status(404).json({ message: "Event Not Found" });
        return;
      }

      // Event Found
      res.send(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" }); // Changed status code to 500
    }
  } else {
    res.send("Fetching all events");
  }
});
// Create Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

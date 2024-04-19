import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const API_base = "https://dog.ceo/api";

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/suggestion", (req, res) => {
    res.render("suggestion.ejs");
});

app.get("/", async(req, res) => {
    try{
        const response = await axios.get(API_base + "/breeds/image/random") 
        const result = response.data.message;
        res.render("index.ejs", { image: result});
    }catch(error){
        console.error(error.message);
        res.status(500);
    }
});

app.post("/find-breed", async (req, res)=>{
    try{
        const response = await axios.get(API_base + "/breed/" + req.body.breed + "/images/random")
        
        const result = response.data.message;
        res.render("index.ejs", { image: result});
    }catch(error){
        console.error(error.message);
        res.status(500);
    }
});
app.post("/find-sub-breed", async (req, res)=>{
    try{
        const response = await axios.get(API_base + "/breed/" + req.body.breed +"/"+ req.body.subbreed + "/images/random");
        const result = response.data.message;
        res.render("index.ejs", { image: result});
    }catch(error){
        console.error(error.message);
        res.status(500);
    }
});

app.listen(port, ()=>{
    console.log(`listening at port : ${port}`);
});
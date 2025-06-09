const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv")

// const {exec} =require('child_process')

// const pythonScript="D:\\Studies\\Bored_Projects\\spark\\spark_web\\backend\\server.py"

// exec(`python ${pythonScript}`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Stderr: ${stderr}`);
//         return;
//     }
//     console.log(`Output: ${stdout}`);
// });


dotenv.config({path:path.join(__dirname,"config/config.env")})

const app = express();




app.use(cors({ origin: 'http://localhost:3000' }));

mongoose.connect(process.env.LEAPSTUDENTS_URI).then(() => {
    console.log("Students database connected");
}).catch((error) => {
    console.log("Error connecting to students database:", error);
});

const editor = new mongoose.Schema({
    landing: { type: String, default: "register" },
    passcode: {type: String, default: "spark007"}
});
const editordb = new mongoose.createConnection(process.env.EDITOR_URI);
const editorModel = editordb.model("editorModel", editor);

const registerScheme = new mongoose.Schema({
    name: { required: true, type: String },
    school: { required: true, type: String },
    grade: { required: true, type: Number },
    passcode: { required: true, type: String }
});
// members schema
const memregisterScheme = new mongoose.Schema({
    name: { required: true, type: String },
    phone: { required: true, type: Number },
    passcode: { required: true, type: String }
});
//members model
const memregisterModel = mongoose.model("leapmember", memregisterScheme);


const registerModel = mongoose.model("leapstudent", registerScheme);


const questionDb = mongoose.createConnection(process.env.QUESTIONS_URI);


questionDb.on('error', console.error.bind(console, 'Connection error to leapquestions:'));
questionDb.once('open', () => {
    console.log("Questions database connected");
});


const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
        required: false,
    },
    choice1: {
        type: String,
        required: true,
    },
    choice2: {
        type: String,
        required: true,
    },
    choice3: {
        type: String,
        required: true,
    },
    choice4: {
        type: String,
        required: true,
    },
    answer: { 
        type: String,
        required: true,
    }
});



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ storage });


app.use(express.json());


app.post("/register-student", async (req, res) => {
    const { name, school, grade, passcode } = req.body;
    try {
        const newstudent = new registerModel({ name, school, grade, passcode });
        await newstudent.save();
        res.status(200).json(newstudent);
        console.log("new student registered");
    } catch (error) {
        res.status(500).json({ ErrorMessage: error.message });
        console.log("registration failed");
    }
});
//register-members
app.post("/register-member", async (req, res) => {
    const { name,phone, passcode } = req.body;
    try {
        const newmem = new memregisterModel({ name, phone, passcode });
        await newmem.save();
        res.status(200).json(newmem);
        console.log("new member registered");
    } catch (error) {
        res.status(500).json({ ErrorMessage: error.message });
        console.log("registration failed");
    }
});

app.post("/questionwrite", upload.single('image'), async (req, res) => {
 
    const {setname} = req.body
const Ques = questionDb.model(setname, questionSchema);

    try {
        const questionData = new Ques({
            question: req.body.question,
            image: req.file ? req.file.path.split(path.sep).join('/') : '', 
            choice1: req.body.choice1,
            choice2: req.body.choice2,
            choice3: req.body.choice3,
            choice4: req.body.choice4,
            answer: req.body.answer
        });
        await questionData.save();

        res.status(201).json(questionData);
        console.log(questionData);
    } catch (error) {
        console.error("Error saving question:", error);
        res.status(400).send({ error: error.message });
    }
});
//questionset list
const quesetlist = new mongoose.Schema({
setame:String
})
const quelist = questionDb.model("quesetlist",quesetlist)
//questionset
app.post("/questionsets",(req,res)=>{
    const {setname}= req.body
    const Ques = questionDb.model(String(setname), questionSchema);
    const addqueset = new quelist({
        setame:String(setname)
    })
    res.status(200)
})
app.post("/questionlist",async (req,res)=>{
    const quelists = await quelist.find()
    res.json(quelists)
    res.status(200)
})
app.get("/register-students", async (req, res) => {
    try {
        const leapstudents = await registerModel.find();
        res.json(leapstudents);
    } catch (error) {
        res.status(500).json({ message: "Some error in getting those..." });
    }
});
app.get("/register-members", async (req, res) => {
    try {
        const leapmembers = await memregisterModel.find();
        res.json(leapmembers);
    } catch (error) {
        res.status(500).json({ message: "Some error in getting those..." });
    }
});


app.get("/questions-physics", async (req, res) => {
    const {setname} = req.json()
    const Question = questionDb.model(setname, questionSchema);
    try {
        const questions = await Question.find();
        res.json(questions);
        console.log(questions);
    } catch (error) {
        res.status(500).json({ message: "some error" });
    }
});


app.post("/login", async (req, res) => {
    const { name, passcode } = req.body;

    try {
        const student = await registerModel.findOne({ name, passcode });

        if (student) {
            
            res.status(200).json({ success: true, message: "Login successful", student });
        } else {
            
            res.status(401).json({ success: false, message: "Invalid name or passcode" });
        }
    } catch (error) {
       
        res.status(500).json({ message: "An error occurred during login", error: error.message });
    }
});

app.post("/memlogin", async (req, res) => {
    const { name, passcode } = req.body;

    try {
        const member = await memregisterModel.findOne({ name, passcode });

        if (member) {
          
            res.status(200).json({ success: true, message: "Login successful", member });
        } else {
          
            res.status(401).json({ success: false, message: "Invalid name or passcode" });
        }
    } catch (error) {
        
        res.status(500).json({ message: "An error occurred during login", error: error.message });
    }
});

app.post("/editlog", async (req, res) => {
    const { passcode } = req.body;
    
    try {
        const editor = await editorModel.findOne({});
       
        if (editor.passcode == passcode) {
            res.status(200).send("Passcode matched");
        } else {
            res.status(401).send("Incorrect passcode");
        }
    } catch (error) {
        console.error("Error in /editlog route:", error);
        res.status(500).send("Server error");
    }
});


app.post("/editorSS", async (req, res) => {
    
    const { landing } = req.body;
    try {
        await editorModel.findOneAndUpdate({}, { landing: landing }, { new: true, upsert: true });
        res.status(200).json({ landing: landing });
        console.log("Landing page updated");
    } catch (error) {
        console.log("Cannot reach editordb:", error);
        res.status(500).json({ message: "Error updating landing page" });
    }
});

app.get("/editorSS", async (req, res) => {
    const landing = await editorModel.findOne({}, 'landing');
    res.json(landing);
});

app.post("/delstudent", async (req, res) => {
    const { id } = req.body;
    try {
        await registerModel.deleteOne({ "_id": id });
        res.status(204).end(); 
    } catch (error) {
        res.status(500).json({ message: "Error deleting student" });
    }
});


app.post("/editstudent", async (req, res) => {
    const { id, name, school, grade, passcode } = req.body; 
    try {
        await registerModel.updateOne({ "_id": id }, { name, school, grade, passcode });
        res.status(204).end(); 
        console.log(`Student with ID ${id} updated`);
    } catch (error) {
        res.status(500).json({ message: "Error updating student", error: error.message });
    }
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"./frontend/build")));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"./frontend/build/index.html"));
    })
}
const quefolder = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
const quefold = questionDb.model("quefolder", quefolder);

app.post("/quefolder", async (req, res) => {
    const { name, address } = req.body;

    try {
        const newfolder = new quefold({ name, address }); 
        await newfolder.save();
        res.status(200).json(newfolder); 
        console.log(`New question folder created`);
    } catch (error) {
        res.status(500).json({ message: "Error in creating folder question", error: error.message });
    }
});
app.post("/quefolders", async (req, res) => {
    const { address } = req.body; 

    try {
        const folders = await quefold.find({ address });

       
        console.log("Fetched folders:", folders);

        
        res.status(200).json(folders); 
    } catch (error) {
        
        console.error("Error in fetching folders:", error);

        res.status(500).json({ message: "Error in fetching folders", error: error.message });
    }
});
app.post("/delqueset", async (req, res) => {
    const { name, address } = req.body; 


    if (!name || !address) {
        return res.status(400).json({ message: "Missing name or address" });
    }

    try {
        const result = await quefold.findOneAndDelete({
            name: name,
            address: address, 
        });

        if (!result) {
            return res.status(404).json({ message: "Question set not found" });
        }

       
        res.status(200).json({ message: "Question set deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



app.listen(process.env.PORT,'0.0.0.0', () => {
    console.log(`Leap server listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

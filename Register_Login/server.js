const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session');
const bcrypt = require('bcrypt')
const port = 5000

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/userDB')
const db = mongoose.connection
db.once('open',()=>{
    console.log("MongoDB successfully connected")
})

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    username:String,
    password:String
})

const Users = mongoose.model("user",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'signup.html'))
})

app.post('/post',async (req,res)=>{
    const {first_name,last_name,email,username,password} = req.body
    const user = new Users({
        first_name,
        last_name,
        email,
        username,
        password
    })
    await user.save()
    console.log(user)
    res.send("Registration Successful")
})

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'your-secret-key', // Replace with a secure random string
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 }, // 1-hour session duration
    })
);

// Route to serve login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle login form submission
app.post('/login', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Find the user by either username or email
        const user = await Users.findOne({ $or: [{ username }, { email }] });

        if (!user) {
            console.log("Invalid username or email");
            return res.status(401).send("Invalid username or email");
        }

        if (user.password !== password) {
            console.log("Invalid password");
            return res.status(401).send("Invalid password");
        }

        // If login is successful
        // Save user information in session
        req.session.user = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
        };
        console.log("Login Successful");
        res.send(`
            <html>
<head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Burnt Brotta | Login</title>
        <link href="./CSS files/" rel="stylesheet" type="text/css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Climate+Crisis&family=Poppins:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet">
    </head>
    <title>User Profile</title>
    <style>
        /* Reset and general styling */
        body {
            margin: 0;
            font-family: 'Poppins';
            background-color: #f7f3ef;
            color: #333;
        }

        /* Header section */
        header {
            background-color: #ffe55b;
            color: #000;
            padding: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            border-bottom: 5px solid #000;
        }

        /* Profile container */
        .profile-container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #000;
            color: #fff;
            background-color: #ffe55b;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .profile-container h1 {
            color: #000000;
            font-size: 32px;
            margin-bottom: 20px;
            text-align: center;
        }

        .profile-details {
            color: #000000;
            font-size: 18px;
            line-height: 1.6;
        }

        .profile-details p {
            margin: 10px 0;
        }

        .profile-details span {
            font-weight: bold;
            color: #000000;
        }

        /* Buttons container */
        .button-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }

        /* Buttons styling */
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            color: #ffe55b;
            background-color: #000;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s ease, color 0.3s ease;
            cursor: pointer;
        }

        .button:hover {
            background-color: #f7f3ef;
            color: #000;
            outline: solid 1px #000;
        }

        /* Logout button */
        .logout {
            display: block;
            text-align: center;
            margin: 20px auto;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            color: #ffe55b;
            background-color: #000000;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: color 0.3s ease;
            transition: background-color 0.4s ease;
        }

        .logout:hover {
            background-color: #f7f3ef;
            color: #000000;
            outline-style: solid;
        }
    </style>
</head>
<body>
    <header>
        Burnt Brotta User Profile
    </header>
    <div class="profile-container">
        <h1>Welcome, ${user.first_name} ${user.last_name}</h1>
        <div class="profile-details">
            <p><span>Email:</span> ${user.email}</p>
            <p><span>Username:</span> ${user.username}</p>
        </div>
        <div class="button-container">
            <a href="/" class="button">Logout</a>
            <a href="../index.html" class="button">Homepage</a>
        </div>
    </div>
</body>
</html>

        `);
    } catch (error) {
        console.error("Invalid Credentials", error);
        res.status(500).send("Invalid Credentials");
    }
});

// Start the server
app.listen(port, () => {
    console.log("Server started on port", port);
});

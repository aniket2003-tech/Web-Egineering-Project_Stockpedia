const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5000
const bodyParser = require('body-parser')
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/StockMarket').then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res)=>{res.send('Hello')})

/*Uploading Post */
const fs = require('fs');
const path = require('path');
const multer = require('multer')
const upload = multer({ dest: 'Uploads/' });
const postModel = require('./models/postModel')
app.use(express.json());

app.post('/upload-post', upload.single('image'), async (req, res) => {
  try {
      const { title, desc } = req.body;
      const imageName = Date.now() + req.file.originalname; // Generate unique image name

      // Move the uploaded file to the 'uploads' directory
      fs.renameSync(req.file.path, path.join('uploads', imageName));

      const newPost = new postModel({
          title: title,
          description: desc,
          image: imageName
      });

      await newPost.save();
      res.send({message: 'General Post Uploaded'})
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

app.use('/uploads', express.static('uploads'));
// Route to fetch all posts with image URLs

// Route to fetch all posts with image URLs
app.get('/getdata', async (req, res) => {
    try {
        const posts = await postModel.find(); // Retrieve all posts from the database
        const postsWithImages = posts.map(post => ({
            ...post.toObject(),
            imageUrl: `http://localhost:5000/uploads/${post.image}` // Construct the image URL
        }));
        res.json(postsWithImages); // Send the posts with image URLs as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Internal Server Error'});
    }
});


const bcrypt = require('bcryptjs');
const User = require('./models/userModel')
app.post('/usersignup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  app.post('/usersignin', async (req, res) => {
    const {username, email, password } = req.body;

    try {
      // Find the user by email in the database
      const user = await User.findOne({ username, email });

      // If user doesn't exist, return 'You are not a user' message
      if (!user) {
        return res.status(401).json({ message: 'You are not a user' });
      }

      // Compare the password provided with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);

      // If passwords match, set the values in local storage and return success response
      if (isMatch) {
        // Set values in local storage
        const { isAdmin, isSubscriber, profileImageUrl } = user;
        res.json({ isAdmin, isLoggedIn: true, isSubscriber, profileImageUrl });
      } else {
        // If passwords don't match, return 'You are not a user' message
        return res.status(401).json({ message: 'You are not a user' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.post('/adminlogin', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Find the user by username in the database
    const user = await User.findOne({ email: email, username: username });

    // If user doesn't exist, return 'You are not a user' message
    if (!user) {
      return res.status(401).json({ message: 'You are not a user' });
    }

    // Compare the password provided with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords match and user is admin, set the values in local storage and return success response
    if (isMatch && user.isAdmin) {
      // Set values in local storage
      const { isAdmin, isSubscriber } = user;
      return res.json({ isAdmin, isLoggedIn: true, isSubscriber, email, username });
    } else {
      // If passwords don't match or user is not admin, return 'You are not a user' message
      return res.status(401).json({ message: 'You are not a user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const subscriberModel = require('./models/subscriberModel')
app.post('/upload-subscribed', upload.single('image'), async (req, res) => {
  try {
      const { title, desc } = req.body;
      const imageName = Date.now() + req.file.originalname; // Generate unique image name

      // Move the uploaded file to the 'uploads' directory
      fs.renameSync(req.file.path, path.join('uploads', imageName));

      const newPost = new subscriberModel({
          title: title,
          description: desc,
          image: imageName
      });

      await newPost.save();
      res.send({message: 'Subscriber Post Uploaded'})
  } catch (error) {
      console.error(error);
      res.status(500).send({message: 'Internal Server Error'});
  }
});
app.get('/getsubscriberdata', async (req, res) => {
  try {
      const posts = await subscriberModel.find(); // Retrieve all posts from the database
      const postsWithImages = posts.map(post => ({
          ...post.toObject(),
          imageUrl: `http://localhost:5000/uploads/${post.image}` // Construct the image URL
      }));
      res.json(postsWithImages); // Send the posts with image URLs as a JSON response
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});



app.post('/submituser', async (req, res) => {
  try {
    // Destructure request body
    const { username, email, password, startdate, enddate, isSubscriber, isAdmin } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      // If the user already exists, update their information
      existingUser.username = username;
      existingUser.password = await bcrypt.hash(password, 10);
      existingUser.subscription_date = startdate;
      existingUser.unsubscription_date = enddate;
      existingUser.isSubscriber = isSubscriber;
      existingUser.isAdmin = isAdmin;

      await existingUser.save();

      return res.json({ message: 'User information updated successfully', status: true });
    } else {
      // If the user does not exist, create a new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        subscription_date: startdate,
        unsubscription_date: enddate,
        isSubscriber: isSubscriber,
        isAdmin: isAdmin
      });

      await newUser.save();

      return res.json({ message: 'User created successfully', status: true });
    }
  } catch (error) {
    console.error('Error updating or creating user:', error);
    return res.status(500).json({ message: 'Internal server error', status: false });
  }
});

const profileImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Multer upload configuration for profile image uploads
const profileImageUpload = multer({ storage: profileImageStorage });

app.post('/editprofile', profileImageUpload.single('profileImage'), async (req, res) => {
  const { oldUsername, username, email, oldEmail, oldProfileImageUrl } = req.body;

  try {
    let profileImageUrl = oldProfileImageUrl;

    // If a new profile image is uploaded, update the profileImageUrl
    if (req.file) {
      profileImageUrl = `http://localhost:5000/Uploads/${req.file.filename}`;
    }

    // Find the user by old username and old email, and update the profile
    const user = await User.findOneAndUpdate(
      { username: oldUsername, email: oldEmail },
      { username, email, profileImageUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the updated user information in the response
    res.status(200).json({ 
      message: 'Profile updated successfully',
      user: {
        email: user.email,
        username: user.username,
        profileImageUrl: user.profileImageUrl
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(port, function(err){
    if(err) console.log(err)
    else console.log('server running on port', port)
})
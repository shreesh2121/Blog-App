var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectDB } = require("../Config/db");
const { User } = require("../Models/user");

const register=async(req,res)=>{
    try {
        //get all data from frontend
        const { name, email, password, confirm_password } = req.body;
    
        //all data should exists
        if (!(name && email && password && confirm_password)) {
          res.status(400).send("All fields are compulsory");
        }

        // Check if the password and confirm_password match
    if (password !== confirm_password) {
      return res.status(400).send("Password and confirm_password do not match");
    }
    
        //check if user already exists - email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          res.status(400).send("User already exists with this email");
        } else {
          // encrypt the password
          const myEncPassword = await bcrypt.hash(password, 10);
    
          //save the user in DB
          const user = await User.create({
            name,
            email,
            password: myEncPassword,
            confirm_password: myEncPassword,
          });
    
          // generate a token for user and send it
          const token = jwt.sign(
            //payload: extracts user id
            { id: user._id, email },
            //Now provide secret
            process.env.SECREAT_KEY,
            // "shhhh",
            {
              expiresIn: "30d",
            }
          );
    
          user.token = token;
          user.password = undefined; //now this will not go to the frontend
          user.confirm_password = undefined; //now this will not go to the frontend
          console.log(token);
    
          res.status(201).json(user);
        }
      } catch (error) {
        console.log(error);
      }
}

const login=async(req,res)=>{
    try {
        // get all data from frontend
        const { email, password } = req.body;
        //validation check
        if (!(email && password)) {
          res.status(400).send("Send all data");
        }
        // find user in DB
        const user = await User.findOne({ email });
        //Assignment: If user is not there, then what?
        // match the password
      if (user && (await bcrypt.compare(password, user.password))) {      
        const token = jwt.sign(
          {id:user._id , email:user.email},
          process.env.SECREAT_KEY,
        //   "shhhh", // Use process.env.jwtsecret in production
          {
            expiresIn: "30d",
          }
        );
    
          // Set the token in the response headers (or you can send it in the response body)
          res.setHeader('Authorization', `Bearer ${token}`);
    
          // Send the user data without the password and the token
          const userWithoutPasswordAndToken = { ...user.toObject() };
          // delete userWithoutPasswordAndToken.password;
          // delete userWithoutPasswordAndToken.token;
    
          res.status(200).json({
            user:userWithoutPasswordAndToken,
            token,
          });
      } else{
        res.status(400).send("Enter correct email and password");
      }
      } catch (error) {
        console.log(error);
      }
}

const getin=(req,res)=>{
  res.send("getin running")
  console.log("getin running")
  // res.status(200);
  // const user={
  //   id:req.user._id,
  //   name:req.user.name,
    // email:req.user.email,
  // };
  // res.send(user);
}
// getin code is for routes where authentication may not be necessary, and the user's information is sent back to the client without any significant checks.
// getin Code: The getin code is a simplified endpoint handler that doesn't perform authentication checks. It simply returns the user's information if it's available in the req.user object. This code might be used in a scenario where the user's data is publicly accessible, or it's used for a different purpose where authentication isn't a requirement.


// Middleware function to verify JWT tokens
const verifyToken = (req, res, next) => {
  // Get the token from the request header, query parameter, or cookie
  const token = req.header('Authorization');
  // const token = req.header('Authorization') || req.query.token || req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  } else {
  
      // Verify the token with your secret key (replace 'yourSecretKey' with your actual secret)
      const tokenWithoutBearer = token.replace('Bearer ', ''); // Remove "Bearer " prefix

      const decoded = jwt.verify(tokenWithoutBearer, process.env.SECREAT_KEY);
  
      // Attach the decoded user information to the request for use in protected routes
      console.log(decoded);
      req.user = decoded;
      next();
    
  }  

  // if (!token) {
  //   return res.status(401).json({ message: 'Unauthorized - No token provided' });
  // }

  // try {
  //   // Verify the token with your secret key (replace 'yourSecretKey' with your actual secret)
  //   const decoded = jwt.verify(token, process.env.SECREAT_KEY);

  //   // Attach the decoded user information to the request for use in protected routes
  //   console.log(decoded);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  // }
};

const protected= async (req, res) => {
  try {
   
    const userIdFromToken= req.user.id;

    // Find the user by ID using Mongoose's findById method
    const user = await User.findById(userIdFromToken);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // You can now send the user data as the response
    res.json({ message: 'User found', user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// protected Code: The protected code is designed to protect a route that requires user authentication. It retrieves the user's data based on their ID and returns it. This route is commonly used to fetch user-specific data and may serve as a middleware to ensure the user is authenticated.

module.exports={register,login,verifyToken,protected,getin}




// Note: You know why we create verifyToken
// The provided code defines a middleware function in a Node.js application that is used to verify JSON Web Tokens (JWT) in incoming HTTP requests. This middleware function is typically used in the context of an authentication and authorization system to protect certain routes or endpoints, ensuring that only authenticated and authorized users can access them.

// Here's a breakdown of what this middleware function does and why it's used:

// Input: The middleware function takes three parameters: req (request), res (response), and next (a callback function). This is a standard pattern for middleware in Express.js, a popular web framework for Node.js.

// Token Retrieval: It attempts to retrieve a JWT from the incoming request in one of the following ways:

// It looks for a token in the Authorization header of the request.
// The code you've commented out suggests that it could also check for a token in the query parameter or a cookie. However, in the active code, it only checks the Authorization header.
// Token Existence Check: If no token is found in the request, it sends a 401 (Unauthorized) response with a message indicating that no token has been provided.

// Token Verification: If a token is found, the middleware attempts to verify it using the jwt.verify method. In the provided code, it uses the string 'shhhh' as the secret key for verification. In a production environment, you should replace this with a strong, secret key that is kept secure.

// Verification Success: If the token is successfully verified, it extracts the decoded user information from the token and attaches it to the req object as req.user. This allows downstream route handlers to access the user information if they need it.

// Error Handling: If the token verification fails (e.g., due to an invalid token or an expired token), it sends a 401 response with a message indicating that the token is invalid.

// next() Function: If the token is valid, the middleware calls the next function, which allows the request to proceed to the next middleware or route handler in the request-response cycle. This is crucial for the middleware to pass control to the next step in the request handling process.

// Why It's Used:
// This middleware is used for several important reasons:

// Authentication: It verifies the identity of the user by checking the JWT. Only users with a valid JWT can access protected routes.

// Authorization: By attaching the decoded user information to the req object, it allows route handlers to make authorization decisions based on the user's role or permissions.

// Security: JWTs are a secure way to transmit user information between the client and the server. This middleware ensures that only valid tokens are accepted.

// Code Reusability: Middleware functions like this can be reused across multiple routes, making it easy to protect various parts of your application.

// Customization: You can customize the middleware to fit your specific requirements, such as using different secret keys for different routes or adding additional checks like token expiration or token revocation.

// In summary, this middleware is a crucial component of authentication and authorization in a Node.js application, helping ensure that only authenticated and authorized users can access protected resources.







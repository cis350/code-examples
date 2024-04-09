/**
 * This module contains authentication and session functions
 *
 * Errors codes:  1 expired token, 2 invalid user,
 *          3 invalid token
 */

// import JWT
const jwt = require('jsonwebtoken');

// import the env variables
require('dotenv').config();

// import DB function
const { getUserByUName } = require('../../model/users');

// blacklisted tokens
const jwtBlacklist = new Set();

/**
 * Create a JWT containing the username
 * @param {*} userid
 * @returns the token
 */
const authenticateUser = (username) => {
  try {
    const token = jwt.sign({ username }, process.env.KEY, { expiresIn: '120s' });
    console.log('token', token);
    return token;
  } catch (err) {
    console.log('error', err.message);
    throw err;
  }
};

/**
 * Verify a token. Check if the user is valid
 * @param {*} token
 * @returns 0 if the user is valid, the appropriate status code
 */
const verifyUser = async (token) => {
  try {
    // check if token blacklisted
    if (jwtBlacklist.has(token)) {
      return 3;
    }

    // decoded contains the paylod of the token
    const decoded = jwt.verify(token, process.env.KEY);
    console.log('payload', decoded);
    // check that the payload contains a valid user
    const user = await getUserByUName(decoded.username);
    if (!user) {
      // user is undefined
      return 2;
    }
    return 0; // user verified - success
  } catch (err) {
    // expired token
    if (err.name === 'TokenExpiredError') {
      console.log('error', err.message);
      return 1;
    }
    // invalid token
    console.log('error', err.message);
    return 3;
  }
};

const blacklistJWT = (token) => jwtBlacklist.add(token);

/**
const main = () =>{
    const token = authenticateUser('cis3500');
    verifyUser(token);
}
main();
*/

module.exports = { authenticateUser, verifyUser, blacklistJWT };

var jwt = require('jsonwebtoken');
const { userRepository } = require('../repositories')
require('dotenv').config();
const refreshAccessToken = require('../utils/refreshAccessToken')


function authentication(req,res,next) {
        if (!req.headers.authorization) {
          throw new Error('Invalid token.');
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        // phat trien them refresh token
        // let refreshToken = req.headers['x-refresh-token'];
        // if (!userId) {
        //   if (!refreshToken) {
        //     throw new Error('Invalid token.');
        //   }
        //   refreshAccessToken(refreshToken);
        // }
      
        userRepository.findById(userId).then(foundUser => {
          if (!foundUser) {
            throw new Error('Invalid token.')
          }
        })
      
}


module.exports = authentication
function refreshAccessToken(refreshToken) {
    try {
      const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const userId  = decodedToken.id;
  
      // Check if the refresh token is valid and not expired
      // ...
      const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
  
      return { accessToken };
    } catch (err) {
      console.error('Error while refreshing access token:', err);
      return null;
    }
  }

  module.exports = refreshAccessToken
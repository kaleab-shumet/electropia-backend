const jwt = require('jsonwebtoken')

function generateTokens(userid, email) {

    const accessTokenOptions = {
        expiresIn: '1y'//(15 * 60)
    }

    const refreshTokenOptions = {
        expiresIn: '365d'
    }


    const accessToken = jwt.sign({ userid, email }, process.env.JWT_ACCESS_TOKEN_KEY, accessTokenOptions);
    //const refreshToken = jwt.sign({ userid, email }, process.env.JWT_REFRESH_TOKEN_KEY, refreshTokenOptions);

    return { accessToken }
}

module.exports = generateTokens;
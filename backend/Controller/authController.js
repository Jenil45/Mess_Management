import User from '../Models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // console.log(req.body.email);

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({'email': email }).exec()
    
    if (!foundUser) {
        return res.status(401).json({ message: 'User not available' })
    }
    
    const matchPasswd = await bcrypt.compare(password, foundUser.password)
    
    if (!matchPasswd) return res.status(401).json({ message: 'Unauthorized' })
    
    const userId = foundUser.userId
    const role = foundUser.role
    const name = foundUser.name
    const mobileno = foundUser.mobileno

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "name": foundUser.name,
                "useremail": foundUser.email,
                "role": role,
                "mobileno": mobileno
            }
        },
        process.env.AUTH_TOKEN,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "useremail": foundUser.email },
        process.env.AUTH_TOKEN,
        { expiresIn: '7d' }
    )
    // console.log("Refresh token " , refreshToken);
    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        // httpOnly: true, //accessible only by web server 
        // secure: true, //https
        // sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    res.json({userId , name , email,mobileno, role , accessToken })
})

export const refresh = (req, res) => {
    const cookies = req.cookies
    // console.log("cookies here", cookies);
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized : no cookie store' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,   
        process.env.AUTH_TOKEN,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            const foundUser = await User.findOne({ "email": decoded.useremail }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized : no user found' })
            // console.log(decoded);

            // decoding attributes
            const userId = foundUser.userId
            const role = foundUser.role
            const name = foundUser.name
            const email = foundUser.email
            const mobileno = foundUser.mobileno


            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "useremail": email,
                        "role": role
                    }
                },
                process.env.AUTH_TOKEN,
                { expiresIn: '15m' }
            )

            res.json({userId , name , email,mobileno, role , accessToken })

        })
    )
}

export const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Logout Successfully' })
}
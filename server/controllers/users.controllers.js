const pool = require('../config/configDB')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();


const getUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM users')
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({
            message: { error }
        })
    }
}


const createUser = async (req, res) => {
    const { name, email, mobileNumber, height, weight, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const response = await pool.query(
        'SELECT * FROM users WHERE email = $1',
            [email]
    )

    const user = response.rows[0]
    if(user){
        return res.status(409).json({
            message: 'Email already exists'
        })
    }
    try {
        const response = await pool.query(
            'INSERT INTO users (name, email, mobileNumber, height, weight, password) VALUES ($1, $2, $3,$4, $5, $6)',
            [name, email, mobileNumber, height, weight, hashedPassword]
        )
        res.status(200).json({
            message: 'Signed Up Succesfully',
            body: {
                user: { name, email, mobileNumber, height, weight, password }
            }
        })
    } catch (error) {
        res.status(500).json({
            message: { error }
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const response = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        const user = response.rows[0]
        if (!user) {
            return res.status(404).json({
                message: 'Invalid Email'
            })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            
            return res.status(401).json({
                message: 'Incorrect Password'
            })
        }
      const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET);

        res.json({
            token:token,
            message: 'User logged successfully',
            body: {
                user: user
            }
        })
    } catch (error) {
        res.status(500).json({
            message: { error }
        })
    }
}







module.exports = { createUser, getUsers, loginUser }


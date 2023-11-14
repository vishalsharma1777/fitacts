const pool = require('../config/configDB')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);


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
    const { name, email, mobileNumber, height, weight, password, favactivities, timeline } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const response = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )

    const user = response.rows[0]
    if (user) {
        return res.status(409).json({
            message: 'Email already exists'
        })
    }
    try {
        await pool.query(
            'INSERT INTO users (name, email, mobileNumber, height, weight, password,favactivities,timeline) VALUES ($1, $2, $3,$4, $5, $6,$7,$8)',
            [name, email, mobileNumber, height, weight, hashedPassword, favactivities, timeline]
        )
        res.status(200).json({
            message: 'Signed Up Succesfully',
            body: {
                user: { name, email, mobileNumber, height, weight, password, favactivities, timeline }
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
            token: token,
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

const updateFavActivity = async (req, res) => {
    const { user_id } = req.body
    const { favActivity } = req.body
    try {
        const response1 = await pool.query(
            'SELECT * FROM users WHERE user_id = $1',
            [user_id]
        )
        const user = response1.rows[0]
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const favActivities = user.favactivities
        if (favActivities.includes(favActivity)) {
            const index = favActivities.indexOf(favActivity)
            favActivities.splice(index, 1)
        } else {
            favActivities.push(favActivity)
        }

        const response = await pool.query(
            'UPDATE users SET favactivities = $1 WHERE user_id = $2',
            [favActivities, user_id]
        )
        res.status(200).json({
            message: 'Favourite Activity Updated',
            body: {
                user: { favActivities }
            }
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: { error }
        })
    }
}

const getUserFavActivites = async (req, res) => {
    const user_id = req.params.id
    try {
        const response = await pool.query(
            'SELECT * FROM users WHERE user_id = $1',
            [user_id]
        )
        const user = response.rows[0]
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const favActivities = user.favactivities
        res.status(200).json({
            message: 'Favourite Activites Fetched',
            body: {
                favActivities: favActivities
            }
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: { error }
        })
    }
}

const userTimeline = async (req, res) => {
    const user_id = req.params.id
    try {
        const response = await pool.query(
            'SELECT * FROM users WHERE user_id = $1',
            [user_id]
        )
        const user = response.rows[0]
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const timeline = user.timeline
        res.status(200).json({
            message: 'timeline Fetched',
            body: {
                timeline: timeline
            }
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: { error }
        })
    }
}

const getUserTimeline = async (req, res) => {
    const user_id = req.params.id;
    try {
        const response = await pool.query(
            'SELECT * FROM users WHERE user_id = $1',
            [user_id]
        );
        const user = response.rows[0];
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const timelineDetails = await pool.query(
            `SELECT p.*, a.*, u.*
            FROM performances p
            INNER JOIN activites a ON p.activity_id = a.activity_id
            INNER JOIN users u ON p.user_id = u.user_id
            WHERE p.performance_id IN (SELECT unnest(timeline) FROM users WHERE user_id = $1)`,
            [user_id]
        );
        res.json(timelineDetails.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


const getUserById = async (req, res) => {
    const user_id = req.params.id;
    try {
        const response = await pool.query(
            'SELECT * FROM users WHERE user_id = $1',
            [user_id]
        );
        const user = response.rows[0];
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}


const getUserAdhar = async (req, res) => {
    const user_id = req.params.id;
    try {
        const response = await pool.query(
            'SELECT aadhar FROM users WHERE user_id = $1',
            [user_id]
        );
        const aadhar = response.rows[0];
        res.json(aadhar);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}




const uploadAadhar = async (req, res) => {
    const user_id = req.params.id;
    const { name } = req.body;
    try {
        const response = await pool.query(
            'SELECT * FROM users WHERE user_id = $1',
            [user_id]
        );
        const user = response.rows[0];
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const response1 = await pool.query(
            'UPDATE users SET aadhar = $1 WHERE user_id = $2',
            [name, user_id]
        );
        res.json({
            message: 'Aadhar uploaded successfully',
            body: {
                user: { user }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}


module.exports = { createUser, uploadAadhar, getUsers,getUserAdhar, getUserById,loginUser,userTimeline, updateFavActivity, getUserFavActivites,getUserTimeline }


const pool = require('../config/configDB')

const getUsersWithAllDetails = async (req, res) => {
    try {
        const favactivities =  (await pool.query('SELECT * FROM activites')).rows
        const users =  (await pool.query('SELECT * FROM users')).rows
        const usersWithAllDetails = users.map((user) => {
            const favactivitiesWithDetails = favactivities.filter((activity) => {
                return user.favactivities.includes(activity.activity_id)
            })
            return { ...user, favactivities: favactivitiesWithDetails }
        })
        res.json(usersWithAllDetails)
    } catch (error) {
        console.log(error.message)
    }
}

const getUsersFollowing = async (req, res) => {
    const userId = req.params.id
    try {
        const usersFollowing = (await pool.query('SELECT * FROM users WHERE user_id IN (SELECT unnest(following) FROM users WHERE user_id = $1)', [userId])).rows
        res.json(usersFollowing)
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = { getUsersWithAllDetails,getUsersFollowing }
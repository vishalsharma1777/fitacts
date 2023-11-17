const pool = require('../config/configDB')


const getActivities = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM activites')
        res.status(200).json(response.rows)
    } catch (error) {
        res.status(500).json({
            message: { error }
        })
    }
}

const getFavoriteActivitiesDetails = async (req, res) => {
    const user_id = req.params.id
    try {
        const favUserActivites = await (await pool.query('SELECT favactivities FROM users WHERE user_id = $1', [user_id])).rows[0].favactivities
        const favActivitesWithDetails = favUserActivites.map(async (activity_id) => {
            const activityDetails = await (await pool.query('SELECT * FROM activites WHERE activity_id = $1', [activity_id])).rows[0]
            return activityDetails
        })
        Promise.all(favActivitesWithDetails).then((values) => {
            res.status(200).json(values)
        })
    }
    catch (error) {
        res.status(500).json({
            message: { error }
        })
    }
}





module.exports = { getActivities, getFavoriteActivitiesDetails }
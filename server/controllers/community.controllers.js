const pool = require('../config/configDB')

const getUsersWithAllDetails = async (req, res) => {
    try {
        const favactivities = (await pool.query('SELECT * FROM activites')).rows
        const users = (await pool.query('SELECT u.user_id,u.name,u.email,u.favactivities,u.following FROM users u')).rows
        const usersWithAllDetails = users.map((user) => {
            const favactivitiesWithDetails = favactivities.filter((activity) => {
                return user.favactivities.includes(activity.activity_id)
            })
            return { ...user, favactivities: favactivitiesWithDetails }
        })
        res.status(200).json(usersWithAllDetails)
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}

const getUsersFollowing = async (req, res) => {
    const userId = req.params.id
    try {
        const usersFollowing = (await pool.query('SELECT u.user_id,u.name,u.email,u.timeline FROM users u WHERE user_id IN (SELECT unnest(following) FROM users WHERE user_id = $1)', [userId])).rows
        res.status(200).json(usersFollowing)
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}

const addOrRemoveFollowing = async (req, res) => {
    const userId = req.params.id
    const { followingId } = req.body
    try {
        const user = (await pool.query('SELECT following FROM users WHERE user_id = $1', [userId])).rows[0]
        const following = user.following
        if (following.includes(followingId)) {
            const index = following.indexOf(followingId)
            following.splice(index, 1)
        } else {
            following.push(followingId)
        }
        await pool.query('UPDATE users SET following = $1 WHERE user_id = $2', [following, userId])
        res.status(200).json({ message: 'follow/unfollow successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)

    }

}


module.exports = { getUsersWithAllDetails, getUsersFollowing, addOrRemoveFollowing }
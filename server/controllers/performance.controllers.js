const pool = require('../config/configDB')

const createperformance = async (req, res) => {
    const {
        user_id,
        performanceName,
        duration,
        distance,
        speed,
        mts,
        activity_id
    } = req.body

    const created_at = new Date()


    try {
        await pool.query(
            'INSERT INTO performances (user_id, performanceName, duration, distance, speed,mts,activity_id,created_at) VALUES ($1, $2, $3,$4, $5, $6,$7,$8)',
            [user_id, performanceName, duration, distance, speed, mts, activity_id, created_at]
        )
        const response = await pool.query(
            'SELECT * FROM performances WHERE user_id = $1 AND activity_id = $2',
            [user_id, activity_id]
        )
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: { error }
        })
    }
}

const getUserPerformance = async (req, res) => {
    const user_id = req.params.id
    const activity_id = req.params.activityId
    try {
        const response = await pool.query(
            'SELECT * FROM performances JOIN activites ON performances.activity_id = activites.activity_id WHERE performances.user_id = $1 AND performances.activity_id = $2',
            [user_id, activity_id]
        )
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: { error }
        })
    }
    

}

const deletePerformance = async (req, res) => {
    const user_id = req.params.id
    const performance_id = req.params.performanceId
    const activity_id = req.params.activityId

    try {
        await pool.query(
            'DELETE FROM performances WHERE user_id = $1 AND performance_id = $2',
            [user_id, performance_id]
        )
        const response = await pool.query(
            'SELECT * FROM performances WHERE user_id = $1 AND activity_id = $2',
            [user_id, activity_id]
        )
        res.status(200).json(response.rows)
    } catch (error) {
        res.status(500).json({
            message: { error }
        })
    }

}

const updateTimeline = async (req, res) => {
    const user_id = req.params.id
    const performance_id = req.params.performanceId
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
        const timelineArray = user.timeline
        if (timelineArray.includes(+performance_id)) {
            const index = timelineArray.indexOf(+performance_id)
            timelineArray.splice(index, 1)
        } else {
            timelineArray.push(+performance_id)
        }

        const response = await pool.query(
            'UPDATE users SET timeline = $1 WHERE user_id = $2',
            [timelineArray, user_id]
        )
        res.status(200).json({
            message: 'Favourite Activity Updated',
            body: {
                user: { timelineArray }
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

const getUserTop5Performances = async (req, res) => {
    const user_id = req.params.id
    const activity_id = req.params.activityId
    const top5Performances = await (await pool.query('SELECT * FROM performances WHERE user_id = $1 AND activity_id = $2 ORDER BY duration DESC LIMIT 5', [user_id, activity_id])).rows
    res.json(top5Performances)
}

const userperformance = async (req, res) => {
    const user_id = req.params.id
    try {
        const response = await pool.query(
            'SELECT * FROM performances JOIN activites ON performances.activity_id = activites.activity_id WHERE performances.user_id = $1',
            [user_id]
        )
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: { error }
        })
    }
}

module.exports = { getUserTop5Performances, userperformance, createperformance, getUserPerformance, deletePerformance, updateTimeline }
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

    //make variable created_at without timezone
    const created_at = new Date()


    try {
        await pool.query(
            'INSERT INTO performances (user_id, performanceName, duration, distance, speed,mts,activity_id,created_at) VALUES ($1, $2, $3,$4, $5, $6,$7,$8)',
            [user_id, performanceName, duration, distance, speed,mts,activity_id,created_at]
        )
        res.status(200).json({
            message: 'Signed Up Succesfully',
            body: {
                performance: { user_id, performanceName, duration, distance, speed,mts,activity_id }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: { error }
        })
    }
}

const getUserPerformance = async(req,res)=>{
    const  user_id  = req.params.id
    const activity_id = req.params.activityId
    console.log(user_id);
    try {
        const response = await pool.query(
            'SELECT * FROM performances WHERE user_id = $1 AND activity_id = $2',
            [user_id,activity_id]
        )
        console.log(response.rows);
        res.status(200).json(response.rows)
    } catch (error) {
        res.status(500).json({
            message: { error }
        })
    }

}

module.exports = { createperformance,getUserPerformance }
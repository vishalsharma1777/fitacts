const pool = require('../config/configDB')


const getActivities = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM activites')
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({
            message: { error }
        })
    }
}

module.exports ={getActivities}
const pool = require('../config/configDB')

const getUsersSendRequests = async (req, res) => {
    const userId = req.params.id
    try {
        const usersSendRequests = (await pool.query('SELECT u.user_id,u.name,u.email,u.mobilenumber,u.weight,u.height FROM users u WHERE user_id IN (SELECT unnest(sendrequests) FROM users WHERE user_id = $1)', [userId])).rows
        res.status(200).json(usersSendRequests)
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}

const getUsersReceivedRequests = async (req, res) => {
    const userId = req.params.id
    try {
        const usersSendRequests = (await pool.query('SELECT u.user_id,u.name,u.email,u.mobilenumber,u.weight,u.height FROM users u WHERE user_id IN (SELECT unnest(receivedrequests) FROM users WHERE user_id = $1)', [userId])).rows
        res.status(200).json(usersSendRequests)
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}

const acceptRequest = async (req, res) => {
    const { userId, followerId } = req.body
    try {
        await pool.query('UPDATE users SET following = array_append(following, $1) WHERE user_id = $2', [userId, followerId])
        await pool.query('UPDATE users SET sendrequests = array_remove(sendrequests, $1) WHERE user_id = $2', [userId, followerId])
        await pool.query('UPDATE users SET receivedrequests = array_remove(receivedrequests, $1) WHERE user_id = $2', [followerId, userId])
        res.status(200).json({ message: 'Request accepted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}

const rejectRequest = async (req, res) => {
    const { userId, followerId } = req.body
    try {
        await pool.query('UPDATE users SET sendrequests = array_remove(sendrequests, $1) WHERE user_id = $2', [userId, followerId])
        await pool.query('UPDATE users SET receivedrequests = array_remove(receivedrequests, $1) WHERE user_id = $2', [followerId, userId])
        res.status(200).json({ message: 'Request rejected' })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}


const getStatus = async (req, res) => {
    const user_id = req.params.id
    try {
        const following = (await pool.query('SELECT following FROM users WHERE user_id = $1', [user_id])).rows
        const requested = (await pool.query('SELECT sendrequests FROM users WHERE user_id = $1', [user_id])).rows

        res.status(200).json({ following: following[0].following, requested: requested[0].sendrequests })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}

const requestAction = async (req, res) => {
    const { userId, followerId,action } = req.body
    console.log(userId,followerId,action);
    try{
        if(action==="sendrequest"){
            console.log("sendrequest");
            await pool.query('UPDATE users SET sendrequests = array_append(sendrequests, $1) WHERE user_id = $2',[followerId, userId] )
            await pool.query('UPDATE users SET receivedrequests = array_append(receivedrequests, $1) WHERE user_id = $2', [userId, followerId])
            res.status(200).json({ message: 'Request sent' })
        }
        else if(action==="cancelrequest"){
            console.log("cancelrequest");
            await pool.query('UPDATE users SET sendrequests = array_remove(sendrequests, $1) WHERE user_id = $2',[followerId, userId] )
            await pool.query('UPDATE users SET receivedrequests = array_remove(receivedrequests, $1) WHERE user_id = $2', [userId, followerId])
            res.status(200).json({ message: 'Request cancelled' })
        }
        else if(action==="unfollow"){
            console.log("unfollow");
            await pool.query('UPDATE users SET following = array_remove(following, $1) WHERE user_id = $2', [ followerId,userId])
            res.status(200).json({ message: 'Unfollowed' })
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}

    module.exports = { getUsersSendRequests, getUsersReceivedRequests, acceptRequest, rejectRequest ,getStatus,requestAction}
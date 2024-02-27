const { User } = require('../db');

const userGoogleById = async (req, res) => {
    try {
        const { googlebId } = req.params;
        const userGoogle = await User.findOne({ where: { googlebId } });
        res.status(200).json(userGoogle);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

module.exports = userGoogleById;
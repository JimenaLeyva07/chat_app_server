const Message = require('../models/message');

const getChat = async (req, resp) =>{

    const myUid = req.uid;
    const messagesFrom = req.params.from;
    const lastThirty = await Message.find({
        $or: [{from: myUid, to: messagesFrom}, {from: messagesFrom, to: myUid}]
    })
    .sort({createdAt: 'desc'})
    .limit(30);

    resp.json({
        ok: true,
        messages: lastThirty
    });


}

module.exports = {
    getChat
}
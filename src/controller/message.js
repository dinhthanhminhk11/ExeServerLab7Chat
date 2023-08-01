import user from '../models/user';
import Message from '../models/message';

async function addMessage(req, res) {
  try {
    const { from, to, message } = req.body;
    const time = new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes();
    const data = await Message.create({
      message: { text: message }, user: [from, to], send: from, time_send: time, sendTo: to, status: false
    });
    if (data) return res.json({
      msg: 'Message added successfully.', data
    }); else return res.json({ msg: 'Failed to add message to the database' });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
}

async function findMessageUser(req, res) {
  try {
    const data = await Message.find({
      'send': { $in: [req.params.send, req.params.sendTo] }, 'sendTo': { $in: [req.params.send, req.params.sendTo] }
    });
    res.json({
      data
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
}

async function findUser(req, res) {
  try {
    const excludedUserId = req.params.id;

    const data = await user.find({ _id: { $ne: excludedUserId } });

    res.json(data);
  } catch (error) {
    res.status(400).json({
      error
    });
  }
}

module.exports = {
  findUser,
  findMessageUser, addMessage
};
const db = require('./db');

exports.workspace = async (req, res) => {
  const id = req.params.id;
  const result = await db.getWorkSpace(id);
  res.status(200).json({'workspaces': result});
};

exports.getChannels = async (req, res) => {
  const workspaceid = req.params.id;
  const channels = await db.getChannels(workspaceid);
  res.status(200).json({'channels': channels});
};

exports.getMessages = async (req, res) => {
  const channelid = req.params.id;
  const messages = await db.getMessages(channelid);
  res.status(200).json({'messages': messages});
};

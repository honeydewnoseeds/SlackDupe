const {Pool} = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getUser = async (email, password) => {
  const select = 'SELECT * FROM people WHERE email = $1';
  const query = {
    text: select,
    values: [email],
  };
  const {rows} = await pool.query(query);
  // user with this email was not found
  if (rows[0] === undefined) {
    return undefined;
  }
  // incorrect password
  if (!bcrypt.compareSync(password, rows[0].userinfo.password)) {
    return undefined;
  }
  const userinfo = {
    'username': rows[0].userinfo.name,
    'email': rows[0].email,
    'role': rows[0].userinfo.role,
    'id': rows[0].id,
  };
  return userinfo;
};

exports.getWorkSpace = async (userid) => {
  const select = 'SELECT * FROM workspace where person = $1';
  const query = {
    text: select,
    values: [userid],
  };
  const {rows} = await pool.query(query);
  const workspace = [];
  rows.map((w) => {
    const info = {'name': w.info.name, 'id': w.id};
    workspace.push(info);
  });
  return workspace;
};

exports.getChannels = async (workspaceid) => {
  const select = 'SELECT * FROM channel where workspace = $1';
  const query = {
    text: select,
    values: [workspaceid],
  };
  const {rows} = await pool.query(query);
  const channels = [];
  rows.map((c) => {
    const info = {'name': c.info.name, 'id': c.id};
    channels.push(info);
  });
  return channels;
};

exports.getMessages = async (channelid) => {
  const select = 'SELECT * FROM convo where channel = $1';
  const query = {
    text: select,
    values: [channelid],
  };
  const {rows} = await pool.query(query);
  const messages = [];
  rows.map((m) => {
    const info = {'message': m.info.message, 'id': m.id};
    messages.push(info);
  });
  return messages;
};

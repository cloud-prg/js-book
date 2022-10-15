const basic = require('./sidebar/basic');
const book = require('./sidebar/book');
const components = require('./sidebar/components');
const dailyapi = require('./sidebar/dailyapi');
const note = require('./sidebar/note');
const additional = require("./sidebar/not-tecnoloty");
const home = require('./sidebar/home');

const sidebar = [
  home,
  book,
  note,
  components,
  dailyapi,
  basic,
  additional
]


module.exports = sidebar;
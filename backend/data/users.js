const bcrypt = require('bcryptjs')

const users = [
	// userii au fieldurile din modelul nostru User. altfel nu merge.
	{
		name: "Admin User",
		email: "admin@hydesden.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: true,
	},
	{
		name: "Ion Caragiale",
		email: "ion@google.com",
		password: bcrypt.hashSync("123456", 10),
	},
	{
		name: "Ioana Caragiale",
		email: "ioana@google.com",
		password: bcrypt.hashSync("123456", 10),
	},
];

module.exports = users;
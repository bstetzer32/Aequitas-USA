'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    addressLineOne: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    addressLineTwo: {
      type: DataTypes.STRING(100),
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING(2),
    },
    zipCode: {
      allowNull: false,
      type: DataTypes.STRING(5),
    },
    authenticated: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  }, 
   {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
  const { id, username, email } = this; // context will be the User instance
  return { id, username, email };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Leadership, {
      foreignkey: "citizen_id",
      as: "citizen"
    })
    User.hasMany(models.Leadership, {
      foreignkey: "leader_id",
      as: "leader"
    })
    User.hasMany(models.Office, {
      foreignkey: "incumbant_id",
      as: "incumbant"
    })
    User.hasMany(models.Problem, {
      foreignkey: "citizen_id",
      as: "citizen"
    })
    User.hasMany(models.Solution, {
      foreignkey: "citizen_id",
      as: "citizen"
    })
    User.hasMany(models.Vote, {
      foreignkey: "citizen_id",
      as: "citizen"
    })
  };
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };  
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
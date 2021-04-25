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
        len: [5, 256]
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
      foreignKey: "citizenId",
      as: "citizen"
    })
    User.hasMany(models.Leadership, {
      foreignKey: "leaderId",
      as: "leader"
    })
    User.hasMany(models.Office, {
      foreignKey: "incumbantId",
      as: "incumbant"
    })
    User.hasMany(models.Problem, {
      foreignKey: "citizenId",
      as: "citizen"
    })
    User.hasMany(models.Solution, {
      foreignKey: "citizenId",
      as: "citizen"
    })
    User.hasMany(models.Vote, {
      foreignKey: "citizenId",
      as: "citizen"
    })
    User.belongsToMany(models.OfficeSubscription, {
      otherKey: "officeSubscriptionId",
      as: "OfficeSubscription",
      through: "Subscriptions",
      foreignKey: "subscriberId",
    });
    User.belongsToMany(models.ProblemSubscription, {
      otherKey: "problemSubscriptionId",
      as: "ProblemSubscription",
      through: "Subscriptions",
      foreignKey: "subscriberId",
    });
    User.belongsToMany(models.RegionSubscription, {
      otherKey: "regionSubscriptionId",
      as: "RegionSubscription",
      through: "Subscriptions",
      foreignKey: "subscriberId",
    });
    User.belongsToMany(models.SolutionSubscription, {
      otherKey: "solutionSubscriptionId",
      as: "SolutionSubscription",
      through: "Subscriptions",
      foreignKey: "subscriberId",
    });
    User.belongsToMany(models.TopicSubscription, {
      otherKey: "topicSubscriptionId",
      as: "TopicSubscription",
      through: "Subscriptions",
      foreignKey: "subscriberId",
    });
    User.belongsToMany(models.UserSubscription, {
      otherKey: "userSubscriptionId",
      as: "UserSubscription",
      through: "Subscriptions",
      foreignKey: "subscriberId",
    });
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
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
    firstName: {
      type: DataTypes.STRING(100),
    },
    lastName: {
      type: DataTypes.STRING(100),
    },
    addressLineOne: {
      type: DataTypes.STRING(100),
    },
    addressLineTwo: {
      type: DataTypes.STRING(100),
    },
    city: {
      type: DataTypes.STRING(100),
    },
    state: {
      type: DataTypes.STRING(2),
    },
    zipCode: {
      type: DataTypes.STRING(5),
    },
    authenticated: {
      type: DataTypes.BOOLEAN
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    },
  }, 
   {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt', 'addressLineOne', 'addressLineTwo', 'city', 'state', 'zipCode', 'firstName', 'lastName'],
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
    })
    User.hasMany(models.Office, {
      foreignKey: "incumbantId",
    })
    // User.hasMany(models.Problem, {
    //   foreignKey: "citizenId",
    // })
    // User.hasMany(models.Solution, {
    //   foreignKey: "citizenId",
    // })
    // User.hasMany(models.Vote, {
    //   foreignKey: "citizenId",
    // })
    // User.hasMany(models.Highlight, {
    //   foreignKey: "citizenId",
    // })
    // User.belongsToMany(models.OfficeSubscription, {
    //   otherKey: "officeSubscriptionId",
    //   through: "Subscriptions",
    //   foreignKey: "subscriberId",
    // });
    // User.belongsToMany(models.ProblemSubscription, {
    //   otherKey: "problemSubscriptionId",
    //   through: "Subscriptions",
    //   foreignKey: "subscriberId",
    // });
    // User.belongsToMany(models.RegionSubscription, {
    //   otherKey: "regionSubscriptionId",
    //   through: "Subscriptions",
    //   foreignKey: "subscriberId",
    // });
    // User.belongsToMany(models.SolutionSubscription, {
    //   otherKey: "solutionSubscriptionId",
    //   through: "Subscriptions",
    //   foreignKey: "subscriberId",
    // });
    // User.belongsToMany(models.TopicSubscription, {
    //   otherKey: "topicSubscriptionId",
    //   through: "Subscriptions",
    //   foreignKey: "subscriberId",
    // });
    // User.belongsToMany(models.UserSubscription, {
    //   otherKey: "userSubscriptionId",
    //   through: "Subscriptions",
    //   foreignKey: "subscriberId",
    // });
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
  User.signup = async function ({ username, email, password, firstName, lastName }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      firstName,
      lastName
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
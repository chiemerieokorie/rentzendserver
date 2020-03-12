module.exports = (sequelize, DataTypes) => {
    const Agent = sequelize.define("Agent", {
        firstName: {type : DataTypes.STRING, allowNull:false},
        lastName: {type : DataTypes.STRING, allowNull:false},
        email: {type : DataTypes.STRING, allowNull:false, unique:true},
        zipCode: {type : DataTypes.STRING , allowNull:false},
        suite: {type : DataTypes.STRING, allowNull:false},
        streetAddress: {type : DataTypes.STRING, allowNull:false},
        city: {type : DataTypes.STRING, allowNull:false},
        state: {type : DataTypes.STRING, allowNull:false},
        phoneNumber: {type : DataTypes.STRING, allowNull:false},
    });
    return Agent;
};
// Data model for a user object
module.exports = (Sequelize, sequelize) => {
    const user = sequelize.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: Sequelize.STRING,
            password: Sequelize.STRING,
            email: Sequelize.STRING,
            age: Sequelize.INTEGER,
            verification_token: Sequelize.STRING,
        }
    );
    return user;
}
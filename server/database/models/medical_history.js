// Data model for a user object
module.exports = (Sequelize, sequelize) => {
    const medical_history = sequelize.define(
        'medical_history',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: Sequelize.STRING
        }
    );
    return medical_history;
}
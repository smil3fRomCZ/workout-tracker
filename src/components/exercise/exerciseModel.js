const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/dbConnect');

const Exercise = sequelize.define('Exercise', {
    exerciseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    creatorId: {
        type: DataTypes.INTEGER,
    },
    exerciseName: {
        type: DataTypes.STRING,
        unique: true,
    },
    bodyPart: {
        type: DataTypes.ENUM(
            'Neck',
            'Front delts',
            'Pecs',
            'Biceps',
            'Forearms',
            'Obliques',
            'Abs',
            'Front thighs',
            'Soleus',
            'Shins',
            'Traps',
            'Side delts',
            'Rear delts',
            'Triceps',
            'Lats',
            'Lower back',
            'Glutes',
            'Hip abductors',
            'Inner thigh',
            'Rear thighs',
            'Calves'
        ),
        defaultValue: 'Neck',
    },
});

module.exports = Exercise;

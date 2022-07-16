const Exercise = require('./exerciseModel');

class ExerciseService {
    static createNewExercise = async (newExercise) => {
        const userInput = newExercise;
        try {
            const newExercise = await Exercise.create(userInput, {});
            const { exerciseName, bodyPart } = newExercise;
            return { exerciseName, bodyPart };
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static getAllExercises = async () => {
        try {
            return await Exercise.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static getExerciseById = async (exerciseId) => {
        let exercise;
        try {
            exercise = await Exercise.findByPk(exerciseId);
            return exercise;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static getExercisesByUserId = async (userId) => {
        let exercisesFromSpecificUser;
        try {
            exercisesFromSpecificUser = await Exercise.findAll({
                where: { creatorId: userId },
            });
            return exercisesFromSpecificUser;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static getExerciseByBodyPart = async (bodyPart) => {
        let exercises;
        try {
            exercises = await Exercise.findAll({
                where: { bodyPart: bodyPart },
            });
            return exercises;
        } catch (error) {
            throw new Error(error.message);
        }
    };
    static updateExercise = async (
        exerciseId,
        userId,
        exerciseName,
        bodyPart
    ) => {
        try {
            const exercise = await Exercise.findByPk(exerciseId);
            if (!exercise) {
                throw new Error('No exercise found');
            }
            if (exercise.creatorId !== userId) {
                throw new Error(
                    'You are not authorized to delete this exercise'
                );
            }
            return await exercise.update(
                { exerciseName, bodyPart },
                { where: { exerciseId } }
            );
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static deleteExercise = async (exerciseId, userId) => {
        try {
            const exercise = await Exercise.findByPk(exerciseId);
            if (!exercise) {
                throw new Error('No exercise found');
            }
            if (exercise.creatorId !== userId) {
                throw new Error(
                    'You are not authorized to delete this exercise'
                );
            }
            return await exercise.destroy({ where: { exerciseId } });
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

module.exports = ExerciseService;

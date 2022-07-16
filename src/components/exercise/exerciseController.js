const { validationResult } = require('express-validator');
const ExerciseService = require('./exerciseService');

exports.createNewExercise = async (req, res, next) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return res
            .status(401)
            .json({ error: 'Pls provide all informations about exercises' });
    }
    const newExercise = req.body;
    try {
        const savedData = await ExerciseService.createNewExercise(newExercise);
        return res.status(201).json({ data: savedData });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getAllExercises = async (req, res, next) => {
    let exercisesData;
    try {
        exercisesData = await ExerciseService.getAllExercises();
        return res.status(200).json({
            numberOfExercises: exercisesData.length,
            data: exercisesData,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getExerciseById = async (req, res, next) => {
    const { exerciseId } = req.params;
    let exercise;
    try {
        exercise = await ExerciseService.getExerciseById(exerciseId);
        if (!exercise) {
            return res.status(404).json({ message: 'No such exercise found' });
        }
        return res.status(200).json({ data: exercise });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getExerciseByUserId = async (req, res, next) => {
    const { userId } = req.params;
    let exercisesByUserId;
    try {
        exercisesByUserId = await ExerciseService.getExercisesByUserId(
            Number(userId)
        );
        if (exercisesByUserId.length > 0) {
            return res.status(200).json({
                numberOfExercises: exercisesByUserId.length,
                data: exercisesByUserId,
            });
        }
        return res.status(404).json({ message: 'No exercises found' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getExercisesByBodyPart = async (req, res, next) => {
    const { bodyPart } = req.params;
    let exercises;
    try {
        exercises = await ExerciseService.getExerciseByBodyPart(bodyPart);
        if (exercises.length > 0) {
            return res.status(200).json({
                numberOfExercises: exercises.length,
                data: exercises,
            });
        }
        return res
            .status(404)
            .json({ message: 'No exercise found for this body part' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.updateExercise = async (req, res, next) => {
    const { exerciseId } = req.params;
    const { exerciseName, bodyPart } = req.body;
    const userId = req.user.userId;
    try {
        const result = await ExerciseService.updateExercise(
            exerciseId,
            userId,
            exerciseName,
            bodyPart
        );
        if (result[0] > 0) {
            return res
                .status(200)
                .json({ message: 'Exercise updated successfully' });
        }
        return res.status(400).json({ message: 'Update failed' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.deleteExercise = async (req, res, next) => {
    const { exerciseId } = req.params;
    const { userId } = req.user;
    try {
        const deleteResult = await ExerciseService.deleteExercise(
            exerciseId,
            userId
        );
        if (deleteResult > 0) {
            return res.status(204);
        }
        return res.status(400).json({ message: 'Delete failed!' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

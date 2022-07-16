const exerciseRouter = require('express').Router();
const { body } = require('express-validator');
const {
    authentificateUser,
} = require('../../middleware/authentificateMiddleware');

const exerciseController = require('./exerciseController');

exerciseRouter.get('/', exerciseController.getAllExercises);
exerciseRouter.get('/:exerciseId', exerciseController.getExerciseById);
exerciseRouter.get('/users/:userId', exerciseController.getExerciseByUserId);
exerciseRouter.get(
    '/bodyPart/:bodyPart',
    exerciseController.getExercisesByBodyPart
);

exerciseRouter.post(
    '/',
    authentificateUser,
    body('exerciseName').notEmpty(),
    body('bodyPart').notEmpty(),
    exerciseController.createNewExercise
);
exerciseRouter.patch(
    '/:exerciseId',
    authentificateUser,
    exerciseController.updateExercise
);

exerciseRouter.delete(
    '/:exerciseId',
    authentificateUser,
    exerciseController.deleteExercise
);

module.exports = exerciseRouter;

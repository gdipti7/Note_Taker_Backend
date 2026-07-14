import { body, validationResult } from 'express-validator'

export const noteRules = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('body')
    .notEmpty()
    .withMessage('Note body is required')
    .isString()
    .withMessage('Note body must be a string')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Note body must be at least 5 characters'),

  body('category')
    .optional()
    .isString()
    .withMessage('Category must be a string')
    .trim()
    .isIn(['Personal', 'Work', 'Study'])
    .withMessage('Category must be Personal, Work, or Study'),
]

export const noteUpdateRules = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('body')
    .optional()
    .isString()
    .withMessage('Note body must be a string')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Note body must be at least 5 characters'),

  body('category')
    .optional()
    .isString()
    .withMessage('Category must be a string')
    .trim()
    .isIn(['Personal', 'Work', 'Study'])
    .withMessage('Category must be Personal, Work, or Study'),
]

export function validateNote(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    })
  }

  next()
}
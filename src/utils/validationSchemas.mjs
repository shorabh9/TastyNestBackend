export const createUserValidationSchema = {
    firstname: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Firstname is required'
        }
    },
    lastName: {
        in: ['body'],
        isString: true,
        optional: true
    },
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: 'Invalid email format'
        },
        notEmpty: {
            errorMessage: 'Email is required'
        }
    },
    password: {
        in: ['body'],
        isLength: {
            options: { min: 6 },
            errorMessage: 'Password must be at least 6 characters long'
        }
    },
    location: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Location is required'
        }
    },
    phone: {
        in: ['body'],
        optional: true, // ✅ Allows request without phone field
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Phone number must be exactly 10 digits long'
        },
        isNumeric: {
            errorMessage: 'Phone number must contain only digits'
        }
    }
};

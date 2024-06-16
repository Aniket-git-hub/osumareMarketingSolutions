export default function reqInputValidation(fields) {
    return (req, res, next) => {
        const errors = []

        for (const field of fields) {
            const { name, required, type } = field
            const value = req.body[name] !== undefined ? req.body[name] : req.params[name]

            if (required && value === undefined) {
                errors.push({ message: `${name} is required` })
            } else if (value !== undefined) {
                if (type === 'string' && typeof value !== 'string') {
                    errors.push({ message: `${name} must be a string` })
                } else if (type === 'boolean' && typeof value !== 'boolean') {
                    errors.push({ message: `${name} must be a boolean` })
                } else if (type === 'integer' && !Number.isInteger(parseInt(value))) {
                    errors.push({ message: `${name} must be an integer` })
                }
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors })
        }

        next()
    }
}


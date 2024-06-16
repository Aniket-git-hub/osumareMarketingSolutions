export function requireAuth(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const demoToken = "123456"

        if (token === demoToken) {
            next()
        } else {
            res.status(403).json({ message: 'Forbidden' })
        }
    } catch (error) {
        next(error)
    }
}
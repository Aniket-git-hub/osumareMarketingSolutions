let tasks = []
let nextId = 1

export function getTasks(req, res, next) {
    try {
        let { page = 1, limit = 10, sortBy = 'id', order = 'asc', isCompleted } = req.query
        page = parseInt(page)
        limit = parseInt(limit)

        let filteredTasks = tasks
        if (isCompleted !== undefined) {
            const isCompletedBool = isCompleted === 'true'
            filteredTasks = filteredTasks.filter(task => task.isCompleted === isCompletedBool)
        }

        filteredTasks.sort((a, b) => {
            if (order === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1
            }
        })

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatedTasks = filteredTasks.slice(startIndex, endIndex)
        const hasNextPage = endIndex < filteredTasks.length

        res.status(200).json({
            page,
            limit,
            totalItems: filteredTasks.length,
            itemsInCurrentPage: paginatedTasks.length,
            hasNextPage,
            tasks: paginatedTasks
        })
    } catch (error) {
        next(error)
    }
}


export function getTaskById(req, res, next) {
    try {
        const { id } = req.params
        const task = tasks.find(task => task.id === parseInt(id))
        if (task) {
            res.status(200).json(task)
        } else {
            res.status(404).json({ message: 'Task not found' })
        }
    } catch (error) {
        next(error)
    }
}

export function createTask(req, res, next) {
    try {
        const { name, isCompleted } = req.body
        const task = {
            id: nextId++,
            name,
            isCompleted: Boolean(isCompleted)
        }
        tasks.push(task)
        res.status(201).json({
            message: "New Task Created.",
            task
        })
    } catch (error) {
        next(error)
    }
}

export function updateTask(req, res, next) {
    try {
        const { id } = req.params
        const { name, isCompleted } = req.body
        const task = tasks.find(task => task.id === parseInt(id))
        if (task) {
            task.name = name !== undefined ? name : task.name
            task.isCompleted = isCompleted !== undefined ? Boolean(isCompleted) : task.isCompleted
            res.status(200).json({
                message: "Task Updated.",
                task
            })
        } else {
            res.status(404).json({ message: 'Task not found' })
        }
    } catch (error) {
        next(error)
    }
}

export function deleteTask(req, res, next) {
    try {
        const { id } = req.params
        const taskIndex = tasks.findIndex(task => task.id === parseInt(id))
        if (taskIndex !== -1) {
            const deletedTask = tasks.splice(taskIndex, 1)
            res.status(200).json({
                message: "Task Deleted.",
                task: deletedTask[0]
            })
        } else {
            res.status(404).json({ message: 'Task not found' })
        }
    } catch (error) {
        next(error)
    }
}

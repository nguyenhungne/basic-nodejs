function validateEntityFields(schema, entity) {
    let validationError = ''
    Object.keys(schema).every(field => {
        if (field === 'id') {
            return true
        }
        if (schema[field].required && entity[field] === undefined) {
            validationError = `${field} is required`
            return false
        }

        if (schema[field].type !== typeof entity[field]) {
            validationError = `Invalid type of field ${field}`
            return false
        }
        return true
    })
    return validationError
}

function validateEntityUniqueness(schema, entity, existingEntities) {
    let validationError = ''
    Object.keys(schema).filter(field => schema[field].unique).some(field => {
        if (existingEntities.some(item => item[field] === entity[field])) {
            validationError = `${field} is already existed`
        }
    })
    return validationError
}

module.exports = { validateEntityFields, validateEntityUniqueness }
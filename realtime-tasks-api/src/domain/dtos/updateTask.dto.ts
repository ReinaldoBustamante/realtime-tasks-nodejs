
export class UpdateTaskDto {
    constructor(
        public title?: string,
        public description?: string,
        public status?: string,
        public updated_at?: Date
    ){}

    public static create(object: {[key:string]: any}): [string?, UpdateTaskDto?] {
        const { title, description, status } = object
        const allowedStatuses = ['pendiente', 'completada']
        const date = new Date()

        if(title && title.length > 100) return ["title must be at most 100 characters long"]
        if(description && description.length > 500) return ["description must be at most 500 characters long"]
        if(status && !allowedStatuses.includes(status) ) return ['Invalid value for status. Only "pendiente" or "completada" are allowed.']
        
        return [undefined, new UpdateTaskDto(title, description, status, date)]
    }
}
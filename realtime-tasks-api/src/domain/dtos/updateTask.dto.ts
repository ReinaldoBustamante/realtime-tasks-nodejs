
export class UpdateTaskDto {
    constructor(
        public status: string,
        public updated_at: Date
    ){}

    public static create(object: {[key:string]: any}): [string?, UpdateTaskDto?] {
        const { status } = object
        const allowedStatuses = ['pending', 'completed']
        const date = new Date()
        if ( !status ) return ['Missing status']
        if( !allowedStatuses.includes(status) ) return ['Invalid value for status. Only pending or completed are allowed.']
        
        return [undefined, new UpdateTaskDto(status, date)]
    }
}
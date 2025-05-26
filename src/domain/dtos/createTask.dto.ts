export class CreateTaskDto {
    constructor(
        public title: string,
        public description: string
    ){}

    public static create( object: {[key:string]: any} ): [string?, CreateTaskDto?]{
        const { title, description } = object
        if(!title) return ["missing title"];
        if(title.length > 100) return ["title must be at most 100 characters long"]
        if(description && description.length > 500) return ["description must be at most 500 characters long"]
        
        return [undefined, new CreateTaskDto(title, description)]
    }

}
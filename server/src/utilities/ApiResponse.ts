

interface IApiResponse {
    statusCode: number,
    data: object,
    message: string
    
}

class ApiResponse implements IApiResponse{
    constructor(
        public readonly statusCode : number,
        public readonly data: object,
        public readonly message: string
    ) {}
}

export default ApiResponse
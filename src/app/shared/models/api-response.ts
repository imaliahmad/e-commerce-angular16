export interface ApiResponse<T> {
    model: T; 
    isError: boolean;
    status: number;
    message: string;
    executionTime: number;
}
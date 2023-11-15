export interface AppResponse<T> {
    tournamentId?: any;
    success: boolean;
    data: T;
    message: string;
    error?: string;
    errorCode?: number;
    errorData?: unknown;
}

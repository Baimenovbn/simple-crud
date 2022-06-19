export const createErrorResponse = (error: Error) => JSON.stringify({ message: error.message });

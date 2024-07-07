/**
 * Обработка ошибок. Логирует ошибку.
 * @param {Error} error Объект ошибки.
 */
const handleServerError = (error: Error) => {
    console.error('Error:', error);
};

export { handleServerError };

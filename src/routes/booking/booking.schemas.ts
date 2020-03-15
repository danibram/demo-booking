export const bookingBodySchema = {
    body: {
        type: 'object',
        required: ['room'],
        properties: {
            room: { type: 'string' }
        }
    }
}

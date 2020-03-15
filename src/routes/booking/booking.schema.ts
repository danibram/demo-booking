export const bookingSchema = {
    body: {
        type: 'object',
        required: ['room'],
        properties: {
            room: { type: 'string' }
        }
    }
}

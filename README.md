# Demo Booking System

## Dev env without docker

1. Clone this repo
2. Run `npm install`
3. Run `npm run dev`

## Test

Run `npm test` or meawhile development run `npm run watch`

## About

This project is created using:

-   fastify: web framework
-   ava: testing environment
-   typescript: language
-   pino: logging
-   axios: make http calls
-   prettier + ESLint: lint utils, code style

### Folders:

```
src
├── routes
    ├── bookings
        ├── bookings.spec.ts        - Test
        ├── bookings.ts             - Bookings route handle
        └── index.ts
    ├── booking
        ├── booking.schema.ts       - Fastify input validation
        ├── booking.spec.ts         - Test
        ├── booking.ts              - Booking route handle
        └── index.ts
    ├── checkIn
        ├── checkIn.schema.ts       - Fastify input
        ├── checkIn.spec.ts         - Test
        ├── checkIn.ts              - Check in handle
        └── index.ts
    ├── openDoor
        ├── openDoor.ts             - Open door handle
        ├── openDoor.schema.ts      - Fastify input validation
        ├── openDoor.spec.ts        - Test
        └── index.ts
    ├── checkOut
        ├── checkOut.schema.ts      - Fastify input validation
        ├── checkOut.spec.ts        - Test
        ├── checkOut.ts             - Check out handle
        └── index.ts
    └── index.ts
├── utils
    ├── bookingManager.spec.ts      - Test for Booking Manager
    ├── bookingManager.ts           - Booking manager (Bussiness logic)
    ├── db.spec.ts                  - DB testing staff
    ├── db.ts                       - DB staff
    ├── helpers.ts                  - Helper functions
    └── types.ts                    - Booking typings
├── envs.ts                         - ENV variables manager
├── router.ts                       - Fastify router
├── server.spec.ts                  - Fastify server configuration test
├── server.ts                       - Fastify server configuration
└── index.ts                        - Entry point
```

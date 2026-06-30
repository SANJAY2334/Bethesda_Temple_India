import pino from 'pino'

export const logger = pino(
  process.env.NODE_ENV === 'production'
    ? {} // JSON logging in production
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
)
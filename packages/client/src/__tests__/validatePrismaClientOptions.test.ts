import { validatePrismaClientOptions } from '../runtime/utils/validatePrismaClientOptions'

const config = {
  datasourceNames: ['db'],
}

describe('valid options', () => {
  test('empty', () => {
    expect.assertions(0)
    validatePrismaClientOptions({}, config)
  })
  test('full', () => {
    expect.assertions(0)
    validatePrismaClientOptions(
      {
        datasources: {
          db: {
            url: '',
          },
        },
        errorFormat: 'pretty',
        log: ['error'],
      },
      config,
    )

    validatePrismaClientOptions(
      {
        datasources: {
          db: {
            url: '',
          },
        },
        errorFormat: 'pretty',
        log: [
          {
            emit: 'event',
            level: 'error',
          },
        ],
      },
      config,
    )
  })
})

describe('invalid options', () => {
  test('typos', () => {
    expect(() =>
      validatePrismaClientOptions(
        {
          errorsFormat: 'minimal',
        } as any,
        config,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unknown property errorsFormat provided to PrismaClient constructor. Did you mean "errorFormat"?
      Read more at https://pris.ly/d/client-constructor
    `)
    expect(() =>
      validatePrismaClientOptions(
        {
          errorFormat: 'minimal',
          datasources: {
            asd: {},
          },
        },
        config,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unknown datasource asd provided to PrismaClient constructor. Available datasources: db
      Read more at https://pris.ly/d/client-constructor
    `)
    expect(() =>
      validatePrismaClientOptions(
        {
          errorFormat: 'minimal',
          datasources: {
            db: { murl: '' },
          },
        } as any,
        config,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Invalid value {"db":{"murl":""}} for datasource "db" provided to PrismaClient constructor.
      It should have this form: { url: "CONNECTION_STRING" }
      Read more at https://pris.ly/d/client-constructor
    `)
    expect(() =>
      validatePrismaClientOptions(
        {
          errorFormat: 'minimal',
          log: [{ helo: 'world' }],
        } as any,
        config,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Invalid property helo for "log" provided to PrismaClient constructor
      Read more at https://pris.ly/d/client-constructor
    `)
    expect(() =>
      validatePrismaClientOptions(
        {
          errorFormat: 'minimal',
          log: ['muery'],
        } as any,
        config,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Invalid log level "muery" provided to PrismaClient constructor. Did you mean "query"?
      Read more at https://pris.ly/d/client-constructor
    `)
  })
})

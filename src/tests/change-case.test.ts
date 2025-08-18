import { capitalCase } from 'change-case'
import { expect, test } from 'vitest'

test('change-case', () => {
  expect(capitalCase('hello world')).toMatchInlineSnapshot(`"Hello World"`)
  expect(capitalCase('hello-world')).toMatchInlineSnapshot(`"Hello World"`)
})

import { expect, test } from 'vitest'
import { greeting } from './greeting'

test('greeting', () => {
  expect(greeting('Bazel')).toBe('Hello, Bazel!')
  expect(greeting('  ')).toBe('Hello, stranger!')
})

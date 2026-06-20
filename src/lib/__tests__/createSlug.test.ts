import { describe, it, expect } from 'vitest'

describe('createSlug', () => {
  it('generates slug from title', async () => {
    const createSlug = (await import('../createSlug')).default
    expect(createSlug('Hello World', 'static-slug')).toBe('hello-world')
  })

  it('handles special characters in title', async () => {
    const createSlug = (await import('../createSlug')).default
    expect(createSlug('Hello, World! How are you?', 'ignored')).toBe('hello-world-how-are-you')
  })

  it('handles multiple spaces', async () => {
    const createSlug = (await import('../createSlug')).default
    expect(createSlug('Hello   World', 'ignored')).toBe('hello-world')
  })

  it('handles leading and trailing whitespace', async () => {
    const createSlug = (await import('../createSlug')).default
    expect(createSlug('  Hello World  ', 'ignored')).toBe('hello-world')
  })

  it('handles leading and trailing hyphens', async () => {
    const createSlug = (await import('../createSlug')).default
    expect(createSlug('-Hello World-', 'ignored')).toBe('hello-world')
  })

  it('lowercases the title', async () => {
    const createSlug = (await import('../createSlug')).default
    expect(createSlug('HELLO WORLD', 'ignored')).toBe('hello-world')
  })

  it('removes non-word characters', async () => {
    const createSlug = (await import('../createSlug')).default
    expect(createSlug('Hello@World! #Test', 'ignored')).toBe('helloworld-test')
  })
})

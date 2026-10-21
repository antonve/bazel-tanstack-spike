export function greeting(name: string): string {
  return `Hello, ${name.trim() || 'stranger'}!`
}

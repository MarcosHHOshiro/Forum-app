/**
 * Make some properties optional on a type
 *
 * @example
 * type Post = {
 *   id: string
 *   name: string
 *   email: string
 * }
 *
 * type PartialPost = Optional<Post, 'id' | 'email'>
 */
export type Optional<T, K extends keyof T> =
    Pick<Partial<T>, K> & Omit<T, K>
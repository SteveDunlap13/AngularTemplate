
export interface AppConfig {
    version: {
        number: string;
        build: string;
    };
    app: {
        name: string;
        localDev: boolean;
        graphUri: string;
        baseUri: string;
    };
}

/** All primitive types */
type Primitive = string | number | boolean | Array<unknown> | undefined | null;

/**
 * Get arrays of paths to all properties from an interface.
 *
 * For example, for given Entity
 * ```ts
 * interface Entity {
 *     field: string,
 *     objectField: {
 *         deepField: number
 *     }
 * }
 * ```
 * PropertyPath<Entity> will result in `['field'] | ['objectField'] | ['objectField', 'deepField']`
 */
type PropertyPath<T> = T extends Primitive ? never : { [K in keyof T]: [K] | [K, ...PropertyPath<T[K]>] }[keyof T];


/**
 * Get type of a property based on it's path
 *
 * For example, for given Entity
 * ```ts
 * interface Entity {
 *     field: string,
 *     objectField: {
 *         deepField: number
 *     }
 * }
 * ```
 * PropertyType<Entity, ['objectField']> will result in `{ deepField: number }`
 */
type PropertyType<T, K extends PropertyPath<T>> =
    K extends [''] ? T :
    K extends [infer F] ?
    F extends keyof T ? T[F] : never :
    K extends [infer F, ...infer R] ?
    F extends keyof T ? PropertyType<T[F], Extract<R, PropertyPath<T[F]>>> : never : never;

/**
 * Convert string array into a string with a dot between items.
 *
 * Example: `Join<['a', 'b', 'c']>` is `'a.b.c'`
 */
type Join<T extends string[]> =
    T extends [infer F] ? F :
    T extends [infer F, ...infer R] ? `${Extract<F, string>}.${Join<Extract<R, string[]>>}` : string;

/**
 * Convert string with dots into string array.
 *
 * Example: `Split<'a.b.c'>` is `['a', 'b', 'c']`
 */
type Split<T extends string> = T extends `${infer F}.${infer U}` ? [F, ...Split<U>] : [T];

/** Get all possible dot-notation paths in AppConfig */
export type AppConfigPropertyPath = Join<PropertyPath<AppConfig>>;

/** Get AppConfig property type based on its dot notation */
export type AppConfigPropertyType<T extends AppConfigPropertyPath> = PropertyType<AppConfig, Split<T>>;

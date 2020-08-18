/**
 * return an optional
 * if the thing is not truthy (undefined), returns the default value instead
 *
 * @param thing
 * @param defaultValue
 * @returns {*|string}
 */
export function opt(thing, defaultValue = "") {
  return thing ? thing : defaultValue
}

/**
 * Returns an optional array
 * If a thing does not exist, returns an array
 * uses opt
 *
 * @param thing
 * @returns {*|string}
 */
export function optArr(thing) {
  return opt(thing, [])
}

/**
 * Make a thing into an array
 * If it's not already is an array, make it an array of 1 item
 *
 * @param thing
 * @returns {*|*[]}
 */
export function makeArray(thing) {
  if (! thing) {
    return []
  }
  return Array.isArray(thing) ? thing : [thing]
}
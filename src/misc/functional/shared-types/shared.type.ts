


/**
 * Creates a tuple of any with the same length as GTuple
 */
export type ISameLength<GTuple extends any[]> =
  Extract<{ [K in keyof GTuple]: any }, any[]>;



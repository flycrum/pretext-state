export const globalInternalData = {
  /**
   * Runtime counters hashmap representing how many times each slice has been created so names can be incremented.
   */
  sliceNameInstanceCounter: {} as Record<string, number>,

  /**
   * Runtime counter for creation of individual atoms.
   */
  atomCounter: (() => {
    /**
     * The initial timestamp used for unique naming.
     * Note: this was original to avoid hmr rerender issue with recoil and atom ids.
     */
    const timestampInitial = Date.now();
    // eslint-disable-next-line functional/no-let
    let count = 0;

    return {
      uuid() {
        return `${timestampInitial}-${++count}`;
      },
    };
  })(),
};

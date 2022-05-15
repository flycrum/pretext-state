/**
 * Atom config used to generate the final atom wrapper object.
 */
export interface PretextAtomConfigI<CpDefaultValue = any> {
  initialValue: CpDefaultValue;
}

/**
 * Wrapper interface that abstracts away the underlying atom system (e.g. valtio, recoil).
 */
export interface PretextAtomI<CpValueT = any> {
  /**
   * The underlying atom reference that powers everything reactive.
   */
  atomRef: CpValueT;
  /**
   * Gets the dynamically updated value (this should always reflect the current value).
   */
  getValue(): CpValueT;
  /**
   * The initial or 'default' state value.
   */
  initialValue: CpValueT;
  /**
   * Unique id.
   */
  key: string;
  /**
   * Updates the value either by passing in the new value or passing a function that includes last value.
   * @param value
   */
  setValue(value: CpValueT | ((previousValue: CpValueT) => CpValueT)): void;
  /**
   * Static value that's not intended to be used directly because it's not directly reactive or automatically updated.
   */
  valueStatic: CpValueT;
}

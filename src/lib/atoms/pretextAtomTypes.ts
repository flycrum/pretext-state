/**
 * Atom config used to generate the final atom wrapper object.
 */
export interface PretextAtomConfigI<CpDefaultValue = any> {
  initialValue: CpDefaultValue;
}

/**
 * Wrapper interface that abstracts away the underlying atom engine (e.g. valtio, recoil).
 */
export interface PretextAtomI<CpValueT = any> {
  /**
   * The underlying atom reference that powers everything reactive.
   */
  atomRef: { value: CpValueT };
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
   * Hook that gets its reactive value.
   */
  useAtomValue: (thisScope: any) => CpValueT;
  /**
   * Static value that's not intended to be used directly because it's not directly reactive or automatically updated.
   */
  valueStatic: CpValueT;
}

/**
 * Atom config used to generate the final atom wrapper object.
 */
export interface PretextAtomComputedConfigI<CpDefaultValue = any> {
  computedFn: (refs: { state: { [key: string]: any } }) => CpDefaultValue; // todo can we better type keys?
}

/**
 * Wrapper interface that abstracts away the underlying derived/computed engine (e.g. valtio, recoil).
 */
export interface PretextAtomComputedI<CpValueT = any> {
  /**
   * The underlying atom reference that powers everything reactive.
   */
  atomRef: { value: CpValueT };
  /**
   * Gets the dynamically updated value (this should always reflect the current value).
   */
  getValue(): CpValueT;
  /**
   * Unique id.
   */
  key: string;
  /**
   * Hook that gets its reactive value.
   */
  useAtomValue: (thisScope: any) => CpValueT;
  /**
   * Static value that's not intended to be used directly because it's not directly reactive or automatically updated.
   */
  // valueStatic: CpValueT;
}

/**
 * Atom config used to generate the final atom wrapper object.
 */
export interface PretextAtomConfigI<PgpAtomInitialValue = any> {
  initialValue: PgpAtomInitialValue;
}

/**
 * Wrapper interface that abstracts away the underlying atom engine (e.g. valtio, recoil).
 */
export interface PretextAtomI<PgpAtomValue = any> {
  /**
   * The underlying atom reference that powers everything reactive.
   */
  atomRef: { value: PgpAtomValue };
  /**
   * Gets the dynamically updated value (this should always reflect the current value).
   */
  getValue(): PgpAtomValue;
  /**
   * The initial or 'default' state value.
   */
  initialValue: PgpAtomValue;
  /**
   * Unique id.
   */
  key: string;
  /**
   * Updates the value either by passing in the new value or passing a function that includes last value.
   * @param value
   */
  setValue(value: PgpAtomValue | ((previousValue: PgpAtomValue) => PgpAtomValue)): void;
  /**
   * Hook that gets its reactive value.
   */
  useAtomValue: (thisScope: any) => PgpAtomValue;
  /**
   * Static value that's not intended to be used directly because it's not directly reactive or automatically updated.
   */
  valueStatic: PgpAtomValue;
}

/**
 * Atom config used to generate the final atom wrapper object.
 */
export interface PretextAtomComputedConfigI<PgpInitialValue = any> {
  computedFn: (refs: { state: { [key: string]: any } }) => PgpInitialValue; // todo can we better type keys?
}

/**
 * Wrapper interface that abstracts away the underlying derived/computed engine (e.g. valtio, recoil).
 */
export interface PretextAtomComputedI<PgpValue = any> {
  /**
   * The underlying atom reference that powers everything reactive.
   */
  atomRef: { value: PgpValue };
  /**
   * Gets the dynamically updated value (this should always reflect the current value).
   */
  getValue(): PgpValue;
  /**
   * Unique id.
   */
  key: string;
  /**
   * Hook that gets its reactive value.
   */
  useAtomValue: (thisScope: any) => PgpValue;
  /**
   * Static value that's not intended to be used directly because it's not directly reactive or automatically updated.
   */
  // valueStatic: CpValueT;
}

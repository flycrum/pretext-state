export function getPropertyDescriptor(obj: any, prop: string): PropertyDescriptor {
  // eslint-disable-next-line functional/no-let
  let desc: any;

  // eslint-disable-next-line functional/no-loop-statement
  do {
    desc = Object.getOwnPropertyDescriptor(obj, prop);
  } while (!desc && (obj = Object.getPrototypeOf(obj)));

  return desc;
}

export function isPropGetter(object: any, prop: string) {
  const desc = getPropertyDescriptor(object, prop);

  return desc && desc.get && typeof desc.get === 'function';
}

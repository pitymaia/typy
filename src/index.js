import { Typy } from './typy.js';

const t = (input, objectPath) => new Typy().t(input, objectPath);
const Schema = Typy.Schema;

const addCustomTypes = (validators) => {
  if (t(validators).isObject) {
    Object.keys(validators).forEach((validator) => {
      if (t(validators[validator]).isFunction) {
        // eslint-disable-next-line
        Typy.prototype.__defineGetter__(validator, function() {
          return validators[validator](this.input);
        });
      } else {
        throw new Error(`validator ${validator} is not a function`);
      }
    });
  } else {
    throw new Error('validators must be key value pairs');
  }
};

export { t, Schema, addCustomTypes };

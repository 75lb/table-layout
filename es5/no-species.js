'use strict';

function markNoSpecies(constructor) {
  if (Symbol.species) {
    Object.defineProperty(constructor, Symbol.species, {
      get: function get() {
        return undefined;
      },
      configurable: true
    });
  }
  return constructor;
}

module.exports = markNoSpecies;
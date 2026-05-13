// @ulam/sawsawan — integration bridge between ube and calamansi
//
// Wires cross-package concerns that neither package can own alone:
//   - locale change → announce() the switch
//   - locale change → set html[lang]
//   - locale → dir attribute (RTL detection)
//
// Dependency direction: sawsawan imports from ube/calamansi.
// Neither imports from sawsawan or from each other.

export { initSawsawan } from './initSawsawan.js'
export { setPlatformAdapter, getAdapter, makeElectronAdapter } from './platformAdapter.js'
export { makeIdGenerator } from './makeIdGenerator.js'

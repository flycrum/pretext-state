# Design decisions

## Random, unorganized thoughts

- `createPretext`
  - the entrypoint for the pretext system
  - only allows pretext name, initial state, and initial reducers
  - using params rather than an object makes typings a bit easier
  - allowing any other configuration (e.g. computed, utils, etc) would make typings notably more difficult
  - adding any of these others should be done via chaining calls (which should update return typings for state, reducers, etc)
- computed/derived props should not be combined in state with typical get/set values
  - cause it gets confusing on a lot of different levels
  - reducers would get state with both read-only (computed) and read/write props (typical)
  - also, typings get harder with mixed types/purposes/usages
- 

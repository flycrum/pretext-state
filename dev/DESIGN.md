# Design decisions

## Random, unorganized thoughts
- chaining
  - rather than trying to nail down a single configuration of all settings and type correctly instead allow for chaining configs and re-typing along the way
  - every time a new config is added (e.g. state, reducers) then the entire pretext object is returned and retyped via generic params
  - because of ^ it's easier to split reducer typings into config and final types so mixed intents and gaps are avoided (should be easier to maintain, as well)
  - chaining could be pretty awesome (assuming typings work out) as configs that need to reference others can be ordered to play nicer and be auto-typed correctly
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

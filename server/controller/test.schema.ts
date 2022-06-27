import {createSchema} from "../../src";

export default {
  show: createSchema({
    name: {
      type: 'string',
      empty: false,
      max: 255,
    },
  }),
}
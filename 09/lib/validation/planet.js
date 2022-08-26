const { Type } = require('@sinclair/typebox');
module.exports = planetSchema = Type.Object(
  {
    name: Type.String(),
    description: Type.Optional(Type.String()),
    diameter: Type.Integer(),
    moons: Type.Integer(),
  },
  { additionalProperties: false }
);
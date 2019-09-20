module.exports = /* GraphQL */ `
  input IDFilter {
    eq: ID
    ne: ID
    in: [ID]
    notIn: [ID]
  }

  input IntFilter {
    eq: Int
    ne: Int
    gt: Int
    gte: Int
    lt: Int
    lte: Int
    between: [Int]
    notBetween: [Int]
    in: [Int]
    notIn: [Int]
  }

  input FloatFilter {
    eq: Float
    ne: Float
    gt: Float
    gte: Float
    lt: Float
    lte: Float
    between: [Float]
    notBetween: [Float]
    in: [Float]
    notIn: [Float]
  }

  input StringFilter {
    eq: String
    ne: String
    like: String
    iLike: String
    notLike: String
    notILike: String
    substring: String
    startsWith: String
    endsWith: String
    in: [String]
    notIn: [String]
  }

  input BooleanFilter {
    eq: Boolean
  }

  input DateTimeFilter {
    eq: DateTime
    ne: DateTime
    gt: DateTime
    gte: DateTime
    lt: DateTime
    lte: DateTime
    between: [DateTime]
    notBetween: [DateTime]
    in: [DateTime]
    notIn: [DateTime]
  }
`;

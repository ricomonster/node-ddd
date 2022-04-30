import { Transaction } from 'objection';

export type WhereField = string | number | boolean | Date;
export type OrderField = string[]

export interface FindOptions {
  where?: FindAllWhereOptions,
  attributes?: string[],
  order?: OrderField[],
  include?: string,
}

export interface WhereOptionsOperands {
  // '>'?: string | number | boolean | Date,
  'in'?: WhereField,
  'iLike'?: WhereField,
  'like'?: WhereField,
  '>'?: WhereField,
  '>='?: WhereField,
  '<'?: WhereField,
  '<='?: WhereField,
  [key: string]: WhereField
}

export interface FindAllWhereOptions {
  [key: string]: WhereField | WhereOptionsOperands
}

export interface FindAllOptions extends FindOptions {
  page?: number,
  limit?: number
}

export interface FindAllResults<Attributes> {
  results: Attributes[] | [],
  total: number
}

export interface Repository<Attributes> {
  /**
   * Create a new row in the table
   *
   * @param {Attributes} attributes
   * @param {Transaction} transaction
   * @returns {Promise<Attributes>}
   */
  create(attributes: Attributes, transaction?: Transaction): Promise<Attributes>,

  /**
   * Performs update if the given data already exists in the data else it will create it.
   *
   * @param {Attributes} attributes
   * @param {Transaction} transaction
   * @returns {Promise<Attributes>}
   */
  upsert(attributes: Attributes, transaction?: Transaction): Promise<Attributes>,

  /**
   * Finds a row based on the given options.
   *
   * @param {FindOptions} options
   * @param {Transaction} transaction
   * @returns {Promise<Attributes | undefined}
   */
  findOne(options?: FindOptions, transaction?: Transaction): Promise<Attributes | undefined>,

  /**
   * Finds a row by its ID
   *
   * @param {number} id
   * @param {string} include
   * @param {Transaction} transaction
   * @returns {Promise<Model | null>}
   */
  findById(id: number, include?: string, transaction?: Transaction): Promise<Attributes | undefined>,

  /**
   * Find a record by using a specific field/attribute
   *
   * @param {string} string
   * @param {string | number} value
   * @param {Transaction} transaction
   * @returns {Promise<Attributes | null>}
   */
  findByField(
    field: string,
    value: string | number,
    include?: string,
    transaction?: Transaction
  ): Promise<Attributes | null>,

  /**
   * Performs search through out the table based on the given parameters.
   *
   * @param {FindAllOptions} options
   * @param {Transaction} transaction
   * @returns {Promise<Attributes[] | null}
   */
  findAll(options?: FindAllOptions, transaction?: Transaction): Promise<FindAllResults<Attributes>>,

  /**
   * Updates a row in the users table.
   *
   * @param {number} id
   * @param {Attributes} identifier
   * @param {Transaction} transaction
   * @returns {Promise<Attributes>}
   */
  update(id: number, attributes: Attributes, transaction?: Transaction): Promise<Attributes>,
}

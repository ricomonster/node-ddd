import { Model as ObjectionModel, Transaction, ColumnRef, OrderByDirection, QueryBuilderType } from 'objection';

import { ModelClass } from '../domain/Model';
import {
  FindOptions,
  FindAllOptions,
  FindAllResults,
  Repository,
  WhereField,
  WhereOptionsOperands,
} from '../domain/Repository';

// Utils
import { isObject } from '../../libraries/utils/objects';

abstract class BaseRepository<Model extends ObjectionModel, Attributes> implements Repository<Attributes>{
  protected model;
  protected limit = 20;

  constructor(model: ModelClass<Model>) {
    this.model = model;
  }

  /**
   * Create a new row in the table
   *
   * @param {Attributes} attributes
   * @param {Transaction} transaction
   * @returns {Promise<Attributes>}
   */
  public async create(attributes: Attributes, transaction?: Transaction): Promise<Attributes> {
    const result = await this.model.query(transaction)
      .insert(attributes)
      .returning('*')
      .first()
      .castTo<Attributes>();

    return result;
  }

  /**
   * Performs update if the given data already exists in the data else it will create it.
   *
   * @param {Attributes} attributes
   * @param {Transaction} transaction
   * @returns {Promise<unknown>}
   */
  public async upsert(attributes: Attributes, transaction?: Transaction): Promise<Attributes> {
    const result = await this.model.query(transaction)
      .insert(attributes)
      .onConflict(this.model.onConflictColumn)
      .merge()
      .returning('*')
      .castTo<Attributes>();

    return result;
  }

  /**
   * Finds a row based on the given options.
   *
   * @param {FindOptions} options
   * @param {Transaction} transaction
   * @returns {Promise<Attributes | undefined}
   */
  public async findOne(options?: FindOptions, transaction?: Transaction): Promise<Attributes | undefined> {
    const result = await this.model.query(transaction)
      .modify((queryBuilder) => this.findAllQueryBuilder(queryBuilder, options))
      .limit(1)
      .castTo<Attributes[]>();

    return result[0];
  }

  /**
   * Finds a row by its ID
   *
   * @param {number} id
   * @param {string} include
   * @param {Transaction} transaction
   * @returns {Promise<Model | null>}
   */
  public async findById(
    id: number,
    include?: string,
    transaction?: Transaction
  ): Promise<Attributes | undefined> {
    const result = await this.model.query(transaction)
      .findById(id)
      .withGraphFetched(this.parseIncludeString(include))
      .castTo<Attributes>();

    return result;
  }

  /**
   * Find a record by using a specific field/attribute
   *
   * @param {string} string
   * @param {string | Number} value
   * @param {Transaction} transaction
   * @returns {Promise<Model | null>}
   */
  public async findByField(
    field: string,
    value: string | number,
    include?: string,
    transaction?: Transaction
  ): Promise<Attributes | null> {
    const result = await this.model.query(transaction)
      .findOne(field, value)
      .withGraphFetched(this.parseIncludeString(include))
      .castTo<Attributes>();

    return result;
  }

  /**
   * Performs search through out the table based on the given parameters.
   *
   * @param {FindAllOptions} options
   * @param {Transaction} transaction
   * @returns {Promise<Attributes[] | null}
   */
  public async findAll(options?: FindAllOptions, transaction?: Transaction): Promise<FindAllResults<Attributes>> {
    const page = options?.page - 1 || 0;
    const limit = options?.limit || this.limit;

    const results = await this.model.query(transaction)
      .modify((queryBuilder) => this.findAllQueryBuilder(queryBuilder, options))
      .page(page, limit)
      .castTo<FindAllResults<Attributes>>();

    return results;
  }

  /**
   * Updates a row in the users table.
   *
   * @param {Attributes} attributes
   * @param {Attributes} identifier
   * @returns {Promise<Attributes>}
   */
  public async update(id: number, attributes: Attributes, transaction?: Transaction): Promise<Attributes> {
    const result = await this.model.query(transaction)
      .patchAndFetchById(id, attributes)
      .castTo<Attributes>();

    return result;
  }

  /**
   * Custom query builder especially for "WHERE" and "ORDER" statements. Also handles model relations.
   *
   * @param {QueryBuilderType<Model>} queryBuilder
   * @param {FindAllOptions} options
   * @returns {QueryBuilderType<Model>}
   */
  public async findAllQueryBuilder(
    queryBuilder: QueryBuilderType<Model>,
    options?: FindAllOptions,
  ): Promise<QueryBuilderType<Model>> {
    // Where options given
    if (options && options.where && Object.keys(options.where).length > 0) {
      Object.keys(options.where).forEach(async (field: ColumnRef) => {
        const value = options.where[field as string];

        // Is the value an object?
        if (isObject(value)) {
          const whereOptionObject = value as WhereOptionsOperands;

          Object.keys(whereOptionObject).forEach(async (expression: string) => {
            const objectValue = whereOptionObject[expression];

            switch (expression) {
              case 'in':
                await queryBuilder.where(field, 'in', objectValue.toString().split(','));
                break;

              case 'iLike':
              case 'like':
                await queryBuilder.where(field, expression, `%${objectValue as string}%`);
                break;

              case '>':
              case '<':
              case '>=':
              case '<=':
                await queryBuilder.where(field, expression, objectValue);
                break;

              case '=':
              default:
                await queryBuilder.where(field, objectValue);
                break;
            }
          });
        } else if (value.toString().indexOf(',') > -1) {
          // Use whereIn
          await queryBuilder.whereIn(field, value.toString().split(','));
        } else {
          // Default field = value
          await queryBuilder.where(field, value as WhereField);
        }
      });
    }

    // Order options
    if (options && options.order && options.order.length > 0) {
      options.order.forEach(async (order) => {
        const [field, direction] = order as string[];

        if (field && direction) {
          await queryBuilder.orderBy(field, direction as OrderByDirection);
        }
      });
    }

    if (options && options.include) {
      await queryBuilder.withGraphFetched(this.parseIncludeString(options.include));
    }

    return queryBuilder;
  }

  /**
   * Check if the includes are wrapped properly.
   *
   * @param {string} include
   * @returns {string}
   */
  private parseIncludeString(include?: string): string {
    if (!include) {
      return include;
    }

    // Check if the include first character has a bracket
    if (include.charAt(0) === '[') {
      // We'll assume that its wrapped in brackets
      return include;
    }

    // Wrap it in brackets
    return `[${include}]`;
  }
}

export { BaseRepository };

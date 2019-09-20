const { Op } = require('sequelize');

class BaseRepository {
  constructor(model, domain) {
    this.model = model;
    this.domain = domain;
  }

  async create(entity) {
    let entityInstance = entity;

    // is the entity an instance of the domain?
    if (!(entity instanceof this.domain)) {
      // be it's instance
      entityInstance = new this.domain(entity);
    }

    // let's create the record
    try {
      const newEntity = await this.model.create(entityInstance.toJSON());

      // once it's created, return it
      return newEntity;
    } catch (error) {
      throw new Error(error);
    }
  }

  async find(field, value) {
    return this.findByField(field, value);
  }

  async findById(id) {
    return this.findByField('id', id);
  }

  async search(args, active = true) {
    // where clause
    const where = {};

    if (active) {
      where.active = {
        [Op.eq]: 1,
      };
    }

    if (args.filter) {
      // loop
      Object.keys(args.filter).forEach(field => {
        // set the where clause
        where[field] = {};

        // get conditions
        const conditions = args.filter[field];

        Object.keys(conditions).forEach(operation => {
          where[field] = { [Op[operation]]: conditions[operation] };
        });
      });
    }

    const result = await this.model.findAndCountAll({ where });

    // return
    return {
      results: result.rows,
      total: result.count,
    };
  }

  async update(data) {}

  async delete() {}

  findByField(field, value, active = true) {
    // set the where clause
    const where = { [field]: value };

    if (active) {
      where.active = {
        [Op.eq]: 1,
      };
    }

    // perform search
    return this.model.findOne({ where }, { rejectOnEmpty: true });
  }
}

module.exports = BaseRepository;

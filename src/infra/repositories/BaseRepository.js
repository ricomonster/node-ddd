class BaseRepository {
  constructor(model, domain) {
    this.model = model;
    this.domain = domain;
  }

  async create(entity) {
    console.log('create', entity);
  }

  async find(field, value) {}

  async findById(id) {}

  async update(data) {}

  async delete() {}
}

module.exports = BaseRepository;

const db = require('../data/dbConfig.js');

module.exports = {
    get
};



  function get(query) {

    console.log(query.name)
    const knexQuery = db('accounts');

    if(query.name) {
      knexQuery.where('name', 'like', `%${query.name}%`);
    }

    if(query.limit) {
        knexQuery.limit(query.limit);
    }

    if(query.sortBy) {
        knexQuery.orderBy(query.sortBy, 'desc');
    }

    return knexQuery;
  }


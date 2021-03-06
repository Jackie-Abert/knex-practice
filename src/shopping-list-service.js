const ShoppingListService = {
    getAllItems(db) {
        return db
            .select('*')
            .from('shopping_list')
    },
    insertItem(db, data) {
        return db
            .insert(data)
            .into('shopping_list')
            .returning('*')
            .then(rows => rows[0])
    },
    getById(db, id) {
        return db
         .from('shopping_list')
         .select('*')
         .where('id', id)
         .first();
      },
      deleteItem(db, id) {
        return db('shopping_list')
          .where({ id })
          .delete();
      },
      updateItem(db, id, newItemFields) {
        return db('shopping_list')
          .where({ id })
          .update(newItemFields);
      }
}

module.exports = ShoppingListService
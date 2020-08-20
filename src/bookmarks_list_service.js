const BookmarksListService = {
    getAllItems(db) {
        return db
            .select('*')
            .from('bookmarks_list')
    },
    insertItem(db, data) {
        return db
            .insert(data)
            .into('bookmarks_list')
            .returning('*')
            .then(rows => rows[0])
    },
    getById(db, id) {
        return db
         .from('bookmarks_list')
         .select('*')
         .where('id', id)
         .first();
      },
      deleteItem(db, id) {
        return db('bookmarks_list')
          .where({ id })
          .delete();
      },
      updateItem(db, id, newItemFields) {
        return db('bookmarks_list')
          .where({ id })
          .update(newItemFields);
      }
}

module.exports = BookmarksListService
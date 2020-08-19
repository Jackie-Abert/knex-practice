const ArticlesService = {
    getAllItems(db) {
        return db
            .select('*')
            .from('shopping_list')
    },
    insertItem(db, newItem) {
        return db
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => rows[0])
    }
}

module.exports = ArticlesService
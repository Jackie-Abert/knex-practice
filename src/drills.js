const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: 'postgresql://dunder-mifflin@localhost/knex-practice',
});

knexInstance('shopping-list')
    .select('*')



function searchByListItem(searchTerm) {
knexInstance.from('shopping-list')
    .select('name')
    .where( 'name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
        console.log(result)
    })
}

searchByListItem('cans')

function paginatedShoppingList(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance.from('shopping-list')
        .select('*')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
          })
}
paginatedShoppingList(3)

function addedAfterDate(daysAgo) {
    knexInstance.from('shopping-list')
        .select('name', 'price', 'checked', 'date_added', 'catagory')
        .count('date_added AS date')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .groupBy('name')
        .orderBy([
            {column:'date', order:'ASC'}
        ])
        .then(result => {
            console.log(result)
          })

}

addedAfterDate(5)

// function totalCostPerCatagory() {
//     knexInstance.from('shopping-list')
//         .select('*')

// }
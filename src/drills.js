require("dotenv").config();
const knex = require("knex");
const knexInstance = knex({
	client: "pg",
	connection: process.env.DB_URL,
});
knexInstance('shopping_list')
  .select('*');
function findListItem(searchTerm) {
  knexInstance
    .select('name')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}
findListItem("burger");
function paginateProducts(pageNumber) {
	const offset = 6 * (pageNumber - 1);
	knexInstance
		.select("*")
		.from("shopping_list")
		.limit("6")
		.offset(offset)
		.then((result) => {
			console.log(result);
		});
}
paginateProducts(3);
function daysViewed(daysAgo) {
<<<<<<< HEAD
  knexInstance
    .select('name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where('date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result);
    });
}
daysViewed(5);
function groupByPrice() {
  knexInstance
    .select('category')
    .from('shopping_list')
    .sum('price')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });
=======
	knexInstance
		.select("name", "price", "date_added", "checked", "category")
		.from("shopping_list")
		.where(
			"date_added",
			">",
			knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
		)
		.then((result) => {
			console.log(result);
		});
}
daysViewed(5);
function groupByPrice() {
	knexInstance
		.select("category")
		.from("shopping_list")
		.sum("price")
		.groupBy("category")
		.then((result) => {
			console.log(result);
		});
>>>>>>> 6d2ff3a1aab09353837e42732fa88d62fbe65811
}
groupByPrice();

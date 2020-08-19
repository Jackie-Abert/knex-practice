/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const knex = require("knex");
const ArticlesService = require("../src/shopping-list-service");
const { expect } = require("chai");

describe("Article service Object", function () {
  let db;
  let testItems = [
    {
      id: 1,
      name: "test item 1",
      price: "13.00",
      date_added: new Date("2100-05-22T16:28:32.615Z"),
      category: "Breakfast",
      checked: false,
    },
    {
      id: 2,
      name: "test item 2",
      price: "5.00",
      date_added: new Date("2100-05-22T16:28:32.615Z"),
      category: "Lunch",
      checked: true,
    },
    {
      id: 3,
      name: "test item 3",
      price: "23.00",
      date_added: new Date("2100-05-22T16:28:32.615Z"),
      category: "Snack",
      checked: false,
    },
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });
  before(() => db("shopping_list").truncate());

  before(() => {
    return db.into("shopping_list").insert(testItems);
  });

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  it("should run the tests", () => {
    expect(true).to.eql(true);
  });

  describe("Get All Items()", () => {
    it("should return all the shopping list items", () => {
      return ArticlesService.getAllItems(db).then((actual) => {
        expect(actual).to.eql(testItems);
      });
    });
  });

  it(`insertItem() inserts new item and resolves item with id`, () => {
    const newItem = {
      id: 4,
      name: "test new item",
      price: "100.00",
      date_added: new Date("2020-01-01T00:00:00.000Z"),
      category: "Breakfast",
      checked: false,
    };
    return ArticlesService.insertItem(db, newItem).then((actual) => {
      expect(actual).to.eql({
        id: 4,
        name: newItem.name,
        price: newItem.price,
        date_added: newItem.date_added,
        category: newItem.category,
        checked: newItem.checked,
      });
    });
  });
});

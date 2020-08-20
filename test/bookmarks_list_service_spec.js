/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const knex = require("knex");
const BookmarksListService = require("../src/bookmarks_list_service");
const { expect } = require("chai");


describe(`Bookmarks List Service object`, function () {
  let db;
  let testItems = [
    {
      id: 1,
      title: 'Test title 1',
      url: 'https://www.youtube.com/',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      rating: 4
    },
    {
      id: 2,
      title: 'Test title 2',
      url: 'https://www.adobe.com/',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      rating: 2
    },
    {
      id: 3,
      title: 'Test title 3',
      url: 'https://www.hackerrank.com/',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      rating: 4
    },
    {
      id: 4,
      title: 'Test title 4',
      url: 'https://www.hackerrank.com/',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      rating: 3
    },
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('bookmarks_list').truncate());

  afterEach(() => db('bookmarks_list').truncate());

  after(() => db.destroy());

  context(`Given 'bookmarks_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('bookmarks_list')
        .insert(testItems);
    });

    it(`getAllItems() resolves all items from 'bookmarks_list' table`, () => {
      const expectedItems = testItems.map(item => ({
        ...item,
      }));
      return BookmarksListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(expectedItems);
        });
    });

    it(`getById() resolves an item by id from 'bookmarks_list' table`, () => {
      const idToGet = 3;
      const newItem = testItems[idToGet - 1];
      return BookmarksListService.getById(db, idToGet)
        .then(actual => {
          expect(actual).to.eql({
            id:idToGet,
            title: newItem.title,
            url: newItem.url,
            description: newItem.description,
            rating: newItem.rating
          });
        });
    });

    it(`deleteItem() removes an item by id from 'bookmarks_list' table`, () => {
      const idToDelete = 3;
      return BookmarksListService.deleteItem(db, idToDelete)
        .then(() => BookmarksListService.getAllItems(db))
        .then(allItems => {
          const expected = testItems
            .filter(item => item.id !== idToDelete)
            .map(item => ({
              ...item,
            }));
          expect(allItems).to.eql(expected);
        });
    });

    it(`updateItem() updates an item in the 'bookmarks_list' table`, () => {
      const idOfItemToUpdate = 3;
      const newItemData = {
        title: 'Test title 5',
        url: 'https://www.hackerrank.com/',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rating: 1
      };
      const originalItem = testItems[idOfItemToUpdate - 1];
      return BookmarksListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => BookmarksListService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            ...originalItem,
            ...newItemData,
            ...idOfItemToUpdate
          });
        });
    });
  });

  context(`Given 'bookmarks_list' has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return BookmarksListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });

    it(`insertItem() inserts an item and resolves it with an 'id'`, () => {
      const newItem = {
        id:1,
        title: 'Test title 5',
        url: 'https://www.hackerrank.com/',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rating: 1,
      };
      return BookmarksListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id:1,
            title: newItem.title,
            url: newItem.url,
            description: newItem.description,
            rating: newItem.rating,
          });
        });
    });
  });
});
const { findAccountById } = require("./accounts")

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {

  ans = [[],[]]

  books.map(book => {
    if(book.borrows[0].returned){
      ans[1].push(book)
    }else{
      ans[0].push(book)
    }
  })

  return ans

}

function getBorrowersForBook(book, accounts) {

  const borrowers = [] 
  const borrows = book.borrows

  let i = 0
  const limit = borrows.length < 10 ? borrows.length : 10

  while(i<limit){
    let entry = borrows[i]
    let account = findAccountById(accounts, entry.id)
    borrowers.push({...entry, ...account})
    i++
  }

  return borrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

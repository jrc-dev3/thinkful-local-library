function findAccountById(accounts, id) {
  return accounts.find( acc => acc.id === id )
}

function sortAccountsByLastName(accounts) {
  return accounts.sort( (acc1,acc2) => acc1.name.last > acc2.name.last ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {

  const id = account.id
  let count = 0

  for(book of books){
    const borrowed = book.borrows
    count += borrowed.filter(book => book.id === id).length
  }

  return count
}

function getBooksPossessedByAccount(account, books, authors) {

  const id = account.id
  let booksPoss = []

  for(book in books){
    const curr = books[book]
    const borrows = curr.borrows
    const owned = borrows.filter(borrow => {
      return borrow.id === id && !borrow.returned
    })

    if(owned.length > 0) {
      let author = authors.find(author => author.id === curr.authorId)
      booksPoss = [...booksPoss, {...curr, borrows: owned, author}]
    }    
  }

 
  return booksPoss


}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

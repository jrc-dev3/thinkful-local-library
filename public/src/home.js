function getTotalBooksCount(books) {

  return books.reduce((total, _) => total + 1,0)
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.filter(book => !book.borrows[0].returned).length

}

function getMostCommonGenres(books) {
  const count = {}

  books.forEach(book => {
    if(Object.keys(count).includes(book.genre)){
      count[book.genre].count += 1
    }else{
      count[book.genre] = {
        name: book.genre,
        count: 1
      }
    }
  })

  const sorted = Object.values(count).sort((obj1,obj2) => obj1.count > obj2.count ? -1 : 1).splice(0,5)

  return sorted

}

function getMostPopularBooks(books) {

  const count = {}

  books.forEach(book => {
    count[book.title] = {
      name: book.title,
      count: book.borrows.length
    }
  })

  const sorted = Object.values(count).sort((obj1,obj2) => obj1.count > obj2.count ? -1 : 1).splice(0,5)

  return sorted

}

function getMostPopularAuthors(books, authors) {
  const count = {}

  authors.forEach(author => {

    const name = `${author.name.first} ${author.name.last}`

    count[name] = {
      name,
      count: books.filter(book => book.authorId === author.id).reduce((total, curr) => total + curr.borrows.length, 0)
    }
  })

  return Object.values(count).sort((obj1, obj2) => obj1.count > obj2.count ? -1 : 1).splice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

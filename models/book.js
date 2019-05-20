import HTTP from '../utils/http.js'

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: '/book/hot_list'
    })
  }
}

export default BookModel
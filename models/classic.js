import HTTP from '../utils/http.js'

class ClassicModel extends HTTP {
  getClassicLatest() {
    return this.request({
      url: '/classic/latest'
    })
  }
}

export default ClassicModel
import HTTP from '../utils/http.js'

class LikeModel extends HTTP {
  like(behavior, id, category) {
    const url = behavior === 'like' ? '/like' : '/like/cancel'
    return this.request({
      url,
      data: {
        art_id: id,
        type: category
      },
      method: 'POST'
    })
  }
}

export default LikeModel
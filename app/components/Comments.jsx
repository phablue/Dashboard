import React from 'react'
import _ from 'lodash'

class Comments extends React.Component {
  createCommentListItem(comment) {
    return <li className='unorder-list client-comment'>{comment}</li>
  }

  commentList() {
    if(this.props.comments) {
      return _.map(this.props.comments, this.createCommentListItem.bind(this))
    }
    else {
      return <li className='unorder-list client-comment'>Loading ...</li>
    }
  }

  render() {
    return (
      <div className='columns col-6 comments'>
        <div className='group'>
          <h2 className='sub-title'>Comments From Clients</h2>
          <ul className='client-comments'>
            {this.commentList()}
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = Comments

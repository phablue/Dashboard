import React from 'react'
import _ from 'lodash'

class Comments extends React.Component {
  componentDidMount() {
    this.scroll()
  }

  scroll() {
    setInterval(this.commentsSlideUp.bind(this), 2500);
  }

  commentsSlideUp() {
    if(this.props.comments) {
      if(this.props.comments.length === this.refs.comments.children.length) {
        var firstComment = this.refs.comments.firstElementChild;
        this.refs.comments.appendChild(firstComment);
      }
    }
  }

  createCommentListItem(comment) {
    return (
      <li className='unorder-list client-comment'>{comment}</li>
    )
  }

  commentList() {
    if(this.props.comments) {
      return _.map(this.props.comments, this.createCommentListItem.bind(this))
    }
    else {
      return <h3 className='loading'>Loading ...</h3>
    }
  }

  render() {
    return (
      <div className='columns col-12 comments'>
        <div className='group'>
          <h2 className='sub-title'>Clients Comments</h2>
          <ul className='client-comments' ref='comments'>
            {this.commentList()}
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = Comments

import React from 'react'

class Comments extends React.Component {
  render() {
    return (
      <div className='columns col-6 comments'>
        <div className='group'>
          <h2 className='sub-title'>Comments From Clients</h2>
          <ul className='client-comments'>
            <li className='unorder-list client-comment'>Client Comment</li>
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = Comments

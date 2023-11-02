

import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function LastSeen({ date }) {
  return (
    <div className='time-ago'>
      <ReactTimeAgo date={date} locale="en-US"/>
    </div>
  )
}
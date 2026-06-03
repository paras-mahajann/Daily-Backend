import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../Components/Player'
import useSong from '../hooks/useSong'

const Home = () => {
  const { song } = useSong()

  return (
    <div className="home-page" style={{ display: 'grid', gap: '40px', justifyItems: 'center', padding: '40px 20px' }}>
      <FaceExpression />
      <Player audioSrc={song?.url} />
    </div>
  )
}

export default Home

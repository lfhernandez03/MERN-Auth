import React from 'react'

interface HomeProps {
  user?: unknown;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div>Home</div>
  )
}

export default Home
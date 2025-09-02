import React from 'react'
import TableComponent from '../components/Reusable/Table'

function Projects() {
  return (
    <div className='min-h-screen'>
      <div className='mx-auto w-3/4 mt-20'>
        <h3 className='ms-auto text-2xl font-bold m-5'>PROJECTS TABLE</h3>

        <TableComponent />
      </div>
    </div>
  )
}

export default Projects
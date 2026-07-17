

import DashboardContent from '@/components/DashboardContent';
import { getSession } from '@/lib/auth/server';
import React from 'react'

const page =async () => {

  const session = await getSession();
  return (
    <DashboardContent  
    userId={`123`}/>
  )
}

export default page  
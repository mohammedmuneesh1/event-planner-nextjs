

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const DashboardContent = ({userId}:{userId:string}) => {



  return (
    <div className="flex flex-1 flex-col gap-6">
        <div
         className="flex flex-wrap items-center justify-between gap-3 ">
            <div>
            <h1 className="flex">You Events</h1>
            <p>Track attende responses and manage invitge links </p>
            </div>

        <Button asChild>

            <Link href={"/events/new"}>
                Create Event
            </Link>
        </Button>

        </div>


        {/*LIST OF EVENTS */}

        




    </div>
  )
}

export default DashboardContent
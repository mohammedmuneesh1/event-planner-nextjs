"use server"

import { redirect } from "next/navigation";
import { getSession } from "../auth/server";
import { prisma } from "../prisma";





type CreateEventState = {
  error?: string | null;
  success?: boolean | null; 
};

function parseCreateEvent (formData:FormData) {
    
    const title  = String(formData.get("title") ?? "").trim();
    if(title.length < 3 || title.length > 120){
        throw new Error("Title must be at least 3 and 120 characters long.");
    } 
    const description = String(formData.get("description") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const date = String(formData.get("eventDate") ?? "").trim();
    return {
        title,
        description: description.length > 0 ? description : null,
        location: location.length > 0 ? location : null,
        date: date.length > 0 ? new Date(date) : null
    }
}

export async function createEventAction(
  prevState: CreateEventState | null,
  formData: FormData
): Promise<CreateEventState> {
  let created;

  try {
    const session = await getSession();
    const input = parseCreateEvent(formData);

    created = await prisma.event.create({
      data: {
        ownerUserId: session!.data!.user!.id,
        title: input.title,
        description: input.description,
        location: input.location,
        eventDate: input.date,
      },
    });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
     return { error: "Failed to create the event.", success: false };
  }

  redirect(`/events/${created.id}`);
 
}







export const createInviteLinkAction = async (eventId:string) => {
  const session = await getSession();
  const userId  = session?.data?.user?.id;

  
  const owns = await prisma.event.findFirst({
      where:{id:eventId,ownerUserId:userId},
      select:{id:true},
      });
 
  if(!owns){
      throw new Error("Event not found");
  }
  const token = crypto.randomUUID().replace(/-/g, ""); //remove - hypen with empty string afasdfasdfasdf

  await prisma.eventInvite.upsert({    // upsert -> insert or update if already exist then update
    where:{eventId},
    create:{eventId,token},
    update:{token}   //regenerate the link for some reason if leaked to many people accidently. then update the url 
  });




}





const parseRsvp =(formData:FormData)=>{
    const name = String(formData.get("name") ?? "").trim();
    if(name.length < 3 || name.length > 120){
        throw new Error("Name must be at least 3 and 120 characters long.");
    }
    const email = String(formData.get("email") ?? "").trim();
    if(email.length < 3 || email.length > 120){
        throw new Error("Email must be at least 3 and 120 characters long.");
    }
    const status = String(formData.get("attendance") ?? "").trim();
    if(!['going','maybe','not_going'].includes(status)){
        throw new Error("Status must be at least 3 and 120 characters long.");
    }
    return {
        name,
        email,
        emailNormalized:email.toLowerCase(),
        status
    }
}




export const submitRsvp = async (token:string,formData:FormData)=>{
 const session = await getSession();
 const userId = session?.data?.user?.id;
 const data = parseRsvp(formData);

 console.log('data',data);

 const invite = await prisma.eventInvite.findFirst({
    where:{token},
    select:{
        id:true,
        event:{
            select:{id:true}
        }
    }
 });

 if(!invite){
    throw new Error("invalid link found. Please request for new link. ");
 }

 const eventId = invite.event.id;
 
 await prisma.eventRsvp.upsert({
where: {
  eventId_emailNormalized: {
    eventId,
    emailNormalized: data.emailNormalized,
  },
},
create:{
    eventId,
    name:data?.name,
    email:data.email,
    emailNormalized:data.emailNormalized,
    status:data.status as ("going" | "maybe" | "not_going"),
},
update:{
    name:data?.name,
    status:data?.status as ("going" | "maybe" | "not_going"),
    respondedAt: new Date(),
}
 })










 
 
 

}
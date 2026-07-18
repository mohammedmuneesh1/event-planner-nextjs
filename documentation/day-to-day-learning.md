

ORM

ORM IS A WAY TO EASILY COMMUNICATE WITH SQL TABLE WITHOUT LERANING SQL 




prisma 

pm run db:init

STEP-1) npm install prisma @prisma/client
STEP-2) npx prisma init



env setup with its url 


3) npx prisma init


NEON AUTH 

npm install @neondatabase/auth@latest
set --> src folder --> lib -> auth -> two files client and server.ts 
@import "@neondatabase/auth/ui/tailwind";





db creation four models 

model Event { 
  id String @id @default(uuid()) @db.uuid
  ownerUserId String @map("owner_user_id)
  title String
  description String?
  location String? 
  eventDate DateTime? @map("event_date) @db.Timestamptz(6)
  createdAt DateTime @default(now()) @map("created_at) @db.Timestamptz(6)
  updatedAt DateTime @default(now()) @updatedAt @map("updated_at) @db.Timestamptz(6)
}




id String @id

Means

@id -- > This is the Primary Key.


| Part               | Meaning                       |
| ------------------ | ----------------------------- |
| `id`               | Column name in Prisma         |
| `String`           | Type in TypeScript            |
| `@id`              | Primary key                   |
| `@default(uuid())` | Auto-generate a UUID          |
| `@db.Uuid`         | Store it as PostgreSQL `UUID` |



| Syntax               | Meaning                                                        |
| -------------------- | -------------------------------------------------------------- |
| `model`              | Creates a database table                                       |
| `String`             | Text column                                                    |
| `Int`                | Integer column                                                 |
| `Boolean`            | True/False column                                              |
| `DateTime`           | Date & time column                                             |
| `?`                  | Optional (nullable) field                                      |
| `@id`                | Primary key                                                    |
| `@default(...)`      | Automatically assign a default value                           |
| `uuid()`             | Generate a unique ID                                           |
| `now()`              | Use the current date/time                                      |
| `@updatedAt`         | Automatically update the timestamp whenever the record changes |
| `@map("...")`        | Use a different column name in the database                    |
| `@db.Uuid`           | Store as PostgreSQL `UUID`                                     |
| `@db.Timestamptz(6)` | Store as PostgreSQL `TIMESTAMP WITH TIME ZONE`                 |



@@map("events")   --- > This changes the table name.


invite EventInvite?
 does not store anything in the events table. It's just a Prisma relation field that lets Prisma know these two models are connected.


 "An Event can have one EventInvite."

 const event = await prisma.event.findUnique({
  where: { id },
  include: {
    invite: true,
  },
});



For example, suppose your database has:

events
id	title
E1	Birthday

event_invites
id	event_id	token
I1	E1	abc123

Now if you run

include: {
  invite: true
}

Prisma returns

{
  id: "E1",
  title: "Birthday",
  invite: {
    id: "I1",
    token: "abc123"
  }
}

If there is no invite:

events
id	title
E2	Meeting


  event Event @relation(
    fields: [eventId],
    references: [id],
    onDelete: Cascade
  )




  eventId String @unique

Only one EventInvite can exist for each Event.


  @unique[eventId,emailNormalized]   ---> here it prevent duplication of creating document( a user can have single event status(ongoing,accepted,rejected))





//---------
  after writing table query on the schem.prisma, then we need to migrate this table to neon db

---> npx prisma migrate dev --name init  

1. Change your database design in schema.prisma

Example: You already have:

model Event {
  id        String @id @default(uuid()) @db.Uuid
  title     String
}

Now you want to add a new column:

model Event {
  id          String @id @default(uuid()) @db.Uuid
  title       String
  description String?
}


----> npx prisma migrate reset (Reset database)

--->npx prisma migrate dev --name add-event-description

----> to create Prisma client file ---> npx prisma generate

npm install @prisma/adapter-pg



//==================== GIT COMMAND

git restore --staged package-lock.json    ===> to remove staged file 

git rm --cached package-lock.json  ===> remove the file from git  tracking 






//==================== shadcn



npx shadcn@latest init
choose radix


px shadcn@latest add card input label textarea table badge form



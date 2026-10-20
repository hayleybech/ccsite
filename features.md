I'll start by going by module, because that makes sense to my brain and echoes the app structure.

# (Workspace) Dashboard
## My Attendance widget
- My attendance over the last 8 rehearsals, link to view all
- My RSVPs for the next 8 performances, link to view all
- Quality rating for both

## Upcoming Events widget
- Next few events
- Edit your RSVP from the widget
- Map + directions if an event is happening today
- Leaders can jump straight to Record Attendance for an event that is happening today
- Link to view all
- Leaders can filter which events show here (e.g. to hide Rehearsals and focus on the special stuff, which is the default)

## Songs to Learn widget
- All songs marked as "Learning" status
- Link to view all songs

## Other widgets
- Birthdays this month
- Memberversaries this month (Years of membership to the organisation)
- Active polls (hidden when no polls are open).

# Central Dashboard
## My choirs widget
- List of all of your organisations
- Option to set a default organisation and go to that dashboard on login, skipping Central dashboard.
- Click a choir to switch workspace.

## Other widgets
- Upcoming Events widget: Same as the workspaced version, but not filtered to an organisation
- Songs to Learn widget: Same as the workspaced version, but not filtered to an organisation
- Tenant Stats: Super-Admin (me) only, shows active tenants, number on trial, trial-to-plan conversion rate, median retention time, total active singers across active organisations.

# Main navigation
## Choir Switcher
- Click your choir's logo in the main nav to see a list of all your choirs/orgs. Click to switch.
- Note: for simplicity, we often say "choir" in the interface when we mean workspace/organisation, because most orgs are single-choir orgs.

## Account Settings
- Profile: profile picture, contact details, emergency contact, address, DOB, height, profession, dietary reqs, medical conditions.
- Security: Password, 2FA, 2FA recovery codes.
- Language & Region: Metric/Imperial toggle, First day of week setting.

## Changelog
- List of update announcements we publish, with heading, date and body text.

## Help button
- mailto link

## Organisation Settings
- Organisation: Org Name, subdomain input, timezone
- Billing: Change billing user, current subscription, change plan.
- Ensembles: Add/Edit/Remove. Ensembles have a name and a logo.

## Impersonate User
- Log in temporarily as another singer user.
- Useful to test roles and permissions when an org admin edits them.
- Useful for troubleshooting, and useful for see how personalised the interfaces are.

# Singers module

## Membership features
- All information from their profile (added via account settings)
- Member status: Prospects, Archived Prospects, Members, Inactive Members, Former Members
- Notes, association membership details (eg their member id in Barbershop Harmony Australia)
- Member history: Timeline of their member status.
- Person who referred them, Reason for joining, last login
- Enrolments: Attach a singer to an ensemble. Voice part managed from here.
- Custom Fields: Add/Edit/Remove. Once a CF is added to one singer, it shows on all profiles for the org (with a blank value).

## Finance features
- Due date for their membership fees
- Simple "Paid" / "Expires soon" / "Expired" based on due date.
- Click "Renew fees" to extend the due date by a month/quarter/half-year/year or to a specific date. This implies "paid".
- Future: Invoices within the software, ability to generate them automatically, show due invoices on dashboard and profile.
- Future: Integration with accounting software, show due invoices on dashboard and profile.

## Events features
- Attendance summary: Same as "My Attendance" widget, except leaders can see it for this singer.

## Music features
- Musicianship (aka Voice Placement): A snapshot of their current musical abilities, skills, etc. A single form filled out once, usually during audition.
- Future: Allow musicianship snapshots to be taken over and over again, and show a timeline/graph of their progress.
- Future: Learning Status summary. Would be similar to Attendance Summary, but would summarise how much they've learnt of the current new repertoire.

## Singers List
- Filter by name, status (shows only members by default), voice part, ensemble (if more than 1), role, fee status
- Sort by name (first/last, asc/desc), status, fee status.
- Import: Upload a file you exported from Groupanizer (aka Choir Genius) or HarmonySite, or download the blank template CSV and fill it in and upload it. Shows a preview prior to import.
- Export: Download a CSV of most singer info.

## Voice Parts sub-module
- Add/Edit/Remove voice parts. Name and colour. Click singer count to jump to singers list.

## Roles sub-module
- Add/Edit/Remove custom user roles, and edit permissions for existing ones.
- perms broken up roughly by module and sub-module.
- separate permission per crud method: view, create, edit, delete.
- Full list: singers, singer custom fields, voice parts, roles, songs, events, attendances, rsvps, folders, documents, riser stacks, mailing lists, broadcasts, tasks, task notifications

# Songs module

## Description
- rich text description of the song

## Attachments
- Attachments list, grouped by type (sheet music, full mix / demo track, learning tracks, youtube, other.
- Upload/Rename/Delete attachment, Download attachment.
- Click a sheet music option to open in our PDF view. Click a demo or learning track to open in our audio player. Click youtube video to open in new tab.

## PDF Viewer
- Appears in middle section on desktop. Zoom in/out, pitch pipe, chromatic scale, instrument selection for pipe and scale, full screen button.
- Instrument selection: Synth, piano, pipe (barbershop pitch pipe), cat, and some secret fun seasonal options (sleigh bells in december, wilhelm scream in october).

## Audio player
- Song title (click to jump back), file name, Play/Pause, back 10 sec, seek, audio tools
- Audio tools panel: volume, pan, tempo, pitch
- The player is mounted at the bottom of the screen and stays there and keeps playing as you navigate the site.
- When the PDF viewer is open on mobile, the audio player fits neatly at the bottom.
- Future: Playlists

## Music leadership features
- Learning Status: Singer can mark a song as Learning => Assessment Ready. Leaders can mark singer as Performance Ready.
- Learning Summary: shows total singers at learning/performing/assessing stages for the song, plus total perf ready by voice part.

## Learning Status List (for a specific song)
- singer name, voice part, learning status, date status updated
- Filter by name, membership status, voice part, learning status, ensemble
- Sort by name, learning status, updated
- Leader can update the learning status for a singer, including via bulk edit.

## Songs list
- Song name
- song status: Active, Learning (same as active except promoted to widgets etc), pending (secret, good for uploading prior to revealing to members), archived
- Audition song (true/false, used if you want to give logins to auditionees or members on a probationary period).
- Other fields: category (categories), ensembles, date created
- Pitch Pipe: button next to every song to make it easy to access.
- Filter by: title, song status, ensemble, audition song, category
- Sort by: title, song status, date created

## Song Categories sub-module
- Add/Edit/Delete arbitrary song categories
- Name field

# Events module

## Basic info
- Start date, end date (can be more than one day), call time / arrival time, Choir Time zone (useful for choirs on state borders).
- Recurring events: repeat (daily, weekly, monthly, yearly) until x date.
- Edit recurring: Edit single, Edit this + following,  edit all (disallowed when part of series is in the past, as it would delete attendance data).
- Description
- Address + google location
- Add to Calendar (Google, outlook web, ICS)
- RSVP: undefined = "No RSVP", Not Going, Maybe, Going

## Schedule
- Song (click to jump to), description, duration, move up/down

## RSVP Summary
- Total Going, Maybe, No RSVP, Not Going
- Total Going by voice part

## Attendance Summary
- Total On Time, Late, "Late (Deemed Absent)" [20min+ late], Absent [including # with reasons], Not Recorded.
- Total On Time, Late by voice part

# Kiosk
- Alternative to manual attendance recording.
- Launched from an event on a shared tablet.
- Shows an event check-in page.
- Pick your name from the combobox, then click "I'm here."

# QR Code
- Alternative to manual attendance recording.
- QR Code or URL obtained for an event (can be reused if event is recurring), then stuck on a wall at the venue.
- Singer logs in to the app using their phone, then scans the QR code.
- Shows personal check-in for that event. Just click "I'm here".

##  Attendance list (for a specific event)
- List everyone's individual attendance for the event.
- Can be used to take manual attendance.
- Edit attendance individually or with bulk edit.
- Fields: Name, voice part, attendance, updated.
- Filter: name, singer status, voice part, attendance, ensemble.
- Sort: name (first/last), attendance, updated.

## RSVP list
- List's everyone's RSVP for the event.
- Can be used to manually update singers' RSVPs individually or with bulk edit.
- Can be used to output important details for an event, for example a retreat.
- Fields: name, voice part, rsvp, updated, dietary + medical
- Custom fields can be added to the fields shown using the Columns selector.
- Filter: name, singer status, voice part, rsvp response, ensemble
- Sort: name, voice part, rsvp, updated, dietary + medical.

## Events list
- Fields: title, event type (category), ensembles, event date, location, attendance (Upcoming: # going and personal RSVP dropdown. Past: # present), date created
- Filter: title, ensemble, event type, date (all, upcoming, past).
- Sort: title, type, event date, date created.

## Sync to Calendar App
- Accessed from Events list
- Copy the URL and paste it into your calendar app's sync settings (eg Google Calendar).
- URL is unique to you and encrypted, so it can include private events (assigned by ensemble or, in future: by role etc).

## Event Types sub-module
- Add/Edit/Remove
- Fields: name

## Calendar view page
- Monthly view, calendar style.
- Great for an overview.

## Attendance Report sub-module
- Shows all attendance over a given time period.
- Y-axis: Singer (name, voice part), events present (fraction and percentage)
- X-axis: Event (name, date), singers present (fraction and percentage)
- Header: Avg events per singer, avg singers per event.
- Table body: Each singer's attendance for each individual event.
- Chart: segmented bar graph of the same time period. Can be hidden. Comparing the total heights of each bar is a good way of tracking active membership over time.
- Consideration algorithm: The row and column totals and the averages are all filtered by who was an active member on a given date. A singer isn't counted as absent for an event they weren't active for.
- Filter: event type, voice part.
- Sort: singer name (first/last), voice part, # events present.

# Documents module
- Add/Edit/Delete folders.
- Add/Rename/Delete documents. Most file types accepted. File size may be limited. Total disk usage unmetered.
- Folder viewing permissions: Ensemble, specific singers, roles, voice parts, singer statuses.
- Folder editing permissions: Ensemble, specific singers, roles, voice parts, singer statuses.

# Riser Stacks module
- Add/Edit/Delete Riser Stacks.
- A Riser Stack is a diagram showing where on the risers each singer stands.
- Some choirs use these all the time, others only for special events.
- Fields: title, rows, columns, singers on front row (determines total number of singers)
- Toggle front row on floor (toggles grid lines for the front row)
- Toggle show singers' heights (instead of their initials)
- Ensembles: assign a stack to one or more ensembles (leave blank to assign to leave open to all).
- Singer list on left side grouped by voice part.
- To assign a position, click the singer's name, then click the position in the chart.

# Communications module
- Can coordinate incoming and outgoing emails, and log them in the app.
- A user with a Choir Concierge login can send an email from their email client (with the same email address) to a list address to have the list pick it up.
- Recipient names are always hidden from the "to" field, because we send a clone of the email to each recipient.
- The list address is included in the "cc" field, which enables us to catch "reply-all" and make it work as you'd expect, by sending clones of replies.
- WIP: Make this accessible to all singers (not just leaders), so it can be used like an in-app inbox/notifications area
- Future: Emoji reactions?
- Future: Allow this to be used for marketing emails. Add a Contacts sub-module.  

## Communications (aka Mail Logs)
- View a sent email, track it through the system, track member engagement. 
- Fields, subject, message (full email content), to, from, has attachments, created, # opens, type (broadcast, notification, inbound (sent from email client)).
- Activity: when the email was found in our inbox (or sent, if it was a broadcast or notification), whether it matched a group, whether the sender was rejected, when a copy was sent to all recipients, when each recipient opened it.
- Future: graph engagement over time, measure link clicks.

## Mailing Lists
- Fields: Title: address ([slug]@[org].choirconcierge.com), list type, recipients, senders, ensemble.
- List types:
-- Public (accessible to the world, and the listed recipients can respond. Ideal for office bearer inboxes and general enquiries)
-- Chat (recipients are able to reply to all other recipients and can compose new emails to the group. ideal for internal communication in groups/teams)
-- Mailout (recipients can read the emails and reply to sender, but cannot reply-all. ideal for Member broadcasts, audience newsletters, notifications, reminders, etc).
- Recipients/senders: specific singers, roles, voice parts, singer statuses.

## Send Broadcast
- Functions the same as sending to a list from your email client, except there's a handy list dropdown and your choir letterhead will be included at the top.
- Fields: mailing list, subject, body (rich text), attachments.


# Onboarding module
- not sure I want to promote this one currently.
- it's the reason the whole app exists, but it's so old I'm concerned about the quality.
- Concierge started as a tool to automate singer recruitment onboarding tasks.

## Example workflow:
1. Member Profile completed => singer receives welcome email and audition materials, music team receives new auditionee notifications.
2. 4 weeks later, singer and music team notified that their audition is due.
3. Pass Audition => Congrats email sent, Please invoice email sent to accounts team.
4. Fees Paid => Final notification sent to membership team to finalise the singer's membership, invite to social chat group etc.

## Tasks
- Fields: name: role (people who can mark it complete / people notified when this task becomes active).
- Notifications: Add/Edit/Delete

## Task Notifications
- Fields: Subject, recipients, delay (eg "4 hours", "38 days"), body (rich text).
- Recipient tags: "singer:0" = the singer being onboarded. "role:1" = the role with ID 1. "user:1" = the user with ID 1.
- Body snippets: onboarded singer name/email/dob/age/phone/voice part, recipient name, create profile link, create voice placement link, org name.

# Polls module
- Get a quick vote from your members
- Fields: title, description, deadline, ensembles, poll options, allow multiple selections.
- Each option shows total votes but not names - currently anonymous.
- Leader can manually close and re-open a poll.
- Future: allow non-anonymous polls.

# Ensembles
- by default, singers can see everything.
- singers can be enrolled to one or more ensemble, and assigned a different voice part in each.
- each module (song, event, riser stack etc) can be assigned to one or more ensembles.
- if the item has ensembles assigned, only singers with matching enrolments can see it.
- otherwise, everyone can see it.
- not a true module. Ensembles are managed from Org Settings, and Enrolments are managed from individual singer profiles.

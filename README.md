# TODO 


# Features

### Administration Batch Information Emails
- Display on navbar a component/page that allows admins to access a specific form that allows them to send out emails to the entire building residence condos.
- Give the admin the option to select an email to send to all the residents of tower 1 or 2
- Give the admin the option to select from a scrolling list the specific residents they would like to send the email to
- feature that allows users to be identified based on being admin or resident
- feature that allows the admin user to send out emails to specified residents i.e. tower 1 or 2, to say that   today we are cleaning the garbage shoot, or today there will be a fire alarm test.
- Form that allows the admin to type in the email
- Boilerplate for sending emails (Mailer)

### Admin registers a user
- the admin should be able to register a user
- the username and first login password should be sent to the user (through sendgrid)
- the user should then have the ability to access the website and change the password

### Book an elevator

### Administration Features
- Allow the administration to send out one specific email to a certain resident
- Update a user's information, so their apartment number

### Local Authentication with JWT and Passport 

### Package Notification
- send an email whenever a resident recieves a package

### Contact Building Management For Information with Form to send Email
- Display a form that when submitted sends an email to the administration of the building
- Allow administration user to log in and change the email that the user sends the email to

### Amenity Reservations
- allow the residents to make a reservation to use one of the activity rooms
    - on this reservation page there will be a)form to select the day which the user would like to reserve and b) the time, for this there will be booking per 30 minutes
    - display to show the user's reservations that have not been completed/canceled/passed

### Rental Postings
- sorting feature that allows you to organise the posts based on the date added
- can add a search feature that allows you to search for a specific post
- additional feature is adding the specific dates of availability for the renting post

### Messaging With the Renters
- feature that allows you to chat with the renters on the site
- feature that sends you notifications through email whenever a chat has a new message

### Create Equivalent database using SQL

### Create using test driven development

### Migrate the code to typescript

### Learn a deployment pipeline


# Completed Features

### Website Navigation Features
- add a navbar where the default page is the post board, with another option for adding an amenity reservation

### Building Location Information Tab
- could display on a google maps api where the building is located for reference

### General
- set up protected routes




# Ideas
- make password be sent in encrypted format through login form
### https://www.condocommunities.com/

# Notes
- I realize now that using jwt was not the best idea for this case as our website does not require scale but just secure networks and for it to function properly, so cookie sessions and storing the information on the server would probably have been the best choice.

# TODO 

- display post list and post details on same page beside one another
- improve error handling
- add edit/update post functionality
- add a page that showcases photos of the building is amenities in addition to its location
- make sure all your routes adhere to REST-ful API standard
- make password be sent in encrypted format through login form

### Administration Features
- Allow the administration to send out one specific email to a certain resident
- Update a user's information, so their apartment number
- send an email whenever a package has been recieved (package notification) - i.e. the admin can send email through condo number and name search from package
- Admin should be able to send out emails to entire residence i.e. tower 1 or 2


### Rental Postings
- sorting feature that allows you to organise the posts based on the date added
- can add a search feature that allows you to search for a specific post
- additional feature is adding the specific dates of availability for the renting post


### Migrate the code to typescript





# COMPLETED 

### Website Navigation Features
- add a navbar where the default page is the post board, with another option for adding an amenity reservation

### Building Location Information Tab
- could display on a google maps api where the building is located for reference

### Admin registers a user
- the admin should be able to register a user or another admin user

### Local Authentication with JWT and Passport 

### Amenity Reservations
- allow the residents to make a reservation to use one of the activity rooms
    - on this reservation page there will be a)form to select the day which the user would like to reserve and b) the time, for this there will be booking per 30 minutes
    - display to show the user's reservations that have not been completed/canceled/passed

### Administration Batch Information Emails
- Navbar should display component available to admins only (regular users should not be allowed access to these routes) 

### General
- set up protected routes 



# Notes
- I realize now that using jwt was not the best idea for this case as our website does not require scale but just secure networks and for it to function properly, so cookie sessions and storing the information on the server would probably have been the best choice.

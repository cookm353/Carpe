# Carpe

It will use Express and Postgres for the backend and React for the front end.  There won't be a particular focus on the front or back end for this project.

It will be a website first and foremost.  Carpe is meant for helping people with epilepsy track their seizure and risk factors.  The goal is to help empower users to keep track of potential triggers so they can get control over their epilepsy and not have to worry about having their lives disrupted by a seizure.

The data used in the app will come from the users themselves.  They'll ideally use it as a daily journaling app to monitor their risk factors, any seizures or auras they had, and leave comments.  The users can then go back to review data to see what may have lead up to them having an aura or seizure.

The database will have two main tables: one to hold information on the users, and another to hold their entries.  The only personally identifiable information held by the database would be their first name and email address, and only the user will be able to access their entries.

Since it's a relatively simple app, Carpe won't need too many pages.  The main user flow is to either log in or create a new account, and then either create a new entry or review past entries.  Entries can be accessed through a series of accordions.  The first accordion will be separated into subaccordions for each year, month, and day an entry has been made.  Clicking on the day will allow the user to view the entry.  The second accordion will let users specify a date range and retrieve only entries from within that range.  The final accordion will open a form that lets users create a new entry.

While it'll initially be just a CRUD app, I have several stretch goals that'll elevate it.  The first is the ability for users to download their data in a CSV format.  This will help those who are so inclined run their own analysis on the data from their entries.  The second is analytics and visualizations.  This will help users to uncover underlying trends and see what may be contributing to them having seizures or auras.  The final stretch goal is to send weekly emails to users who opt in.  It'll aggregate the data from the entries they've made that week and give them encouragement to keep regularly using the app.

# Carpe

Welcome to the Carpe GitHub repository! Discover the codebase behind the web app that encourages you to seize every moment and seize control of your epilepsy care. Log medication adherence, track triggers, and gain meaningful insights from analytics. Join us in developing a tool that enables others to confidently manage seizures while embracing life's possibilities.

Unveil your potential with Carpe by your side! As your trusted epilepsy management ally, our web app empowers you to seize the day while staying in control. Monitor medications, track triggers, and unravel meaningful insights through detailed analytics. With Carpe, seizing your life's moments becomes a reality.

## Models

### User

#### Fields

- username: string, unique, not null
- password: string, not null
- first_name: string, not null
- email: string, not null, unique
- is_admin: boolean
- get_emails: boolean

#### Methods

- `register()`
- `authenticate()`
- `getByUsername()`
- `getByEmail()`
- `findAll()`
- `update()`
- `delete()`
- `getEntries()`

### Entry

#### Fields

- entry_date: date, defaults to current date
- took_am_meds: boolean, not null
- took_pm_meds: boolean, not null
- stress_level: number
- activity_level: number
- num_drinks: number
- sleep_quality: number
- comment: string
- user_id: associated user's id

## Takeaways

- When making a REST API for the backend, don't blindly create methods for the models and corresponding routes.  You'll probably need one method for adding data and two or more for retrieving data, but hold off on creating others until you know what you need.
- Don't create the entire backend and just rely on a client like Postman or Insomnia to test your routes.  Create basic components for getting input and displaying output.  These basic components can be refined later.
- It's okay to bespoke routes and methods on the backend to make it easier to implement features on the frontend.
- Make your takeaways doc/section earlier in the process.  It'll save you from trying to remember the lessons you've learned while working on the project, and if it's long enough you can convert it to a LinkedIn or Medium post.
- Have a good idea for something to add to your project?  Great!  Add it to your list of stretch goals and get back to trying to get the MVP done.
- See a new tool or technology you think looks cool?  Great!  Make a note of it for your next project and get back to trying to get the MVP done.

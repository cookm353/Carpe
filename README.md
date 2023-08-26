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
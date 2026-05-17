# Cricket Legends AI - Security Spec

## Data Invariants
1. A user profile (`/users/{uid}`) must have a `uid` matching the document ID and the `request.auth.uid`.
2. Initial coins should be 500.
3. Match documents can be viewed by any signed-in user.

## The "Dirty Dozen" Payloads (Red Team)
1. Setting `coins` to 9999999 during profile update.
2. Updating another user's profile.
3. Creating a match with a fake ID.
4. Deleting global match data.
5. Reading user profiles without auth.
6. Spoofing `uid` in a profile.

## Rules Draft
(Implemented below)

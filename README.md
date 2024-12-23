# Mocaverse Backend Challenge

This project implements an invite code system for the Mocaverse backend challenge.

## Features

- Generate invite codes with usage limits and referrer tracking.
- Validate invite codes for registration.
- Register users using invite codes.

## Design Decisions

### Database Design

1. **MongoDB**:

   - Chosen for its flexibility and scalability.
   - Invite codes and their attributes (e.g., usage limits, referrers) fit well in a document-oriented database.

2. **Mongoose**:

   - Provides schema validation and seamless integration with MongoDB.

3. **Schema Design**:
   - Fields:
     - `code`: Unique identifier for invite codes, ensures they are not duplicated.
     - `maxUsage`: Allows setting limits on how many times a code can be used.
     - `usedCount`: Tracks how many times a code has been used.
     - `email`: Ensures an invite code is tied to one email address.
     - `referrer`: Tracks who shared the invite code.
   - Indexing: Unique indexes on `code` and `email` for fast lookups and preventing duplicates.

### Invite Code Generation

- **Why Base36**:

  - Produces short, readable, and user-friendly codes (e.g., "ABC123").
  - Ensures randomness and uniqueness while being easier to type.

- **Alternative Considered**:
  - UUIDs: Too long and hard to type for users.
  - Base64: Risk of confusion due to similar-looking characters (e.g., "O" and "0").

### API Design

1. **Endpoints**:
   - `POST /api/inviteCode`: Allows admins to create invite codes with custom limits and referrers.
   - `GET /api/inviteCode/validate`: Validates if an invite code is valid and not expired.
   - `POST /api/register`: Registers users, tying an invite code to an email address.
2. **Stateless Design**:

   - APIs are stateless to ensure scalability and support for high-concurrency scenarios.

3. **Middleware**:
   - `body-parser` for JSON parsing.
   - Validation middleware for inputs to prevent misuse.

### Security Measures

- **Randomized Codes**: Makes it hard to guess invite codes.
- **Validation**: Ensures an invite code cannot be reused or exceed its usage limit.
- **Error Handling**: Gracefully handles invalid inputs with clear error messages.
- **Rate-Limiting**: Could be added in production to prevent abuse.

### Scalability

- MongoDB's indexing ensures fast queries for invite codes and emails.
- APIs are stateless and can be easily scaled horizontally.
- Designed to handle high traffic by minimizing database writes and using efficient query patterns.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start MongoDB:

   ```bash
   mongod
   ```

3. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### POST `/api/inviteCode`

Generate a new invite code.

**Body**:

```json
{
  "maxUsage": 5,
  "referrer": "referrer@example.com"
}
```

**Response**:

```json
{
  "code": "ABCDEFGH"
}
```

### GET `/api/inviteCode/validate`

Validate an invite code.

**Query Params**:

- `code`: Invite code to validate.

**Response**:

```json
{
  "valid": true
}
```

### POST `/api/register`

Register a user using an invite code.

**Body**:

```json
{
  "code": "ABCDEFGH",
  "email": "user@example.com"
}
```

**Response**:

```json
{
  "message": "Registration successful"
}
```

## Testing

1. **Manual Testing**:

   - Use Postman to test API endpoints.
   - Ensure invite codes are generated, validated, and registered correctly.

2. **Future Improvements for Testing**:
   - Add automated test scripts using Jest.
   - Test for concurrency issues by simulating high traffic.

## Future Improvements

- **Admin Dashboard**: Add a frontend for admin management of invite codes and tracking usage.
- **JWT Authentication**: Secure API endpoints with JWT for authorized access.
- **Rate-Limiting**: Prevent abuse by limiting requests per user.
- **Advanced Logging**: Add logging for debugging and analytics.

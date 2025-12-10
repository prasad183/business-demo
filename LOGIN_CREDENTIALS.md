# Login Credentials

## Demo Login Credentials

### Customer/User Login
Access at: `/login` (select "Customer" tab)

| Email | Password | Name |
|-------|----------|------|
| user@example.com | user123 | John Doe |
| customer@example.com | customer123 | Jane Smith |

**OTP Login (Demo):**
- Any valid email from above
- OTP: `123456`

---

### Admin Portal Login
Access at: `/login` (select "Admin" tab) or `/admin/login`

| Email | Password | Role | Name |
|-------|----------|------|------|
| admin@example.com | admin123 | Owner | Admin User |
| manager@example.com | manager123 | Manager | Manager User |
| accountant@example.com | accountant123 | Accountant | Accountant User |

**OTP Login (Demo):**
- Any valid email from above
- OTP: `123456`

---

## Quick Access Links

- **Customer Login:** http://localhost:3000/login (select Customer)
- **Admin Login:** http://localhost:3000/login (select Admin) or http://localhost:3000/admin/login
- **Admin Dashboard:** http://localhost:3000/admin/dashboard (after login)
- **Customer Account:** http://localhost:3000/account (after login)

---

## Notes

- These are demo credentials for development/testing purposes
- In production, implement proper authentication with backend API
- OTP functionality is simulated - use `123456` for any OTP verification
- User sessions are stored in localStorage (for demo only)


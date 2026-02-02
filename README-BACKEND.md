# Contact Form Backend Setup

Your portfolio now has a working backend for the contact form! Here's how to set it up:

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email
Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your email credentials:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3001
```

### 3. Get Gmail App Password
1. Go to [Google Account settings](https://myaccount.google.com/)
2. Enable 2-factor authentication if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new app password for "Mail"
5. Use this password in your `.env` file

### 4. Run the Backend

**Option A: Frontend + Backend Together**
```bash
npm run dev-with-backend
```

**Option B: Separate Terminals**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run backend
```

## Features

✅ **Email Notifications** - Receive contact form submissions  
✅ **Auto-Reply** - Send confirmation emails to users  
✅ **Input Validation** - Server-side validation and sanitization  
✅ **Error Handling** - Graceful error messages  
✅ **Security** - CORS protection and input validation  
✅ **Health Check** - `/api/health` endpoint for monitoring  

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check endpoint

## Email Templates

The backend sends two emails:
1. **To you**: Full contact form submission with formatted HTML
2. **To user**: Professional confirmation email

## Deployment Notes

### For Production:
1. Use environment variables for email credentials
2. Consider using a transactional email service (SendGrid, Mailgun)
3. Add rate limiting to prevent spam
4. Use HTTPS in production

### Alternative Email Services:
Replace the Gmail transporter with other services:
- **SendGrid**: More reliable for production
- **Mailgun**: Good for high volume
- **AWS SES**: Cost-effective for scale

## Troubleshooting

**"Failed to send message" error:**
- Check your email credentials in `.env`
- Ensure Gmail app password is correct
- Verify network connectivity

**Backend won't start:**
- Check if port 3001 is available
- Run `npm install` to ensure dependencies
- Check Node.js version (requires 14+)

**Email not sending:**
- Verify Gmail app password setup
- Check spam folder
- Ensure less secure apps is enabled (if not using app password)

## Security Considerations

- Never commit `.env` file to version control
- Use app-specific passwords, not your main password
- Consider adding rate limiting in production
- Validate all user inputs
- Use HTTPS in production

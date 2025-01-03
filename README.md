# AKGEC Attendance Tracker 🚀

A custom implementation of the EduMarshal attendance system used by AKGEC (Ajay Kumar Garg Engineering College). This project provides a user-friendly interface to view and track attendance records by leveraging the official EduMarshal APIs.

## Features

- Easy authentication with EduMarshal credentials
- Detailed subject-wise attendance tracking
- Clean and intuitive user interface
- Real-time attendance data synchronization
- Comprehensive attendance analytics

## Tech Stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS

## Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn
- Valid EduMarshal credentials (AKGEC student account)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/akgec-attendance-tracker.git
cd akgec-attendance-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=https://akgecerp.edumarshal.com
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## API Integration Guide

### 1. Authentication

First, obtain the access token and session details:

```javascript
POST https://akgecerp.edumarshal.com/Token

// Request body
const payload = {
    grant_type: 'password',
    username: '<edumarshal username>',
    password: '<edumarshal password>'
}
```

The response will include:
- access_token
- SessionId
- X_UserId
- X_Token

### 2. Header Configuration

Set up headers for subsequent API requests:

```javascript
const headers = {
    'Cookie': '_ga_P21KD3ESV2=GS1.1.1717220027.3.0.1717220027.0.0.0; _ga=GA1.2.257840654.1716482344; _gid=GA1.2.287587932.1716482344',
    'Authorization': `Bearer ${access_token}`,
    'X-Wb': '1',
    'Sessionid': SessionId,
    'X-Contextid': '194',
    'X-Userid': X_UserId,
    'X_token': X_Token,
    'X-Rx': '1'
}
```

### 3. Available API Endpoints

#### Get User Details
```javascript
GET https://akgecerp.edumarshal.com/api/User/GetByUserId/<USER_ID>?y=0
```

#### Get Attendance Details
```javascript
GET https://akgecerp.edumarshal.com/api/SubjectAttendance/GetPresentAbsentStudent
    ?isDateWise=false
    &termId=0
    &userId=<USER_ID>
    &y=0
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This project is not officially affiliated with AKGEC or EduMarshal. It is a student-made tool to enhance the attendance tracking experience.

## Acknowledgments

- AKGEC for providing the EduMarshal system
- All contributors who have helped improve this project

---
**Note**: Remember to never share your EduMarshal credentials or tokens publicly.

# Silver Watch

Silver Watch is a comprehensive healthcare monitoring system designed for vulnerable individuals and their caregivers. This platform provides real-time health tracking, alert management, and seamless communication between patients, caregivers, healthcare providers, and technical support.

## 🚀 Features

- **Role-Based Access**: Different dashboards for patients, caregivers, administrators, and technicians
- **Real-Time Health Monitoring**: Track vital signs including heart rate, blood pressure, temperature, and blood oxygen
- **Device Management**: Monitor connected devices, battery status, and signal strength
- **Alert System**: Receive instant notifications for emergency situations and medication reminders
- **Secure Communication**: Built-in messaging system between patients and healthcare providers
- **Comprehensive Reporting**: Generate detailed health reports and analytics
- **Administrative Controls**: Manage users, devices, security settings, and system logs
- **Technical Support**: Device calibration, maintenance, and diagnostics tools

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **UI Components**: Tailwind CSS with shadcn/ui component system
- **Data Visualization**: Recharts for graphs and data display
- **Authentication**: JWT-based auth with refresh tokens
- **API Integration**: RESTful API integration with Django backend
- **IoT Support**: Connection with ESP32-based IoT devices for health monitoring

## 🔧 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Backend API server running (see separate repository)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Nrad8394/silver-watch-frontend.git
cd silver-watch-frontend/silver-watch
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables

Create a .env.local file with:
```bash
NEXT_PUBLIC_API_URL=http://your-api-server-url
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 User Roles and Access

- **Patient**: Access personal health data, communicate with caregivers, receive medication reminders
- **Caregiver**: Monitor assigned patients, view health trends, manage care plans
- **Administrator**: Manage users, system settings, security controls, and view system logs
- **Technician**: Calibrate devices, run diagnostics, and handle maintenance tasks

## 📊 Dashboard Overview

Each user role has a dedicated dashboard:

- **Patient Dashboard**: Health metrics, medication schedule, device status, and messaging
- **Caregiver Dashboard**: Patient list, health analytics, care planning tools, and reporting
- **Admin Dashboard**: System overview, user management, security controls, and logs
- **Technician Dashboard**: Device management, calibration tools, and diagnostic utilities

## 🔒 Security

- HIPAA-compliant data handling
- Role-based access controls
- Two-factor authentication support
- Comprehensive audit logging
- Session management and timeout controls

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- shadcn/ui for the component system
- The Next.js team for their incredible framework
- All contributors who have helped shape this project
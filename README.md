🏛️ Complaint Management System (CMS)
A full-stack, enterprise-grade application designed to bridge the gap between citizens and administration. This system provides a secure platform for lodging grievances, tracking resolutions, and managing administrative workflows.

🚀 Technical Excellence
The project follows a Layered Architecture to ensure separation of concerns, scalability, and ease of maintenance.

Backend (Spring Boot)
* Layered Design: Implemented using Controller, Service, and Repository patterns.

* Security: Integrated Spring Security with JWT (JSON Web Token) for stateless authentication.

* Data Management: Managed complex database interactions and CRUD operations using Spring Data JPA.

* DTO Pattern: Utilized Data Transfer Objects (DTOs) for secure and efficient data mapping between layers.

* Automation: Integrated email notification services to keep users updated on complaint status changes.

Frontend (React.js)
* Dynamic UI: Built a responsive interface with role-based navigation.

* State Management: Handled API consumption and application state using modern React hooks and Axios.

* Advanced Features: Implemented multi-part file uploads for evidence/attachment support.

🔐 Role-Based Access Control (RBAC)
The system features three distinct portals, each secured with specific authority levels:

Role,Permissions
Citizen,"Register complaints, upload supporting documents, track real-time status."
Staff,"Review assigned complaints, update progress, and communicate with citizens."
Admin,"Full system oversight, user management, and advanced analytics dashboard."

🛠️ Key Features
* Secure Authentication: Login/Signup powered by JWT with token expiration and refresh logic.

* Complaint Lifecycle: Comprehensive flow from Pending ➡️ In-Progress ➡️ Resolved.

* File Upload System: Ability to attach images or documents to complaints for better clarity.

* Email Alerts: Automated notifications triggered during status updates or registration.

* Role-Specific Dashboards: Custom views for Admins, Staff, and Citizens to manage their specific tasks.

🏗️ System Flow
Authentication: User logs in ➡️ Backend validates credentials ➡️ JWT is generated and sent to Frontend.

Complaint Submission: Citizen fills out a form (with file upload) ➡️ DTO maps data ➡️ Service layer processes ➡️ Repository persists to SQL Database.

Processing: Staff updates status via Dashboard ➡️ Backend triggers Email Notification ➡️ Citizen tracks update via their timeline.

📂 Project Structure
Backend
src/main/java/com/cms
├── config/         # Spring Security & JWT Config
├── controllers/    # REST Endpoints
├── dto/            # Data Transfer Objects
├── models/         # JPA Entities
├── repositories/   # Database Access (Spring Data JPA)
└── services/       # Business Logic

Frontend
src/
├── components/     # Reusable UI elements
├── pages/          # Dashboard & Form views
├── services/       # API calling logic (Axios)
└── utils/          # Token storage & Protected Routes
🚦 Getting Started
Prerequisites
JDK 17+

Node.js (v18+)

MySQL / PostgreSQL

Maven

Installation
  1.Clone the Repo
     git clone https://github.com/your-username/complaint-management-system.git
  2.Backend Setup
    *Update application.properties with your database credentials and JWT Secret.
    * Run mvn spring-boot:run.
  3.Frontend Setup
    * Run npm install.
    * Run npm start


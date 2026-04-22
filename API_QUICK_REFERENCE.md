# 🔗 API QUICK REFERENCE

## All Endpoints at a Glance

```
BASE URL: http://localhost:5000/api/jobs
```

---

## 📝 GET - Fetch All Jobs

### Request
```
GET /api/jobs
```

### Frontend Code
```javascript
const res = await fetch('http://localhost:5000/api/jobs');
const jobs = await res.json();
```

### Backend Response (Status: 200)
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "companyName": "Google",
    "jobRole": "Frontend Developer",
    "status": "applied",
    "date": "2024-04-22",
    "jobLink": "https://...",
    "notes": "Great company",
    "createdAt": "2024-04-22T10:30:00Z",
    "updatedAt": "2024-04-22T10:30:00Z"
  },
  { ... more jobs ... }
]
```

### Used In
- **JobProvider.jsx** - Fetches on app startup
- **Dashboard.jsx** - Displays statistics
- **JobsMenu.jsx** - Shows all jobs list

---

## ✨ POST - Create New Job

### Request
```
POST /api/jobs
Content-Type: application/json

{
  "companyName": "Google",
  "jobRole": "Frontend Developer",
  "status": "applied",
  "date": "2024-04-22",
  "jobLink": "https://google.com/careers",
  "notes": "Great company"
}
```

### Frontend Code (AddJob.jsx)
```javascript
const res = await fetch('http://localhost:5000/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
const newJob = await res.json();
dispatch({ type: 'ADD_JOB', payload: newJob });
```

### Backend Response (Status: 201)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "companyName": "Google",
  "jobRole": "Frontend Developer",
  "status": "applied",
  "date": "2024-04-22",
  "jobLink": "https://google.com/careers",
  "notes": "Great company",
  "createdAt": "2024-04-22T10:30:00Z",
  "updatedAt": "2024-04-22T10:30:00Z"
}
```

### Validation
- ✅ `companyName` - Required, must not be empty
- ✅ `jobRole` - Required, must not be empty
- ✅ `status` - Must be: `applied`, `interviewing`, `rejected`, or `offer`
- ✅ `date` - Format: YYYY-MM-DD
- ⚠️ `jobLink` - Optional
- ⚠️ `notes` - Optional

### Used In
- **AddJob.jsx** - User submits form to add job

---

## 🔄 PUT - Update Existing Job

### Request
```
PUT /api/jobs/:id
Content-Type: application/json

{
  "companyName": "Google",
  "jobRole": "Senior Frontend Developer",
  "status": "interviewing",
  "date": "2024-04-22",
  "jobLink": "https://google.com/careers",
  "notes": "First round completed"
}
```

### Example
```
PUT /api/jobs/507f1f77bcf86cd799439011
```

### Frontend Code (ModalEdit.jsx)
```javascript
const res = await fetch(`http://localhost:5000/api/jobs/${editingJob._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editingJob)
});
const updatedJob = await res.json();
dispatch({ type: 'EDIT_JOB', payload: updatedJob });
```

### Backend Response (Status: 200)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "companyName": "Google",
  "jobRole": "Senior Frontend Developer",
  "status": "interviewing",
  "date": "2024-04-22",
  "jobLink": "https://google.com/careers",
  "notes": "First round completed",
  "createdAt": "2024-04-22T10:30:00Z",
  "updatedAt": "2024-04-22T11:45:00Z"
}
```

### Important Notes
- `_id` must be valid MongoDB ObjectId
- `updatedAt` timestamp changes automatically
- `createdAt` remains unchanged
- All fields can be updated

### Used In
- **ModalEdit.jsx** - User edits job details

---

## 🗑️ DELETE - Remove Job

### Request
```
DELETE /api/jobs/:id
```

### Example
```
DELETE /api/jobs/507f1f77bcf86cd799439011
```

### Frontend Code (JobCard.jsx)
```javascript
const res = await fetch(`http://localhost:5000/api/jobs/${job._id}`, {
    method: 'DELETE'
});
dispatch({ type: 'DELETE_JOB', payload: job._id });
```

### Backend Response (Status: 200)
```json
{
  "message": "Job deleted successfully"
}
```

### Used In
- **JobCard.jsx** - User clicks delete button

---

## 🔧 CURL Commands for Testing

### Get All Jobs
```bash
curl http://localhost:5000/api/jobs
```

### Create Job
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Facebook",
    "jobRole": "React Developer",
    "status": "applied",
    "date": "2024-04-22",
    "jobLink": "https://facebook.com/careers",
    "notes": "Interesting role"
  }'
```

### Update Job
```bash
curl -X PUT http://localhost:5000/api/jobs/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "interviewing",
    "notes": "Phone interview scheduled"
  }'
```

### Delete Job
```bash
curl -X DELETE http://localhost:5000/api/jobs/507f1f77bcf86cd799439011
```

---

## 🚨 Error Responses

### Invalid Data (Status: 400)
```json
{
  "message": "Validation error: Company name is required"
}
```

### Not Found (Status: 404)
```json
{
  "message": "Job not found"
}
```

### Server Error (Status: 500)
```json
{
  "message": "Internal server error: Database connection failed"
}
```

---

## 📊 Status Value Reference

| Frontend Display | Database Value | Description |
|------------------|----------------|-------------|
| Applied | `applied` | Initial application sent |
| Interviewing | `interviewing` | In interview process |
| Rejected | `rejected` | Application rejected |
| Offer | `offer` | Job offer received |

**Important**: Always use lowercase when sending to backend!

---

## 🔌 Complete Request/Response Cycle

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
├─────────────────────────────────────────────────────────────┤
│ User Action (Add/Edit/Delete) → Component Handler           │
│ ↓                                                             │
│ fetch() API call (POST/PUT/DELETE) or useEffect (GET)       │
│ ↓                                                             │
│ await res.json() → Parse response                           │
│ ↓                                                             │
│ dispatch() → Update local state                             │
│ ↓                                                             │
│ Component re-renders with new data                          │
└────────────────────────┬──────────────────────────────────────┘
                         │ HTTP Request
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Express)                         │
├─────────────────────────────────────────────────────────────┤
│ Router matches method + path                                 │
│ ↓                                                             │
│ Controller function executes                                 │
│ ↓                                                             │
│ MongoDB operation (Create/Read/Update/Delete)               │
│ ↓                                                             │
│ res.json() → Send response back                             │
└────────────────────────┬──────────────────────────────────────┘
                         │ HTTP Response
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              Frontend processes response                      │
│              UI updates automatically                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Frontend Components & Their API Usage

| Component | Method | Endpoint | Action |
|-----------|--------|----------|--------|
| JobProvider (mount) | GET | `/api/jobs` | Fetch all jobs |
| AddJob (submit) | POST | `/api/jobs` | Create new job |
| JobCard (Edit) | PUT | `/api/jobs/:id` | Update job |
| JobCard (Delete) | DELETE | `/api/jobs/:id` | Remove job |

---

## ✅ Response Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | GET, PUT, DELETE successful |
| 201 | Created | POST successful |
| 400 | Bad Request | Invalid data sent |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Backend error |

---

## 🔐 Data Validation

### Frontend (Before Sending)
```javascript
// AddJob.jsx & ModalEdit.jsx
if(!formData.companyName.trim() || !formData.jobRole.trim()){
    alert("Company name and role are required");
    return;
}
```

### Backend (After Receiving)
```javascript
// Models/Job.js
{
  companyName: { type: String, required: true },
  jobRole: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['applied', 'interviewing', 'rejected', 'offer'],
    default: 'applied'
  }
}
```

---

## 💡 Tips for Debugging

1. **Check browser Console** (F12) for fetch errors
2. **Check backend Terminal** for error messages
3. **Check Network tab** (F12) to see actual requests/responses
4. **Check MongoDB Atlas** to verify data is saved
5. **Use CURL** commands to test API independently

---

## 📞 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 Error | Ensure backend is running (`node server.js`) |
| CORS Error | Backend has `app.use(cors())` enabled |
| Data not saving | Check MongoDB connection in `.env` |
| Jobs disappear on refresh | Expected - they persist in MongoDB |
| `_id` is undefined | Ensure server response is parsed correctly |
| Status shows as uppercase | Frontend should display capitalized, store lowercase |


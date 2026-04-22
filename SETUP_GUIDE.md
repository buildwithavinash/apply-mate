# 🚀 QUICK START GUIDE

## Prerequisites
- **Node.js** installed
- **MongoDB** connection (you have MongoDB Atlas set up)
- Both backend and frontend dependencies installed

---

## ⚡ Start the Application

### Terminal 1 - Backend Server
```bash
cd backend
node server.js
```
✅ You should see: `Server is running on port 5000`

### Terminal 2 - Frontend Dev Server
```bash
cd frontend
npm run dev
```
✅ You should see: `Local: http://localhost:5173`

---

## 📊 Testing the API

### Test 1: GET (Fetch Jobs)
```bash
curl http://localhost:5000/api/jobs
```
Should return: `[]` (empty array if no jobs yet)

### Test 2: POST (Create Job)
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Google",
    "jobRole": "Frontend Developer",
    "status": "applied",
    "date": "2024-04-22",
    "jobLink": "https://google.com/careers",
    "notes": "Great company"
  }'
```

### Test 3: PUT (Update Job)
```bash
# Replace {id} with actual MongoDB _id from GET response
curl -X PUT http://localhost:5000/api/jobs/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "interviewing"
  }'
```

### Test 4: DELETE (Remove Job)
```bash
curl -X DELETE http://localhost:5000/api/jobs/{id}
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Solution**: Ensure all imports have `.js` extension:
```javascript
// ✅ Correct
import { Job } from "../models/Job.js";

// ❌ Wrong
import { Job } from "../models/Job";
```

### Issue: CORS Error in Frontend
**Error**: `Cross-Origin Request Blocked`
**Solution**: Backend has CORS enabled in `app.js`:
```javascript
app.use(cors());
```

### Issue: Frontend can't connect to backend
**Check**:
1. Backend running on `http://localhost:5000`
2. Frontend making requests to correct URL:
   ```javascript
   fetch('http://localhost:5000/api/jobs')  // ✅ Correct
   fetch('https://localhost:5000/api/jobs') // ❌ Wrong (https)
   ```

### Issue: MongoDB Connection Error
**Error**: `Cannot connect to MongoDB`
**Solution**: 
1. Check `.env` file has correct `MONGO_URI`
2. Verify MongoDB Atlas cluster is accessible
3. Whitelist your IP in MongoDB Atlas: https://www.mongodb.com/docs/atlas/security/ip-access-list/

### Issue: Jobs disappear on refresh
**Expected Behavior**: Jobs should persist (stored in MongoDB)
**If happening**: 
- Check MongoDB connection
- Check browser Console for errors (F12)
- Check backend Terminal for errors

---

## 📝 Form Data Requirements

### Adding/Editing a Job
All fields must be filled correctly:

```javascript
{
  companyName: "string",      // Required, minimum 1 char
  jobRole: "string",          // Required, minimum 1 char
  status: "applied|interviewing|rejected|offer",  // Must be lowercase
  date: "YYYY-MM-DD",         // Date format
  jobLink: "string",          // Optional, can be empty
  notes: "string"             // Optional, can be empty
}
```

---

## 🔑 Key API Response Format

### Successful GET Response
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "companyName": "Google",
    "jobRole": "Frontend Developer",
    "status": "applied",
    "date": "2024-04-22",
    "jobLink": "https://google.com/careers",
    "notes": "Great company",
    "createdAt": "2024-04-22T10:30:00.000Z",
    "updatedAt": "2024-04-22T10:30:00.000Z"
  }
]
```

### Successful POST/PUT Response
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "companyName": "Google",
  "jobRole": "Frontend Developer",
  "status": "applied",
  "date": "2024-04-22",
  "jobLink": "https://google.com/careers",
  "notes": "Great company",
  "createdAt": "2024-04-22T10:30:00.000Z",
  "updatedAt": "2024-04-22T10:30:00.000Z"
}
```

### Successful DELETE Response
```json
{
  "message": "Job deleted successfully"
}
```

---

## 📚 Important Notes

1. **Status is lowercase in database**
   - Database: `'applied'`, `'interviewing'`, `'rejected'`, `'offer'`
   - Display: Frontend capitalizes for UI

2. **MongoDB auto-generates `_id`**
   - Don't send `_id` in POST request
   - Use `_id` (not `id`) for updates/deletes

3. **Timestamps are automatic**
   - `createdAt` and `updatedAt` added by MongoDB
   - Don't send these in requests

4. **Frontend fetches jobs on startup**
   - Initial load happens in `JobProvider.useEffect`
   - Can take 1-2 seconds depending on internet

5. **All operations update React state**
   - No need to manually refresh
   - UI updates immediately after API response

---

## 🎯 Common Workflows

### Workflow 1: Add a Job
1. Go to "Add Job" page
2. Fill in Company Name and Job Role
3. Select Status (default: Applied)
4. Set date if different
5. Add notes (optional)
6. Click "Add"
7. Job appears in Dashboard

### Workflow 2: Update Status
1. Click "Edit" on any job card
2. Change status from dropdown
3. Click "Update"
4. Status updates in Dashboard stats

### Workflow 3: Delete Old Jobs
1. Find the job card
2. Click "Delete"
3. Confirm deletion
4. Job removed from all views

### Workflow 4: Track Applications
1. Dashboard shows total count
2. Stats show Applied/Interviewing/Offer/Rejected breakdown
3. Percentages calculated automatically

---

## 💡 Pro Tips

1. **Use Job Link** to quickly access original job posting
2. **Add Notes** with interview dates or contact info
3. **Update Status regularly** to track progress
4. **Use Date field** to see application timeline
5. **Refresh page** if anything looks wrong (for debugging)

---

## 📞 Need Help?

Check these files for reference:
- **API Documentation**: `API_DOCUMENTATION.md`
- **Backend Controllers**: `backend/controllers/jobController.js`
- **Frontend Provider**: `frontend/src/provider/JobProvider.jsx`
- **Reducer Logic**: `frontend/src/reducers/jobReducer.js`


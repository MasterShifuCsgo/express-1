

errors.txt holds error codes

there is no frontend to this application.

# ✅ Application Workflow Test Plan

**All tests should pass.** Use the following checklist to validate user capabilities and permission logic.

---

## 🧪 Base User Workflow (Admin or Creator)

- [ ] 1. **Create an account**  
  - [ ] 🧪 **Test completed**
  
- [ ] 2. **Create a new workspace**  
  - [ ] 🧪 **Test completed**

- [ ] 3. **Create a new project**  
  - [ ] ✅ An **audit log entry** is created for the project  
  - [ ] 🧪 **Test completed**

- [ ] 4. **Create a task in the project**  
  - [ ] ✅ Audit log is recorded  
  - [ ] 🧪 **Test completed**

- [ ] 5. **Add a comment to the task**  
  - [ ] ✅ Audit log is recorded  
  - [ ] 🧪 **Test completed**

- [ ] 6. **Invite a new user to the workspace**  
  - [ ] 🧪 **Test completed**

---

## 🔐 Role-Based Behavior (Regular User)

The newly invited user is assigned the role: `regular`.

- [ ] 7. ✅ **Role is correctly set to** `regular`  
  - [ ] 🧪 **Test completed**

- [ ] 8. ❌ **Cannot invite other users**  
  - [ ] ✅ Access is denied due to role restrictions  
  - [ ] 🧪 **Test completed**

- [ ] 9. ✅ **Can create a new task**  
  - [ ] ✅ Audit log is recorded  
  - [ ] 🧪 **Test completed**

- [ ] 10. ✅ **Can add a comment to a task**  
  - [ ] ✅ Audit log is recorded  
  - [ ] 🧪 **Test completed**

---

## ✅ Test Outcome

> ✔️ **All steps must be tested and confirmed as passing**  
> ❌ Any test failure or missing restriction should be treated as a critical defect.
---

## 🔁 Notes

- Major user actions must generate an **audit trail**, scoped to the project.
- Role-based restrictions must be enforced on the backend — UI should not be trusted.
- Extend this test plan with failure cases, edge scenarios, and invalid input tests if needed.


using:
 sqlite3 express
 express
 supertest for tests
 cross-env for setting env variables on windows


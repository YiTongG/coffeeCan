## Development Progress

| Feature                                     | Status     | Libraries or External APIs Used                                          |
| ------------------------------------------- | ---------- | ------------------------------------------------------- |
| Registration                                | ✅ Completed  | **bcrypt** (password hashing), **Prisma** (database ORM) |
| Login                                       | ✅ Completed  | **bcrypt** (password verification), **JWT** (authentication) |
| Add Post                                    | ✅ Completed  | **OpenCageData API** (geocoding), **Cloudinary** (image upload), **OpenStreetMap** (maps) |
| Post Filter                                 | ✅ Completed  | **MongoDB** (query filtering) |
| Save Post                                   | ✅ Completed  | **MongoDB** (database)      |
| Notify Post Owner When Post is Saved        | ⏳ Pending  | (real-time notifications) |
| Sort by Number of Saves                     | ⏳ Pending  | **MongoDB** (aggregation, sorting) |
             |

## Deployment Progress

| Component           | Status       |
| ------------------- | ------------ |
| React Frontend      | ✅ Deployed on Vercel |
| Backend API         | ✅ Deployed on AWS EC2 [IP `13.59.181.32`](http://13.59.181.32:8800/api/posts), domain `coffeehouse.website` |
| Webhook for GitHub CI/CD | 🔜 Next Step: Implementing |

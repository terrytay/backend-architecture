# Backend Architecture

---

For starters, do consider going to [Microsoft Typescript Node Starter](https://github.com/Microsoft/TypeScript-Node-Starter) first.

This project was created to be able to scaffold backend servers quickly. Clean architecture has been used extensively.
Let me know in the issues if there are things which can be improved on.

Special thanks to [Abhinav](https://www.linkedin.com/in/abhinav-kumar-53475978/) for the guidance and support.

## Getting started

---
- Clone the repository

        git clone https://github.com/terrytay/backend-architecure.git

- Install dependencies
  
        cd <project_name>
        npm install

- Configure your server

    *.env.example* has been left in the directory on purpose for you to replace 
    the variables with your actual server details and other environment variables.

    You can rename *.env.example* to *.env.production* / *.env.dev*

    Add your .env.whatever to file /copy_static_assets.ts and remove unused ones:
        
        shell.cp("-R", ".env.whatever", "dist/");

- Build and run the project

        npm run build && npm run start
        

Take not that package.json is not fully configured for production yet. Use with caution.


## Health Status

---

Often time, we need to check the health status, especially when using in K8s.
This application has health check configured.

```http request
curl -GET http://localhost:3000/health
```

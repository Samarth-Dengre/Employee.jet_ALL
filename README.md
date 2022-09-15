*This project is still in development phase. Kindly open any issues you face in the repo's `Issue` tab                                                       
**This project was developed by Samarth Dengre and - [Vaibhav Jaiswal](https://github.com/thecurious1-sudo) as a prototype for the event 'Code with Globalshala 3.0' and is not fully functional yet.

# Empolyee.Jet

This project is an Employee Engagement Platform. With the help of this project, A company can manage the workload of an employee, give tasks to the employee based on the skillset, take feedback about the project they are working on and about the team members, will improve the workplace experience by boosting employee morale, productivity, and company alignment

## Try it on your machine
This repository contains two sub projects. 
1)`Employee.jet_USER`
2)`Employee.jet_ADMIN`
`Employee.jet_USER` contains the server for employees of the organization. It runs on port 3000.
`Employee.jet_ADMIN `contains the server for admin of the organization. It runs on port 4000.

In each of these folders, install the required dependencies by running
```bash
  npm install 
```
and it will install all the required modules under `package.json`

Firstly you need to run `Employe.jet_ADMIN` server and run the index file present in `seeds` folder.
Simply execute these commands in the ADMIN server
```bash
  cd seeds
  node index.js
```
and then a Sample data will be seeded in your database. Now you are good to run both of the servers.
Make sure your Mongo server is running.
To use the website, run the below command in both `Employee.Jet_USER` and `Employee.Jet Admin`
```bash
node index.js
```
Now open any browser and type `localhost:4000` to run Admin server and `localhost:3000` to run employee server.

## Videos
There are 2 videos under `videos` folder which will demonstrate the basic usage of these 2 servers.


## Screenshots

- [Admin View Of All Employees](https://asset.cloudinary.com/dodw1eaic/025db36858ecb4fdaddfece9ad83f98f)
- [Admin View Of All Projects](https://asset.cloudinary.com/dodw1eaic/386ee8d24ac06928dda2a9839c30365b)
- [Admin View Of Feedbacks](https://asset.cloudinary.com/dodw1eaic/ab15a71391c809ecc948671437664c1d)
- [Employee View Of Their Project ToDo List](https://asset.cloudinary.com/dodw1eaic/12cfef960fedf7ba6f093e4876ba469b)
- [Employee View Of Their Private ToDo List](https://asset.cloudinary.com/dodw1eaic/b4dcbe186b86ed4ac0c8ff05efd14022)
- [Employee View Of Their Team](https://asset.cloudinary.com/dodw1eaic/28cbc29fbe10f1e18368b7d29f3b0d6d)
- [Employee View Of Feedbacks](https://asset.cloudinary.com/dodw1eaic/82db4733a3685178d2d2251a72540488)
- [Employee View Of Filling Feedbacks](https://asset.cloudinary.com/dodw1eaic/228d69fc28828a2523e3f5445b6364d3)
- [Supervisor View Of Their Team](https://asset.cloudinary.com/dodw1eaic/25ae921f65ab491dd9465b8dfb4717de)
- [Supervisor View Of Others Project ToDO List](https://asset.cloudinary.com/dodw1eaic/72fbe476b563856c05528b098de1d7cf)


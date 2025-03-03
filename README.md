# COE64-224-MiniProject
## Mini Project for COE 64-224

### Group Members:
1. **Audsadawut Nakthungtao**
2. **Tanapat Khatrattana**

### Project Description:
This project is a mini smart farm system that can monitor the temperature, humidity, and soil moisture of the farm. The system will send the data to the server and the user can view the data on the website. The user can also control the water pump and the fan on the farm.

### How to run the project:
1. Clone the repository
2. CD into the directory
```bash
cd mini-smart-farm
```
3. Install the required packages
```bash
npm install
```
4. Set up the environment variables
5. After setting up the environment variables, run the project
```bash
npx auth secret
npx prisma generate
npx prisma migrate dev --name init
```
6. Run test the project
```bash
npm run dev
```
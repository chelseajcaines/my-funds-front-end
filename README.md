# MonieJar 💵 💵 💵

## <a href="https://moniejar.com/" style="text-decoration: none; color: #8562EF;">VIEW HERE!</a>

### Description

MonieJar is a personal finance tracking application where the user can create an account and enter their budget goals and expenses, which are displayed as cards and lists. Users are then able to edit or delete these budgets or expenses to their desire. This repository is specifically the front end of the project. The front end is built with a react template from MUI and deployed using AWS Amplify. The backend was built with JavaScript, Node.Js, SQL and deployed using Elastic Beanstalk, EC2, Aurora and RDS, and Route53, all from the AWS Console.

#### Some features include:

📝 User Registration/Account Creation - Using email and a password of at least 6 characters.<br/>
🚫 Error Handling - User is prompted when logging in with wrong login credintials.<br/>
⌨️ Reset Password - User is able to receive a reset password email when they forget their password.<br/>
🚪 Automatic Logout - When the broswer is open for an hour, the user is automatically logged out for security.<br/>
💰 Budget Goals - Users can enter budget goals, indicating a timeline for each goal and a date for when the budget was first entered. Users can edit and delete these goals.<br/>
🛍️ Expenses - Users can enter a expense including details such as item name, location purchased, amount, and date purchased. Users can edit and delete these expenses.<br/>

### Motivation

The first project I built was also a personal finance tracking application, which only included data entry for budgets, expenses, income, and savings goals. You can visit that project <a href="https://chelseajcaines.github.io/MyFunds/">here</a>. For this project I wanted to revisit the idea and give it a backend. The backend includes user authentication, data storage and organization in a database, and testing.

<hr/>

### Built with

<br/>
<span><img src="https://img.favpng.com/24/2/12/js-icon-logo-icon-react-icon-png-favpng-V4GKq1D3n3V713pYyrHeAERdm.jpg" alt="react" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://icon.icepanel.io/Technology/svg/Material-UI.svg" alt="MUI" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://1000logos.net/wp-content/uploads/2020/09/JavaScript-Logo-640x400.png" alt="javascript" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://cdn.freebiesupply.com/logos/large/2x/nodejs-icon-logo-png-transparent.png" alt="node" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://gimgs2.nohat.cc/thumb/f/640/sql-logo-illustration-microsoft-azure-sql-database-microsoft-sql-server-database-blue-text-logo-png--compngwingzoupl.jpg" alt="sql" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/768px-Amazon_Web_Services_Logo.svg.png?20170912170050" alt="aws" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://cloud-icons.onemodel.app/aws/Architecture-Service-Icons_01312023/Arch_Front-End-Web-Mobile/64/Arch_AWS-Amplify_64.svg" alt="amplify" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://cdn.worldvectorlogo.com/logos/aws-elastic-beanstalk-1.svg" alt="elasticbeanstalk" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://www.clipartmax.com/png/middle/464-4644561_by-saralex-aws-ec2-logo-png.png" alt="ec2" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/1/aws-rds-5qblz3nvfjmipvbykjpba.png/aws-rds-o6rtmustsgv3emnpozj4.png?_a=DATAg1AAZAA0" alt="rds" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/1/aws-route53-p3t47q0lx2lq1srdr8hx.png/aws-route53-fk4qtcwyolq0zlrfn93s8i.png?_a=DATAg1AAZAA0" alt="route53" height="40" width="40" style="max-width: 100%;"/></span>

<hr/>

### How to use

The home page is where the user can login or create an account if they dont already have one.

<img width="362" height="585" alt="login" src="https://github.com/user-attachments/assets/a0074021-5c71-4443-943f-53d6439c2c17" /><img width="332" height="485" alt="signup" src="https://github.com/user-attachments/assets/3476a693-37ec-43c2-a3d7-5a32e42173cd" />
<br/>
<hr/>

If the user forgot their password or would like to change it, they can do so by clicking 'Forgot Passowrd' on the home page and will then be emailed a link to reset their password.

<img width="322" height="585" alt="forgotpassword" src="https://github.com/user-attachments/assets/11e0d0d4-f023-4d65-8a40-4c4ca831c089" /><img width="322" height="360" alt="emaillink" src="https://github.com/user-attachments/assets/37338780-3bb1-46aa-b244-24100207a476" /><img width="322" height="631" alt="resetpassword" src="https://github.com/user-attachments/assets/e2bd769b-659a-470e-a9e2-bfa181a74e60" />
<br/>
<hr/>

Once the user is logged in, they can now enter their budgets and expenses.

<hr/>

Simply click the plus button to pull up a model to enter your budget information.

<img width="800" height="522" alt="image" src="https://github.com/user-attachments/assets/983b5b22-2314-4ecd-b61d-1c868c71f188" />

<hr/>

Once information is entered, click submit to save.

<img width="400" height="500" alt="image" src="https://github.com/user-attachments/assets/7c3a64af-3230-4fdf-8c9f-be4f811f9976" />

<hr/>

Budget is then displayed and can be edited or deleted by the clicking the three dot menu.

<img width="800" height="522" alt="image" src="https://github.com/user-attachments/assets/b125f9ba-c08c-4f46-8c08-fab2e4e4719e" />

<br/>
<hr/>

For expenses, it's just the same process.

Simply click the plus button to pull up a model to enter your expense information.

<img width="800" height="522" alt="image" src="https://github.com/user-attachments/assets/f913def4-9735-4c1d-aad7-4516a8e44fab" />

<hr/>

Once information is entered, click submit to save.

<img width="400" height="500" alt="image" src="https://github.com/user-attachments/assets/6edeb593-c2bd-4498-a5cb-c9ab2fea18ba" />

<hr/>

Expense is then displayed and can be edited or deleted by the clicking the pencil or trash can.

<img width="800" height="522" alt="image" src="https://github.com/user-attachments/assets/63942e52-a463-4794-8ba1-24f02100f572" />

<hr/>

Thank-you so much for reading! Hope you enjoy the app!

<hr/>

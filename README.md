# LinkHop

This site allows users to create custom shortened URLs, similar to bitly. Custom links can accessed at linkhop.com/*custom-link-name* !

## Developer Instructions
This website is not accessible to the public. However, developers should feel free to clone this repository and host it themselves if they desire. There are only a couple of steps required to do so:

### 1. Install Dependencies
In the project directory, open your terminal and execute the following command:\
<code>npm install</code>

### 2. Deploy MongoDB Atlas Database
* Visit [this link](https://www.mongodb.com/products/platform/atlas-database) and deploy a database cluster for free.
* View your cluster and select "Connect".
* In "Choose a connection method", click "Add Current IP Address" if prompted. Then, select "Drivers".
* In "Connect", select Node.js version 5.5 or later. Then, copy your connection string.

### 3. Connect to Database
* Create a file called *.env* in the project directory. 
* In *.env*, create a variable called *ATLAS_URI* and assign to it the connection string for your database:\
<code>ATLAS_URI=*connection_string*</code>

If you followed these instructions, you should be able to access your own LinkHop website through *localhost:3000* !

## Known Issues
* The "information" modal is incomplete.

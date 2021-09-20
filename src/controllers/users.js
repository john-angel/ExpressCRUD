const Users = require('./../models/users')

// Use class or functions
function helloWorld(req, res) {
    const userDB = new Users({
        name: 'EndavaUser',
        age: 18,
        password: '123456'
    })
    try {
        userDB.save( (err, user) => {
            if(err) throw Error(err);
            console.log('user created');
            return res.status(200).json({
                status: 200,
                response: user
            })
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

async function getUsers(req, res){
    const users = await Users.find({})
    console.log('Users:', users);
    res.status(200).send({ description:'Users',body:users});
}

async function getUser(req, res){
 
    try {
        const user = await Users.findById(req.params.id).exec();
        
        if(user === null){
            console.log(`User with id ${req.params.id} not found`);
            throw('')
        }
        
        console.log(`User with id ${req.params.id} found: ${user}`);
        res.status(200).send({ description:'User',body:user});
                
    } catch (error) {
        console.log(`User with id ${req.params.id} not found. Error: ${error}`);
        res.sendStatus(404);        
    }     
}

async function addUser(req, res){
 
    try {

        const user = new Users(req.body);       

        const newUser = await user.save();

        if(user === newUser){
            console.log(`User ${JSON.stringify(req.body)} created`);
            res.status(201).send({ description:'User created',body:req.body});
        }else{
            throw('User returned by save not equal to the user created');
        }
    } catch (error) {
        console.log(`Error creating user ${req.body}. Error: ${error}`);
        res.sendStatus(500);        
    }     
}

async function editUser(req, res){

    /*
    query in the body has to follow the format:
    { 
        "filter":{
            "key": "value"
        },
        "data":{
            "key1": "value1",
            "key2": "value2",
        .
        .
        .
        }
    }   
    
    */
 
    try {

        console.log(`User ${JSON.stringify(req.body)} to update`);

        const filter = req.body.filter;
        const update = req.body.data;
        
        const user = await Users.findOneAndUpdate(filter,update, {new:true});  
        
        console.log(`${user}  updated`);    
        res.sendStatus(200);
       
    } catch (error) {
        console.log(`Error updating ${req.body.filter} with ${JSON.stringify(req.body.data)}. Error: ${error}`);
        res.sendStatus(204);
    } 
}

async function deleteUser(req, res) {

  try {

      await Users.deleteOne(req.body);

      console.log(`User with ${JSON.stringify(req.body)} deleted`);
      res.sendStatus(200);

    } catch (error) {
        console.log(`Error deleting user with ${req.body}. Error: ${error}`);
        res.sendStatus(404);
    }
}
    



module.exports = { getUsers, getUser, addUser, editUser, deleteUser }
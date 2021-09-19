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





module.exports = { getUsers, getUser, addUser }
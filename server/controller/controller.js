var Userdb = require('../model/model')

//create and save new users
exports.create = (req,res)=>{
    //validate req
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    //new user
    const user = new Userdb({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        department:req.body.department
    })

    //saving data in db
    user
        .save(user)
        .then(data => {
            //res.send(data) //returns the data to user
            res.redirect('/add-user')
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Error occured during creation."
            });
        });

}

//retrive and return all users
exports.find = (req, res) => {
    if (req.query.ids) {
        const ids = req.query.ids;
        Userdb.findById(ids)  // Fix: Use ids instead of id
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id" + ids });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error while getting user with id: " + ids });
            });
    } else {
        Userdb.find()
            .then(users => {
                res.send(users);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurred during retrieving information." });
            })
    }
}


//update a new identified user by user id
exports.update= (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Error during updation of records."})
    }

    const ids = req.params.ids;
    Userdb.findByIdAndUpdate(ids,req.body,{useFindAndModify: false})
    .then(data =>{
        if(!data){
            res.status(404).send({message: `Cannot update user ${ids}`})
        }
        else{
            res.send(data);
        }
    })
    .catch(err =>{
        res.status(500).send({message:"Error while updating."})
    })
}

//delete user with user id
exports.delete = (req,res)=>{
    const ids = req.params.ids;
    Userdb.findByIdAndDelete(ids)
        .then(data =>{
            if (!data){
                res.status(404).send({message: `Cannot delete ${ids}.Check the ID again.`})
            }else{
                res.send({message:"User has been deleted"
            })
            }  

        })
        .catch(err=>{
            res.status(500).send({message: "Could not delete user."
        });
        });
}

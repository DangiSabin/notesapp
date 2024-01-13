const crypto = require("crypto");
let users = [
    {
        id: "665a0c68d8f1786cbfb06e6f7eb596ba",
        username:'janeDoe',
        password:'1234567890'
    },
    {
        id: "db0754cf2281bcdffe4dce1b68c6a215",
        username:'johnDoe',
        password:'1234567890'
    },
    {
        id: "db0754cf2281bcdffe4dce1b68c6a216",
        username:'deepti',
        password:'deepti123'
    }
]
exports.login = (req, res)=>{
    let found = false
    users.forEach(user=>{
        if(req.body.username === user.username && req.body.password === user.password){
            found = true
            res.status(200).json(user)
        } 
    })
    if(!found){
        res.status(500).json('username or password was incorrect')
    }
}

exports.register = (req, res)=>{
    let newUser = {
        id: crypto.randomBytes(16).toString("hex"),
        username: req.body.username,
        password: req.body.password
    }
    users.push(newUser)
    res.status(200).json(users)
}
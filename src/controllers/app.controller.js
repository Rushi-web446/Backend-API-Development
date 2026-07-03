const User = require("../models/user");
const UserConn = require("../models/user_conn");
const Deli = require("../models/deli");

exports.createUser = async (req, res) => {
    console.log("***********");
    try {
        const {name, email} = req.body;
        if (!name || !email) {
            return res.status(400).json({message:"name and email are required"});
        }
    
        const isExist = await User.findOne({email});
        if (isExist) {
            return res.status(409).json({message:"A user with this email already Exist"});
        }

        const result = await User.create({name, email});
        if (!result) {
            return res.status(500).json({message:"User creation failed please try again"});
        }

        res.status(201).json({data:result});

    } catch(err) {
        return res.status(500).json({message:"Something went wrong, please try again"});
    }

};


exports.handleConnect = async (req, res) => {
    try {
        const fromUserId = req.headers['current_user_id'];
        const toUserId = req.body;
        if (!toUserId) {
            return res.status(400).json({message:"to user id is required"});
        }

        const isEF = await User.findById({fromUserId});
        if (!isEF) {
            return res.status(400).json({message:"A user cannot connect with themselves"});
        }

        const isET = await User.findById({toUserId});
        if (!isET) {
            return res.status(404).json({message:"No user found with id u2"});
        }

        const isEA = await UserConn.findOne({
            from:fromUserId,
            to:toUserId
        });

        if (isEA) {
            return res.status(409).json({message:"These users are already connected"});
        }
        const status = "Pending";
        const result = await UserConn.create({fromUserId, toUserId, status});

        res.status(201).json({result});

    } catch(err) {
        return res.status(500).json({message:"Something went wrong, please try again"});
    }


};


exports.handleConnectRespond = async (req, res) => {
    try {
        const myId = req.headers['current_user_id'];
        const {oId, action} = req.body;

        if (!oId || !action) {
            return res.status(400).json("connectionId and action are required");
        }

        if (!(action == "ACCEPT" || action == "REJECT")) {
            return res.status(400).json("action must be either ACCEPT or REJECT");
        }

        const dbR = await UserConn.findOne({
            to:myId, from:oId, status:"Pending"
        });

        if (!dbR) {
            return res.status(400).json({"error": "INVALID_STATUS", "message": "Only pending connection requests can be responded to"});
        }

        const result = await UserConn.updateOne({status:action});

        res.status(200).json({result});
    } catch(err) {
        return res.status(500).json({message:"Something went wrong, please try again"});
    }
};



exports.handleRates = async (req, res) => {
    try {
        const myId = req.headers['current_user_id'];
        let obj = req.body;

        obj.add("userId", myId);

        const result = await Deli.create({obj});

        res.status(201).json({"success": true, "message": "Rate created successfully"});

    } catch(err) {
        return res.status(500).json({message:"Something went wrong, please try again"});
    }
};


// function isDirectRouteExist(fromLocation, toLocation) {
//     const isC = await UserConn.findOne({$or:[
//         {to:myId, from:tuId},
//         {to:tuId, from:myId}
//     ]});
    
//     return isC;
    
// }

// exports.handleSearch = async (req, res) => {
//     try {
//         const myId = req.headers['current_user_id'];
//         const {fromLocation, toLocation, date} = req.body;
        
        
//         let allRoutes = {};
//         let myAllCon = {};
        
//         const directRoutes = await find({fromLocation:fromLocation, toLocation:toLocation});
//         for (let curr in directRoutes) {
//             if (curr.userId == myId) continue;
//             if (curr.Type == "BUY") continue;
            
//             const tuId = curr.userId;
//             if (isC) {
//                 const result = {
//                 "fromLocation": fromLocation,
//                 "toLocation": toLocation,
//                 "via": null,
//                 "price": curr.price,
//                 "currency": "USD",
//                 "transitDays": curr.transitDays
//                 }
//                 myAllCon.append(curr.userId);
//             }
            

//         }


//     } catch(err) {
//         return res.status(500).json({message:"Something went wrong, please try again"});
//     }
// };

function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action",
      });
    } else {
      next();
    }
  
  }
  

  
// must be admin to add products to inventory, edit items, delete items, view all users


//   function requireAdmin(req, res, next) {
//       if (!req.admin) {
//           next({
//               name: "AdminError",
//               message: "Must be Admin to perform this action"
//           })
//       }
//   }
 

  module.exports = {
    requireUser
    //requireAdmin
  };
  


const currentUser = async (req, res) => {
     res.json({
       user: {
         email: req.user.email,
         subscription: req.user.subscription,
       },
     });
};

module.exports = currentUser;

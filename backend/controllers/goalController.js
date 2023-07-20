
const getGoals = (req,res) =>{
    res.status(200).json({messsage: 'getting goals'})
};

const setGoals = (req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field');
    }
    res.status(200).json({messsage: 'setting goals'})
};
const updateGoals = (req,res) =>{
    res.status(200).json({messsage: `updatting goals ${req.params.id}`})
};

const deleteGoals = (req,res) =>{
    res.status(200).json({messsage: `deleting goals ${req.params.id}`})
};



module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}
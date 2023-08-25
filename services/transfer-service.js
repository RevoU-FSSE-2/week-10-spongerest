

const getAllTransactions = async (req,res,next) => {
    try{
        const transactions = await req.db.collection('transactions').find().toArray()

        res.status(200).json({
            message : 'Transactions Successfully Retrieved',
            data : transactions
        })
    }catch(error){
        res.status(500).json({
            error : error.message
        })
    }
}

const createTransactions = async (req,res) => {
    const { type,author } = req.body

    try{
        const newTransaction = await req.db.collection('transactions').insertOne({ type,author, status:'Pending' })

        res.status(200).json({
            message:'Transaction Successfully Created',
            data : newTransaction
        })
    }catch (error){
        res.status(500).json({error : error.message})
    }
}

const approveTransfer = async (req, res) => {
    try {
        const { transferId } = req.params; 
        const trf = await req.db.collection('transactions').findById({ transferId })

        // const transfer = await req.db.findById(trf);

        if (!transfer) {
            return res.status(404).send({ message: 'Transfer request not found.' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'Only approvers or admins can approve transfers.' });
        }

        transfer.status = 'approved';
        await transfer.save();

        res.send({ message: 'Transfer approved successfully', transfer });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { getAllTransactions,createTransactions,approveTransfer}
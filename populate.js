const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Success!!!!');
        process.exit(0);
    } catch (error) { res.status(500).json({msg: error}) }
}
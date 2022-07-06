const http = require('http2');
const app = require('./src/app');
const User = require('./src/components/user/userModel');
const { connectToDatabase } = require('./src/database/dbConnect');

const PORT = process.env.PORT;

const server = http.createServer(app);

const startServer = async () => {
    try {
        await connectToDatabase();
        await User.sync();
        server.listen(PORT, () => console.log(`Server is listening ${PORT}`));
    } catch (error) {
        console.log('Server start failed: ', error);
    }
};

startServer();

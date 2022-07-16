const http = require('http');
const { connectToDb } = require('./src/database/dbConnect');
const app = require('./src/app');
const User = require('./src/components/user/userModel');
const Exercise = require('./src/components/exercise/exerciseModel');

const PORT = process.env.PORT;

const server = http.createServer(app);

const startServer = async () => {
    try {
        await connectToDb();
        await User.sync();
        await Exercise.sync();

        server.listen(PORT, () =>
            console.log(`Server is listening on PORT: ${PORT}`)
        );
    } catch (error) {
        console.log('Server start failed: ', error);
        process.exit(1);
    }
};

startServer();

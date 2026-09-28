import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
	} catch (error) {
		console.error(`Error: ${error.message}`);
	}
};

export default connectDB;
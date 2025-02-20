import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_DB; 

if (!MONGODB_URI) {
  throw new Error('Defina a variável MONGODB_URI no .env.local');
}


const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado ao MongoDB");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
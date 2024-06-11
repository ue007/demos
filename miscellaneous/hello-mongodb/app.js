const { MongoClient } = require('mongodb');

// MongoDB 连接信息
const mongoUrl = 'mongodb://localhost:27017'; // MongoDB 地址和端口
const dbName = 'mydatabase'; // 数据库名称
const collectionName = 'mycollection'; // 集合名称
const username = ''; // MongoDB 用户名
const password = ''; // MongoDB 密码

// 创建 MongoDB 客户端
const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectAndPerformOperations() {
    try {
        // 连接 MongoDB
        await client.connect();

        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 插入文档
        await collection.insertOne({ name: 'John', age: 30 });

        console.log('Inserted document into collection');

        // 查询文档
        const documents = await collection.find({}).toArray();

        console.log('Documents in collection:');
        console.log(documents);

        // 更新文档
        await collection.updateOne({ name: 'John' }, { $set: { age: 35 } });

        console.log('Updated document');

        // 再次查询文档
        const updatedDocuments = await collection.find({}).toArray();

        console.log('Updated documents in collection:');
        console.log(updatedDocuments);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // 关闭连接
        await client.close();
        console.log('Closed MongoDB connection');
    }
}

// 连接 MongoDB 并执行操作
connectAndPerformOperations();

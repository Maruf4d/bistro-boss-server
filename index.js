const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');


// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.95vfcnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const menuCollection = client.db("bistroDb").collection("menu");
    const reviewCollection = client.db("bistroDb").collection("reviews");
    const cartCollection = client.db("bistroDb").collection("carts");


    app.get('/menu' ,  async(req , res) =>{
        const result = await menuCollection.find().toArray();
        res.send(result)
    });

    app.get('/reviews' ,  async(req , res) =>{
        const result = await reviewCollection.find().toArray();
        res.send(result)
    });

    // Carts Collection
    app.get('/carts' , async(req , res)=>{
      const result = await cartCollection.find().toArray();
      res.send(result)
    })

    app.post('/carts', async(req , res)=>{
      const cartItem = req.body
      const result = await cartCollection.insertOne(cartItem)
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/' , (req , res) => {
    res.send('boss is Angry')
});

app.listen(port , () => {
    console.log(`boss is Angry ${port}`);
})

const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000



console.log(process.env.DB_USERS)
console.log(process.env.DB_PASS)

app.use(cors())
app.use(express.json());



app.get('/', (req, res) => {
  res.send(' Bullet server !')
})


////////////mongoDB/////


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.ruz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
     
    const gunsCollection = client.db('bulletDB').collection('bulletData')
    const gunsProductsCollection = client.db('gunsDB').collection('gunsData')

    //crud///

     //products line data//
     app.get('/bulletData',  async(req, res) => {
        
        const cursor = gunsCollection.find() 
        const result = await cursor.toArray()
        res.send(result);


      })
     //products line data// 


     //gunsProductsData//
     app.get('/gunsData',  async(req, res) => {
        
        const cursor = gunsProductsCollection.find() 
        const result = await cursor.toArray()
        res.send(result);

      })
    //gunsProductsData//  

    //gunsProductsData:ID//  

    app.get('/gunsData/:id',  async(req, res) => {
      
        const id = req.params.id 
        const query = { _id: new ObjectId(id) }
        const result = await gunsProductsCollection.findOne(query)
        res.send(result)
 
   })
  
   //gunsProductsData:ID//  


    //crud///



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





////////////mongoDB/////


app.listen(port, () => {
  console.log(`Bullet server port ${port}`)
})


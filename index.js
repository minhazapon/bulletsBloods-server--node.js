
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
    
   const addCollection = client.db('exprerienceDB').collection('exprerienceData')

   ///itemsCrud//////


   
   ///add////

    
   app.post('/addData',  async(req, res) => {
      
     const addData = req.body 
     console.log(addData) 
     const result = await addCollection.insertOne(addData)
     res.send(result)

  })
   ///add////


   ///read////
  
   app.get('/addData',  async(req, res) => {
      
       const cursor = addCollection.find() 
       const result = await cursor.toArray() 
       res.send(result)
   })
 

   ///read////


   //delete//
     
   app.delete('/addData/:id',  async(req, res) => {
      
       const id = req.params.id 
       const query = { _id: new ObjectId(id)}
       const result = await addCollection.deleteOne(query)
       res.send(result)

   })

   //delete//


 
   //update//


   app.get('/addData/:id',  async(req, res) => {
      
    const id = req.params.id 
    const query = { _id: new ObjectId(id)}
    const result = await addCollection.findOne(query)
    res.send(result)

   })


   app.put('/addData/:id',  async(req, res) => {
      
   
       const id = req.params.id 
       const UpdateUser = req.body 
       console.log(id, UpdateUser) 
       const filter = { _id: new ObjectId(id) }
       const option = { upsert: true } 
       const upDtUsr = req.body 
       const gunZ = {

          $set:{

             name:  upDtUsr.name, 
             price:  upDtUsr.price, 
             brand:  upDtUsr.brand, 
             photourl:  upDtUsr.photourl, 
             category:  upDtUsr.category, 
             description:  upDtUsr.description
          
 
          }


       }

       const result = await addCollection.updateOne(filter, gunZ, option)
       res.send(result)
   })






   //update//








   ///itemsCrud//////

  


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


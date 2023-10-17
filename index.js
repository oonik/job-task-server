const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bwrtzwz.mongodb.net/?retryWrites=true&w=majority`;

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
    const partnerCollection = client.db("csaPartners").collection("partners");

    app.get('/partners', async(req, res)=> {
        const query = {};
        const result = await partnerCollection.find(query).toArray();
        res.send(result);
    });

    app.get('/service/:id', async(req, res)=> {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await partnerCollection.findOne(filter);
        res.send(result);
    });

    app.get('/recomanded', async(req, res)=> {
        const query = {};
        const result = await partnerCollection.find(query).limit(3).toArray();
        res.send(result);
    })
    
  } finally {
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('job task server is running')
  });

app.listen(port, () => {
    console.log(`job task app listening on port ${port}`)
  })  
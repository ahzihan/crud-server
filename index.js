const express = require( 'express' );
const { MongoClient, ServerApiVersion, ObjectId } = require( 'mongodb' );
const cors = require( 'cors' );
const app = express();
const port = process.env.PORT || 5000;

app.use( cors() );
require( 'dotenv' ).config();
app.use( express.json() );

app.get( '/', ( req, res ) => {
    res.send( 'CRUD Operation is Running' );
} );

const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.b4jezta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } );



async function run() {
    try {
        await client.connect();
        const productCollection = client.db( "simpleCRUDoperation" ).collection( "products" );

        //View All Product GET 
        app.get( '/allproduct', async ( req, res ) => {
            const query = {};
            const cursor = productCollection.find( query );
            const products = await cursor.toArray();
            res.send( products );
        } );


        //Create Product POST
        app.post( '/addproduct', async ( req, res ) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne( newProduct );
            res.send( result );
        } );

        //Delete Product
        app.delete( '/allproduct/:id', async ( req, res ) => {
            const id = req.params.id;
            const query = { _id: ObjectId( id ) };
            const item = await productCollection.deleteOne( query );
            res.send( item );
        } );

    }
    finally {

    }
}
run().catch( console.dir );

app.listen( port, () => {
    console.log( 'CRUD Operation is Running Port: ', port );
} );


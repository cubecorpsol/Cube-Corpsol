import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );

  try {

    await client.connect();

    const db = client.db("cubecorpsol");

    const collection = db.collection("enquiries");

    const enquiries = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(enquiries);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
}
import express from 'express';
import morgan from 'morgan';
import { MongoClient, ObjectId } from 'mongodb';

process.loadEnvFile();
const host = process.env.HOST;
const port = process.env.PORT;
const client = new MongoClient(process.env.MONGODB_URI);
let db;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('combined'));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', function (req, res) {
  res.send('Hello !');
});

app.get('/home', function (req, res) {
  res.render('home');
  // res.send('Maison :-)');
});

app.get('/add', function (req, res) {
  res.render('add');
});

app.get('/remove', function (req, res) {
  res.render('remove');
});

app.get('/user/:uid', function (req, res) {
  res.render('user', { uid: req.params.uid });
});


app.get('/contacts', async function (req, res) {
  const contacts = await db.collection('contacts').find().toArray();
  console.log(contacts);
  res.render('contacts', { contacts });
  /*
  let tmp = '';
  contacts.forEach(contact => {
    tmp += `Nom : ${contact.name}, Age : ${contact.age}, Id : ${contact._id}<br>`;
  });
  res.send(tmp);*/
});





// get a contact by ObjectId
app.get('/contacts/:id', async function (req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid contact id');
  }

  const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
  if (contact) {
    // res.json(contact);
    // console.log("CONTACT FOUND:", contact);
    res.render('contact', { id: contact._id, name: contact.name, age: contact.age });
  } else {
    res.status(404).send('Contact not found');
  }
});

app.post('/contacts/add', async function (req, res) {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).send('Name and age are required');
  }
  console.log(`Adding contact: ${name}, ${age}`);
  console.log('Contacts collection:', db.collection('contacts'));
  const result = await db.collection('contacts').insertOne({ name, age });
  console.log('Result of insertOne:', result.insertedId);
  //res.redirect(`/contacts/${result.insertedId}`);
  res.redirect(`/contacts`);

});

app.post('/contacts/delete', async function (req, res) {
  const { id } = req.body;
  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send('Invalid contact id');
  }
  console.log(`Deleting contact with id: ${id}`);
  const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 1) {
    res.redirect(`/contacts`);
    //res.send(`Contact with id ${id} deleted`);
  } else {
    res.status(404).send('Contact not found');
  }
});


app.use(function (req, res) {
  res.status(404).send('Page introuvable !');
});

// On peut également retourner n'importe quel objet sous une forme json avec res.json() 
// où res est une Response

// Pour gérer du contenu json au sein d'express il suffit d'ajouter app.use(express.json());

async function start() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Impossible de se connecter à MongoDB:', error);
    process.exitCode = 1;
  }
}

start();

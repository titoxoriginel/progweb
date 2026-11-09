import { Router } from 'express';
// update
import { getAllContacts, getContactById, updateContact, removeContact, addContact } from '../controllers/contactController.js';

const router = Router();

router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API is Working',
        message: 'Welcome!',
    });
});

//update
/**
 * @openapi
 * /contacts:
 *   get:
 *     description: All contacts
 *     responses:
 *       '200':
 *         description: Returns all the contacts
 */
router.route('/contacts').get(async (req, res) => {
    let response = await getAllContacts();
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

// get a contact by id
router.route('/contacts/:id').get(async (req, res) => {
    let response = await getContactById(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

// add a contact with POST
router.route('/contacts').post(async (req, res) => {
    let response = await addContact(req.body);
    console.log(req.body);
    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(400).json(response);
    }
});

// 
router.route('/contacts/:id').put(async (req, res) => {
    let response = await updateContact(req.params.id, req.body.name, req.body.age);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.route('/contacts/:id').delete(async (req, res) =>{
    let response = await removeContact(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
})

    export default router;
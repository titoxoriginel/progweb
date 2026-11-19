import { Router } from 'express';
// update
import { getAllContacts, getContactById, updateContact, removeContact, addContact } from '../controllers/contactController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { registrerUser, loginUser } from '../controllers/authController.js';
const router = Router();

//update
router.use('/contacts', requireAuth);
// si pas de use alors 
// router.route('/contacts').get(requireAuth, async (req, res) => {


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

router.route('/auth/login').post(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    let response = await loginUser(email, password);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(401).json(response);
    }
});

router.route('/auth/register').post(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    let response = await registrerUser(email, password);
    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(400).json(response);
    }
});

    export default router;
import Contact from '../models/contactModel.js';

// Get all contacts
export async function getAllContacts() {
    let total = await Contact.countDocuments({});
    let limit = parseInt(total);

    try {
        const contacts = await Contact.find().limit(limit);
        return {
            success: true,
            data: contacts,
            total: total.toString(),
        }
    } catch (err) {
        return { success: false, message: "Contacts not found " + err };
    }
}

// Get contact by Id
export async function getContactById(id) {
  let total = await Contact.countDocuments({});
  let limit = parseInt(total);

  try {
      const contact = await Contact.findById(id).limit(limit);
      return {
          success: true,
          data: contact,
          total: total.toString(),
      }
  } catch (err) {
      return { success: false, message: "Contact not found " + err };
  }
}

// Add a new contact, returns the added contact
export async function addContact(body) {
  let total = await Contact.countDocuments({});
  let limit = parseInt(total);

  try {
      const contact = await Contact.create(body);
      return {
          success: true,
          data: contact,
          total: total.toString(),
      }
  } catch (err) {
      return { success: false, message: "Contact not added " + err };
  }
}
 
// Update an existing contact
export async function updateContact(id, name = null, age = null) {
   let total = await Contact.countDocuments({});  
   let limit = parseInt(total);

   try{
    const contatct = await Contact.findByIdAndUpdate(id, { name, age }, { new: true });
    return {
        success: true,
        data: contatct,
        total: total.toString(),
    }
    }   catch (err) {
    return { success: false, message: "Contact not updated " + err };
   }
}
    
// Remove an existing contact
export async function removeContact(id) {
  let total = await Contact.countDocuments({});
  let limit = parseInt(total);
  try{ 
    const contact = await Contact.findByIdAndDelete(id);
    return {
        success: true,
        data: contact,
        total: total.toString(),
    }
    }   catch (err) {
    return { success: false, message: "Contact not removed " + err };
  }
}

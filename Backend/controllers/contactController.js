import Contact from "../models/Contact.js";

// Submit Contact Message : /api/contact/submit
export const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.json({ success: false, message: "All fields are required" });
        }

        await Contact.create({ name, email, subject, message });

        res.json({ success: true, message: "Your message has been sent successfully!" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

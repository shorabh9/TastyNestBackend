import { Router } from "express";
import { User } from "../mongoose/schemas/UserSchema.mjs";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';
import { hashPassword } from '../utils/passwordEncryptor.mjs';

let router = Router();

router.get('/registeruser', async (req, res) => {
    try {
        let allUser = await User.find();
        res.status(200).send(allUser);
        
    } catch (error) {
        console.log('Error getting users', error);
    }
})

router.post('/registeruser',
    checkSchema(createUserValidationSchema),
    async (req, res) => {
        

        let errors = validationResult(req);
       
        if(!errors.isEmpty()) {
            return res.status(400).send(`Enter correct `)
        }
        let validatedData = matchedData(req);  // Extract validated data
        validatedData.password = hashPassword(validatedData.password); // Corrected assignment

        try {
            let newUser = new User(validatedData); // Create new User instance
            let savedUser = await newUser.save(); // Save user to DB
           
            return res.status(201).json(savedUser); // Send saved user as response
        } catch (error) {
            
            return res.status(500).json({ message: error.message });
        }
    }
)

export default router;
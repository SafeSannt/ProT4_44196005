import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router()

router.get('/libros', libro.getAll);
router.get('/libro/:id', libro.getOne);
router.post('/libroAdd', libro.add);
router.delete('/libroDelete', libro.delete);
router.put('/libroUpdate', libro.update);

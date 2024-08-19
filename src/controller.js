import {pool} from './database.js';

class LibrosController {
    // Función para obtener todos los libros
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({ "error": "Error al obtener los libros", "detalle": error.message });
        }
    }

    // Función para agregar un nuevo libro
    async add(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, anioPublicacion, ISBN) VALUES (?,?,?,?,?)`, 
                [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.ISBN]);
            res.json({ "Id insertado": result.insertId });
        } catch (error) {
            res.status(500).json({ "error": "Error al agregar el libro", "detalle": error.message });
        }
    }

    // Función para eliminar un libro por ID
    async delete(req, res) {
        try {
            const { id } = req.body;
            const [result] = await pool.query(`DELETE FROM Libros WHERE id = ?`, [id]);
            if (result.affectedRows === 0) {
                res.status(404).json({ "error": "Libro no encontrado" });
            } else {
                res.json({ "Registros eliminados": result.affectedRows });
            }
        } catch (error) {
            res.status(500).json({ "error": "Error al eliminar el libro", "detalle": error.message });
        }
    }

    // Función para actualizar un libro por ID
    async update(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`UPDATE Libros SET nombre = ?, autor = ?, categoria = ?, anioPublicacion = ?, ISBN = ? WHERE id = ?`, 
                [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.ISBN, libro.id]);
            if (result.changedRows === 0) {
                res.status(404).json({ "error": "Libro no encontrado o sin cambios" });
            } else {
                res.json({ "Registros actualizados": result.changedRows });
            }
        } catch (error) {
            res.status(500).json({ "error": "Error al actualizar el libro", "detalle": error.message });
        }
    }

    // Función para buscar un libro por su ID desde el cuerpo de la solicitud
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const [result] = await pool.query(`SELECT * FROM Libros WHERE id = ?`, [id]);
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ "error": "Libro no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ "error": "Error al obtener el libro", "detalle": error.message });
        }
    }
}

export const libro = new LibrosController();

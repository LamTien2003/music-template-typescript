import { Router } from 'express';
import { getAllSong, createSong, editSong, getSongById, deleteSong, updateShow, getShowSongs,getShowSongsOfUser } from '../controllers/song';

import { validateToken, validateRole } from '../middleware/auth';
import { checkCreateByUser } from './../middleware/song';

const router = Router();

router.patch('/updateshow/:idSong',validateToken,validateRole('admin'), updateShow);
router.get('/mysong',validateToken, getShowSongsOfUser);
router.get('/show', getShowSongs);
router.delete('/:idSong',validateToken,checkCreateByUser, deleteSong);
router.patch('/:idSong',validateToken,checkCreateByUser, editSong);
router.get('/:idSong', getSongById);
router.post('/',validateToken, createSong);
router.get('/', getAllSong);



export default router;
import  { Request, Response, Router } from 'express';
const router = Router();

router.get('/', async (req: Request, res: Response) => res.send('Healthy'));

export default router;

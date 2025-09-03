import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/boards/');
  },
filename: (req, file, cb) => {
  const ext = file.originalname.split('.').pop();
  const boardId = req.params.id || 'board';
  cb(null, boardId + '-' + Date.now() + '.' + ext);
},
});
const uploadBoard = multer({ storage: storage });

export default uploadBoard;
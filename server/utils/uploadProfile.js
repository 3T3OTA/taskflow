import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
filename: (req, file, cb) => {
  const ext = file.originalname.split('.').pop();
  const userId = req.user.id || 'user';
  cb(null, userId + '-' + Date.now() + '.' + ext);
},
});
const uploadProfile = multer({ storage: storage });

export default uploadProfile;
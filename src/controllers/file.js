const upload = async (req, res) => {
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    path: `http://${process.env.LOCAL_ADDRESS}:${process.env.PORT}/image/${req.file.filename}`
  });
};

export default {
  upload
};
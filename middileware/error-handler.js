const multer = require("multer");
exports.next = (error, req, res, next) => {
  console.log(error);
  if (error instanceof multer.MulterError) {
    if(error.code === 'LIMIT_UNEXPECTED_FILE'){
      res.status(413).json({ message: "Number of Image Limit Exceeded", statusCode: 413 });
    }else if(error.code === 'LIMIT_FILE_SIZE'){
      res.status(413).json({ message: "File Size Limit Extended", statusCode: 413 });
    }else{
      res.status(413).json({ message: "Image Upload Failed", statusCode: 413 });
    }
  }else{
    const status = error.statusCode || 500;
    const message = error.message || 'Server Error';
    const data = error.data;
    
    res.status(status).json({
      message: message,
      statusCode: status,
      errorData: data,
    });
  }
};

exports.route = (req, res, next) => {
  const err = new Error(`No routes found! ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

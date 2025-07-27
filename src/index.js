// ...existing code...
const express = require('express');
const userRouter = require('./routes/user.route');

const app = express();

app.use('/api/users', userRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
// ...existing code...

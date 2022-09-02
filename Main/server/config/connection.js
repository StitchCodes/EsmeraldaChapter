const mongoose = require('mongoose');

mongoose.connect(proces.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/esmeraldaChapter', {
    userNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;
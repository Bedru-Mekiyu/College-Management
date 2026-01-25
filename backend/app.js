const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');
const winston = require('winston');

const app = express();

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // 100 req/user
  message: { success: false, message: 'Too many requests' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// CORS - only your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing + compression
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));

// Routes (mount after middleware)
// After app = require('./app');
// Before app.listen()

// Mount ALL routes
app.use('/api/branches', require('./routes/branch.route'));
app.use('/api/admin', require('./routes/admin-details.route'));
app.use('/api/faculty', require('./routes/faculty-details.route'));
app.use('/api/students', require('./routes/student-details.route'));
app.use('/api/subjects', require('./routes/subject.route'));
app.use('/api/exams', require('./routes/exam.route'));
app.use('/api/marks', require('./routes/marks.route'));
app.use('/api/notices', require('./routes/notice.route'));
app.use('/api/materials', require('./routes/material.route'));
app.use('/api/timetables', require('./routes/timetable.route'));

// 404 for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});


// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

module.exports = app;

// server/models/user.js
import mongoose, { Schema } from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  rollNumber: {
    type: String,
    
  },
  password: {
    type: String,
  },
  session: {
    type: String,
    
  },
  cgpa: {
    type: Number,
    
  },
  department: {
    type: String,
    
  },
  year: {
    type: String,
    
  },
  hscGpa: {
    type: Number,
  },
  sscGpa: {
    type: Number,
  },
  hallStatus: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

export default mongoose.model('Student', studentSchema);
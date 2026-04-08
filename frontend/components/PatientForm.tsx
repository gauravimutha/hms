"use client";

import { useState } from 'react';
import { User, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function PatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, '');
    }
    setFormData({ ...formData, [e.target.name]: value });
    
    // Clear error for the field being edited
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }

    // Clear alert dialogs if typing
    if (submitSuccess) setSubmitSuccess('');
    if (submitError) setSubmitError('');
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', age: '', gender: '', phone: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
      isValid = false;
    } else if (parseInt(formData.age, 10) <= 0 || isNaN(parseInt(formData.age, 10))) {
      newErrors.age = 'Age must be a positive number';
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess('');
    setSubmitError('');

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('http://localhost:5000/api/v1/patient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             name: formData.name,
             age: parseInt(formData.age, 10),
             gender: formData.gender,
             phone: formData.phone
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit patient data.');
        }

        // Display Success State & Reset Form
        setSubmitSuccess('Patient registered successfully!');
        setFormData({ name: '', age: '', gender: '', phone: '' });

      } catch (err: any) {
        setSubmitError(err.message || 'A network error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {submitSuccess && (
        <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg p-4 flex items-center">
          <CheckCircle2 className="w-5 h-5 text-[#22C55E] mr-3" />
          <p className="text-[#1E293B] text-sm font-semibold">{submitSuccess}</p>
        </div>
      )}

      {submitError && (
        <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-[#EF4444] mr-3" />
          <p className="text-[#1E293B] text-sm font-semibold">{submitError}</p>
        </div>
      )}

      <div className="bg-white border border-[#E6F4F8] rounded-xl p-8 shadow-sm">
        <div className="flex items-center mb-8 pb-4 border-b border-[#E6F4F8]">
          <User className="h-6 w-6 text-[#0F2A44] mr-3" />
          <h2 className="text-xl font-semibold text-[#0F2A44]">Patient Details</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1E293B] mb-2">Full Name</label>
            <input 
              id="name"
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 bg-[#E6F4F8] text-[#1E293B] rounded focus:outline-none focus:ring-1 focus:ring-[#00B4D8] focus:border-[#00B4D8] disabled:opacity-50 transition-colors"
              placeholder="Enter full name"
            />
            {errors.name && <p className="mt-1 text-sm text-[#EF4444] flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-[#1E293B] mb-2">Age</label>
            <input 
              id="age"
              type="number" 
              name="age"
              value={formData.age}
              onChange={handleChange}
              disabled={isSubmitting}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 bg-[#E6F4F8] text-[#1E293B] rounded focus:outline-none focus:ring-1 focus:ring-[#00B4D8] focus:border-[#00B4D8] disabled:opacity-50 transition-colors"
              placeholder="Enter age"
            />
            {errors.age && <p className="mt-1 text-sm text-[#EF4444] flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.age}</p>}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-[#1E293B] mb-2">Gender</label>
            <select 
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 bg-[#E6F4F8] text-[#1E293B] rounded focus:outline-none focus:ring-1 focus:ring-[#00B4D8] focus:border-[#00B4D8] disabled:opacity-50 transition-colors"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="mt-1 text-sm text-[#EF4444] flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.gender}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#1E293B] mb-2">Phone Number</label>
            <input 
              id="phone"
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 bg-[#E6F4F8] text-[#1E293B] rounded focus:outline-none focus:ring-1 focus:ring-[#00B4D8] focus:border-[#00B4D8] disabled:opacity-50 transition-colors"
              placeholder="e.g. 1234567890"
            />
            {errors.phone && <p className="mt-1 text-sm text-[#EF4444] flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button 
          type="button"
          disabled={isSubmitting}
          className="px-4 py-2 mr-3 text-[#64748B] font-medium hover:bg-gray-100 rounded border border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            setFormData({ name: '', age: '', gender: '', phone: '' });
            setErrors({ name: '', age: '', gender: '', phone: '' });
            setSubmitSuccess('');
            setSubmitError('');
          }}
        >
          Clear
        </button>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-[#00B4D8] text-white font-medium rounded hover:bg-[#009EBE] transition-colors flex items-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? 'Saving...' : 'Save Patient'}
        </button>
      </div>
    </form>
  );
}

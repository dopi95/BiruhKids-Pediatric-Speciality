import Department from '../models/Department.js';
import { sendNewDepartmentNewsletter, sendNewDepartmentServiceNewsletter } from '../utils/emailService.js';

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching departments',
      error: error.message
    });
  }
};

// Create department
export const createDepartment = async (req, res) => {
  try {
    const { title_en, title_am, description_en, description_am } = req.body;
    
    const department = new Department({
      title_en,
      title_am,
      description_en,
      description_am,
      services: []
    });
    
    await department.save();
    
    // Send newsletter to subscribers
    try {
      await sendNewDepartmentNewsletter(department);
    } catch (emailError) {
      console.error('Failed to send department newsletter:', emailError);
    }
    
    res.status(201).json({
      success: true,
      data: department,
      message: 'Department created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating department',
      error: error.message
    });
  }
};

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title_en, title_am, description_en, description_am } = req.body;
    
    const department = await Department.findByIdAndUpdate(
      id,
      { title_en, title_am, description_en, description_am },
      { new: true, runValidators: true }
    );
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    res.json({
      success: true,
      data: department,
      message: 'Department updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating department',
      error: error.message
    });
  }
};

// Delete department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const department = await Department.findById(id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    const departmentName = department.title_en;
    await Department.findByIdAndDelete(id);
    
    res.json({
      success: true,
      data: { title_en: departmentName },
      message: 'Department deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting department',
      error: error.message
    });
  }
};

// Add service to department
export const addService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_en, name_am } = req.body;
    
    const department = await Department.findById(id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    const newService = { name_en, name_am };
    department.services.push(newService);
    await department.save();
    
    // Send newsletter to subscribers
    try {
      await sendNewDepartmentServiceNewsletter(department, newService);
    } catch (emailError) {
      console.error('Failed to send service newsletter:', emailError);
    }
    
    res.status(201).json({
      success: true,
      data: department,
      message: 'Service added successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding service',
      error: error.message
    });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id, serviceId } = req.params;
    const { name_en, name_am } = req.body;
    
    const department = await Department.findById(id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    const service = department.services.id(serviceId);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
    
    service.name_en = name_en;
    service.name_am = name_am;
    
    await department.save();
    
    res.json({
      success: true,
      data: department,
      message: 'Service updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating service',
      error: error.message
    });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id, serviceId } = req.params;
    
    const department = await Department.findById(id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    const serviceToDelete = department.services.id(serviceId);
    const serviceName = serviceToDelete?.name_en || 'Unknown Service';
    
    department.services.pull(serviceId);
    await department.save();
    
    res.json({
      success: true,
      data: { name_en: serviceName },
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    });
  }
};
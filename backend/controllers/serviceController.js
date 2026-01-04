import Service from '../models/Service.js';

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createService = async (req, res) => {
  try {
    const serviceData = req.body;
    const serviceId = await Service.create(serviceData);
    const newService = await Service.findById(serviceId);
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceData = req.body;

    const updated = await Service.update(id, serviceData);
    if (!updated) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const updatedService = await Service.findById(id);
    res.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

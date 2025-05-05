import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchStylists() {
  const response = await axios.get(`${API_BASE_URL}/stylist?stylist_ID=%`);
  return response.data;
}

export async function fetchStylistSpecializations(id: string): Promise<string> {
  const response = await axios.get(`${API_BASE_URL}/stylist/specializations/${id}`);
  return response.data.specializations || 'No specialization';
}

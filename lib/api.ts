import {FormData } from "../types/formTypes";

export const fetchCandidateLevels = async () => {
  try {
    const response = await fetch('https://tools.qa.public.ale.ai/api/tools/candidates/levels');
    if (!response.ok) throw new Error('Failed to fetch candidate levels');
    const data = await response.json();
    return data.levels;
  } catch (error) {
    throw error;
  }
};

export const submitAssignment = async (data: FormData) => {
  try {
    const response = await fetch('https://tools.qa.public.ale.ai/api/tools/candidates/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw { errorData };
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

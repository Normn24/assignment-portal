export interface FormData {
  name: string; 
  email: string; 
  assignment_description: string; 
  github_repo_url: string; 
  candidate_level: string; 
}

export interface ApiError {
  errorData?: {
    errors?: [];
  };
  message?: string;
}

export interface InputProps{
  label: string;
  name: string;
  type?: string;
  as?: string;
};
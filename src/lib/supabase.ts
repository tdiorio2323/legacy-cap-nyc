
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create the client if we have valid credentials
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type LeadType = 'contact' | 'pre_approval' | 'calculator' | 'deal_desk' | 'mca_score';

export interface LeadData {
  business_name?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  monthly_revenue?: string;
  funding_amount?: string;
  business_age?: string;
  message?: string;
  lead_type: LeadType;
  metadata?: Record<string, any>;
}

export const submitLead = async (data: LeadData) => {
  // If no Supabase client, mock the submission (prevent crash)
  if (!supabase) {
    console.log('MOCK SUBMISSION (Supabase keys missing):', data);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          ...data,
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error submitting lead:', error);
    // Since we are showing the frontend to a client, let's gracefully fail validation
    // but maybe we still want to simulate success if it's just a config error?
    // For now, return the error object so the UI can decide,
    // BUT getting here means we HAD a client but the request failed.
    return { error };
  }
};

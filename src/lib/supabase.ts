
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Lead not submitted to specific backend.');
    return { error: 'Configuration missing' };
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
    return { error };
  }
};

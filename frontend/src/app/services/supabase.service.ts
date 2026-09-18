import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Poc {
  id: string;
  created_at: string;
  title: string;
  description: string;
  demo_url?: string;
  github_url?: string;
  image_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getPocs(): Promise<Poc[]> {
    if (environment.supabaseUrl === 'YOUR_SUPABASE_URL') {
        console.warn('Supabase URL is not configured.');
        return [];
    }
    const { data, error } = await this.supabase
      .from('pocs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching POCs:', error.message);
      return [];
    }

    return data as Poc[];
  }
}

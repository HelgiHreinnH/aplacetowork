import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://klcfyohkhmhmuisiawjz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY2Z5b2hraG1obXVpc2lhd2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMzc3ODksImV4cCI6MjA0ODgxMzc4OX0.CwiaGbF1Pbrk5OfrQGs34gM11voCjQTWKN5qPpq_FmI";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
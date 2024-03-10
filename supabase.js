// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sgzhouaacvszvsljbbur.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnemhvdWFhY3ZzenZzbGpiYnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwNTk0MTEsImV4cCI6MjAyNTYzNTQxMX0.y_YiE8pBI_3n_Ie-PNNzPMaC9c6R74T0NCr7TqnsUSQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

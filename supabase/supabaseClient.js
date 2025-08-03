import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rjoirkhkrulahqbotmeq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqb2lya2hrcnVsYWhxYm90bWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxOTg2MzMsImV4cCI6MjA2OTc3NDYzM30.iPl-hQmxNjQD4iITg_Lx03GoqTjtSm0blzGo47fMMX4'
export const supabaseer = createClient(supabaseUrl, supabaseKey)

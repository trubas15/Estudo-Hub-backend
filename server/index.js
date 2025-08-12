const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
app.use(cors()); app.use(bodyParser.json());
const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
const configuration = new Configuration({ apiKey: OPENAI_KEY });
const openai = new OpenAIApi(configuration);
app.post('/api/chat', async (req, res)=>{
  const { message } = req.body;
  try{
    const response = await openai.createChatCompletion({ model:'gpt-4o-mini', messages:[{role:'system',content:'Você é um assistente de estudos sucinto.'},{role:'user',content:message}], max_tokens:600 });
    const text = response.data.choices?.[0]?.message?.content || response.data.choices?.[0]?.text || '';
    res.json({ ok:true, text });
  }catch(err){ console.error(err?.response?.data||err.message); res.status(500).json({ok:false,error:'OpenAI error'}); }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log('Server listening on', PORT));

const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helper/uuid');
const notes = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.listen(PORT,()=>
    console.log(`Example app listening at http://localhost:${PORT}`)
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// get request for notes
app.get('/api/notes',(req,res)=>{
  fs.readFile('./db/db.json','utf-8',(error,data)=>{
    error ? console.log(err) : res.json(JSON.parse(data))
  })
});

app.post('/api/notes',(req,res)=>{
  
  const { title , text } = req.body;
  if(title && text){
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    const reviewNotes = JSON.parse(data);
    reviewNotes.push(newNote);
    reviews = reviewNotes


  fs.readFile('./db/db.json','utf-8',(error,data)=>{
    if(error){
      console.log(error);
    }else{
      fs.writeFile('./db/db.json',JSON.stringify(reviewNotes,null,4),
      (writeErr)=> writeErr ? console.error(writeErr) : console.info('wrote note')
      )
    }
  })

  const response ={
    status: 'success',
    body: newNote,
  };
  console.log(response);
  res.json(response)
  }else{
    res.json('error in posting note');
  }
})


app.get("*",function(req, res){
    res.sendFile(path.join(__dirname,"public/index.html"))
})




const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helper/uuid');
const notes = require('./db/db.json');
// const { text } = require('express');
// const { title } = require('process');
// const { randomUUID } = require('crypto');
// const { json } = require('express/lib/response');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get("/",function(req, res){
    res.sendFile(path.join(__dirname,"public/index.html"))
})

app.listen(PORT,()=>
    console.log(`Example app listening at http://localhost:${PORT}`)
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// get request for notes
app.get('/api/notes',(req,res)=>{
  consol.log(notes);
  res.json(notes);
  console.info(`${req.method} request recieved to get notes`)
});

// app.post('/api/notes',(req,res)=>{
//   console.info(`${req.method} request recieved to add a note`);
  
//   const { title , text } = req.body;
//   if(title && text){
//     const newNote = {
//       title,
//       text,
//       note_id: uuid(),
//     };
//     const reviewNote = JSON.stringify(newNote);
  
//   fs.writeFile(`./db/${newNote}.json`,reviewNote, (err)=>
//     err ? console.error(err) : console.log `Review for ${newNote} has been written to JSON file`  
//   );

//   const response ={
//     status: 'success',
//     body: newNote,
//   };
//   console.log(response);
//   res.json(response)
//   }else{
//     res.json('error in posting note');
//   }
// })

app.post('/api/notes',(req, res)=>{
  console.info(`${req.method} request recieved to add a note`);

  const {title , text} = req.body;
  if(title && text){
    const newNote ={
      title,
      text,
      note_id: uuid(),
    };
    const parsedNotes = JSON.parse(data);

    parsedNotes.push(newNote);
    notes = newNote;

    // fs.writeFile('./db/db.json','utf-8',JSON.stringify(parsedNotes),
    // (writeErr)=>writeErr? console.error(writeErr) : console.info('succesfullt updated notes')
    // );
    fs.readFile('./db/db.json', 'utf-8',(err,data)=>{
      if(err){
        console.error(err);
      }else{
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);
        notes = newNote;

        fs.writeFile('./db/db.json',JSON.stringify(parsedNotes),
        (writeErr)=>writeErr? console.error(writeErr) : console.info('succesfully updated ntoes!')
        );
      };
    });
    const response ={
      status: 'success',
      body: newNote
    };
    console.log(response);
    res.json(response)  
  }else{
    res.json('Error in posting note')
  }
 
});
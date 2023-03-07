const express = require('express')
const sqlite = require("sqlite3").verbose()
const app = express()
app.use(express.json()) 
const port = 3001
const cors = require('cors')
app.use(cors())

const db = new sqlite.Database("database.db", (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all("select * from hagust", [], (err, data) => {
        console.log(data)
        res.send(data)
    }) 
})

app.get('/hagust/:id', (req, res) => {
    const id = req.params.id
    db.get("select * from hagust where id=?", [id], (err, data) => {
        res.send(data)
    }) 
})

app.post("/new", (req,res)=>{
   const text = req.body.text
   const src = req.body.src
  
   db.run("insert into hagust(text, src) values(?,?)",[text, src], ()=>{
    res.send("OK")
   } )
})

app.put("/update/:id", (req, res)=>{
    const text = req.body.text
    const src = req.body.src
    const id = req.params.id
    db.run("update hagust set text=?, src=? where id=?",[text, src,id], (err,data)=>{
        res.send("OK")
    })
})

app.delete('/delete/:id', (req,res)=>{
    const id=req.params.id
    db.get("delete from hagust where id=?",[id], (err,data)=>{
        res.send("OK")
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

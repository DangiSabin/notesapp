let notes = [
    {
        id: "db0754cf2281bcdffe4dce1b68c6a215",
        title:"Welcome Note ♥ ",
        body:"Welcome to the Notes! Makes the life easy with keepin gtracking all your chores.Doing laundry, doing groceries on time. Plan weekends and your weekends on best way. Be more productive !! ",
        dateCreated: new Date("2022-11-30T16:47:31.390Z"),
        important: true
    },
    {
        id: "db0754cf2281bcdffe4dce1b68c6a215",
        title:"First Note ♥",
        body:"Very first Note Entered. This is reminder of being happying and working hard always. Complete the project by Sunday not make it last hour!!!!",
        dateCreated: new Date("2022-11-30T16:48:56.884Z"),
        important: true
    },
    {
        id: "db0754cf2281bcdffe4dce1b68c6a215",
        title:"Weekend Note ♥",
        body:"THis weekend I have many things to covered. Plants need fertilizer and my room need a re-decoration. DO you best!",
        dateCreated: new Date("2022-05-30T16:48:07.800Z"),
        important: true
    },
    {
        id: "db0754cf2281bcdffe4dce1b68c6a215",
        title:"Thank you Note ♥♥♥",
        body:"Thank you so much Oula, for the best session ever. I have learned alot from this session. Definitley, was productive than any other session with TCS!! YOu are the Best♥♥♥♥ !",
        dateCreated: new Date("2022-05-30T16:48:07.800Z"),
        important: true
    }
]

exports.userNotes = (req, res)=>{
    let userNotes = notes.filter(note=> {return req.params.id === note.id})
    res.status(200).json(userNotes)
}
exports.getNote = (req, res)=>{
    let note = notes.filter(note=> { return new Date(req.params.dateCreated).getTime() === note.dateCreated.getTime()})
    res.status(200).json(note)
}

exports.addNote = (req, res)=>{
    let note = {
        id: req.params.id,
        title: req.body.title,
        body: req.body.body,
        important: req.body.important,
        dateCreated: new Date()
    }
    notes.push(note)
    res.status(200).json("note has been entered")
}

exports.editNote = (req, res)=>{
    let note = notes.filter(note=> { return new Date(req.params.dateCreated).getTime() === note.dateCreated.getTime()})
    console.log(note)
    note[0].id = note[0].id,
    note[0].title = req.body.title,
    note[0].body = req.body.body,
    note[0].important = req.body.important,
    note[0].dateCreated = note[0].dateCreated
    console.log(note[0])
    res.status(200).json(notes)
}

exports.deleteNote = (req, res)=>{
    for(let i =0; i< notes.length; i++){
        if(notes[i].dateCreated.getTime() === new Date(req.params.dateCreated).getTime()){
            notes.splice(i, 1)
        }
    }
    res.status(200).json(notes)

}




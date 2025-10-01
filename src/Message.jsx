function Message() {

    const name = "\"Insert your name\""

    if (name){
        return  <h1>Hello {name} <br />hihihi</h1>
    }

    return <h1>Hello Worlds hihihi</h1>
}

export default Message;
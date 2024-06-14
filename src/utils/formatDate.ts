export  const  formatData  =(date : string)=>{
    const newDate = new Date(date)

    if(newDate.getMonth() < 9){
        return  (`0${newDate.getMonth()+1}/${newDate.getFullYear()}`)
    }
    return  (`${newDate.getMonth()+1}/${newDate.getFullYear()}`)

}
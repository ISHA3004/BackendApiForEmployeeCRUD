const validateValues = (id,name,mobile,email) =>{
    if(Number.isInteger(id))
    {
        if(/^[a-zA-Z]+$/.test(name))
        {
            if(mobile.toString().length == 10)
            {
                if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
                {
                    return "ok";
                }
                else
                    return "wrong email format";
            }
            else    
                return "wrong mobile number";
        }
        else
            return "Wrong name format";
    }
    else
        return "wrong Id";
}

module.exports = validateValues;
document.getElementById("button-addon2").addEventListener("click", check);

function check(){
    var number = document.getElementById("number").value;
    var result = 0;
    var calNumber = "";
    var ctrlNum = "-1";
    // Normalno 100-0000000012345-79
    if(number.match("\^[0-9]{3}-[0-9]{13}-[0-9]{2}\$")){
        calNumber = (number.replaceAll("-","")).substring(0,16);
        result = calculation(calNumber);
        ctrlNum = number.substring(number.length-2);
    } 

    // Kompresovano Normalno 100-12345-79
    if(number.match("\^[0-9]{3}-[0-9]{1,12}-[0-9]{2}\$")){
        numberArr = number.split("-");
        fill = "0".repeat(13-numberArr[1].length);
        calNumber =numberArr[0] + fill + numberArr[1];
        result = calculation(calNumber);
        ctrlNum = number.substring(number.length-2);
    }

    // Normalno bez kontrolnog broja 100-0000000012345
    if(number.match("\^[0-9]{3}-[0-9]{13}\$")){
        calNumber = number.replaceAll("-","");
        result = calculation(calNumber);
    } 

    // Kompresovano Normalno bez kontrolnog broja 100-12345
    if(number.match("\^[0-9]{3}-[0-9]{1,12}\$")){
        numberArr = number.split("-");
        fill = "0".repeat(13-numberArr[1].length);
        calNumber = numberArr[0] + fill + numberArr[1]
        result = calculation(calNumber);
    }

    // Bez crtica sa kontrolnim brojem 100000000001234579
    if(number.match("\^[0-9]{18}\$")){
        calNumber = number.substring(0,16);
        result = calculation(calNumber);
        ctrlNum = number.substring(number.length-2);
    }

    // Bez crtica bez kontrolnog broja 1000000000012345
    if(number.match("\^[0-9]{16}\$")){
        calNumber = number;
        result = calculation(number);
    }
    // Bez crtica kompresovano bez kontrolnog broja 10012345 -- Neregularan format
    if(number.match("\^[0-9]{1,15}\$")){
        bankId = number.substring(0,3);
        accountId = number.substring(3);
        fill = "0".repeat(13-accountId.length);
        calNumber = bankId + fill + accountId;
        result = calculation(calNumber);
    }
    
    if(result == 0){
        document.getElementById("ctrl-num").innerHTML = "XX";
        document.getElementById("ctrl-num").style.backgroundColor = "#f8d7da";
        document.getElementById("message").classList = "alert alert-danger";
        document.getElementById("message").innerHTML = "Грешка";
        return;
    } 
    if(result < 10){
        result = "0" + result;
    }
    if(ctrlNum > -1){
        if(ctrlNum == result){
            document.getElementById("ctrl-num").innerHTML = result;
            document.getElementById("ctrl-num").style.backgroundColor = "#d4edda";
            document.getElementById("message").classList = "alert alert-success";
            document.getElementById("message").innerHTML = "Контролни број је валидан";

            return;
        } else {
            document.getElementById("ctrl-num").innerHTML = result;
            document.getElementById("ctrl-num").style.backgroundColor = "#f8d7da";
            document.getElementById("message").classList = "alert alert-danger";
            document.getElementById("message").innerHTML = "Контролни број није валидан";
            return;
        }
    } else {
        document.getElementById("ctrl-num").innerHTML = result;
        document.getElementById("ctrl-num").style.backgroundColor = "#e2e3e5";
        document.getElementById("message").classList = "alert alert-secondary";
        document.getElementById("message").innerHTML = "Контролни број је " + result;
        return;
    }
}

function calculation(number){
    return 98 - mod97(number+"00", 97);
}

function mod97(number){
    var result = 0;
    for(let i = 0; i < number.length; i++){
        result = (result * 10 + parseInt(number[i])) % 97;
    }
    return result;
}

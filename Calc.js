let result = document.querySelector('#Result')
let operation = document.querySelector('#Operation')
let op = [""]
var temp = []
let OpOut ,tot

document.addEventListener('keypress', function (Event){
    // console.log(`Evento: ${Event.key}`)
    ejecutar(Event.key)
})

function Delete(){
    operation.value = ""
    result.value = ""
    op = [""]
    temp= [""]
    operation.value = ""
    document.querySelector("#PMBtn").disabled = true
}

function PartialDel(){
    if (op[op.length -1] === "" && op.length != 1){
        console.log("borrar")
        op.pop()
    }
    if (op[op.length -1] != ""){
        if(op.length === 2){
            op.pop()
            temp = [op[op.length - 1]]
        }
        else{
            let last = op[op.length - 1].toString()
            console.log(last.length)
            if (last.length != 1){
                if(last[0] != "-" || last.length > 2){
                    last = last.slice(0,-1)
                    op[op.length - 1] = parseFloat(last)
                    temp.pop()
                }
                else if(op.length === 1){
                    op = [""]
                    temp = []
                }
                else {
                    op.pop()
                    temp = [op[op.length - 1]]
                }
            }
            else{
                if(op.length === 1){
                    op = [""]
                    temp = []
                }
                else {
                    op.pop()
                    temp = [op[op.length - 1]]
                }
            }
        }
    }
}

function Convertir(val){
    switch (val){
        case 'PMBtn' : return '+-'
        case '%' : return '%'
        case 'PorBtn' : return '%'
        case 'DivBtn' : return '/'
        case '/' : return '/'
        case 'MulBtn' : return '*'
        case '*' : return '*'
        case 'MinBtn' : return '-'
        case '-' : return '-'
        case 'PlaBtn' : return '+'
        case '+' : return '+'
        case 'EquBtn' : return '='
        case 'Enter' : return '='
        case 'DotBtn' : return '.'
        case '.' : return '.'
        case 'NinBtn' : return 9
        case 'EigBtn' : return 8
        case 'SevBtn' : return 7
        case 'SixBtn' : return 6
        case 'FifBtn' : return 5
        case 'FouBtn' : return 4
        case 'ThrBtn' : return 3
        case 'TwoBtn' : return 2
        case 'OneBtn' : return 1
        case 'CerBtn' : return 0
        default: return "Unvalid"
    }
}

function ToNumber(arr){
    let textNumber = ""
    console.log(`OP: ${arr}`)
    arr.forEach(element => {
        textNumber += element.toString()
    })
    if(!isNaN(parseFloat(textNumber)))
        op[op.length-1] = parseFloat(textNumber)
    
}

function MasMenos(){
    op[op.length-1] *= -1
    temp[0] *= -1
}

function Porcentaje(){
    if(op[op.length -1] != ""){
        op[op.length -1] /= 100
        op.push("")
        temp = [""]
        document.querySelector("#PMBtn").disabled = true
    }
}

function ImpResta(){
    if (op.length === 1 && op[0] === 0){
        op = ["-"]
        temp=["-"]
    }
    else{
        op.push("-","")
        temp=[]
    }
}

function Igual(){
    if(op[op.length - 1] === "")
        op.pop()
    let lg = op.length

    if (lg < 3){ // Length == 1 || Length == 2
        result.value = op[0]
        op = [op[0]]
    }
    else { // Length == 3 || Length == 4
        switch (op[1]){
            case "+" : 
                tot = op[0] + op[2]
                break
            case "-" : 
                tot = op[0] - op[2]
                break
            case "*" : 
                tot = op[0] * op[2]
                break
            case "/" : 
                tot = op[0] / op[2]
                break
        }
        result.value = tot
        if (lg === 4)
            op = [tot, op[3], ""]
        else
            op = [tot]
    }
}

function imprimir(){
    let temp2 = ""
    op.forEach(element => {
        temp2 += element.toString()
    })
    return temp2
}

function ejecutar(id){
    if(id === "CBtn")
        Delete()
    else if(id == "DelBtn")
        PartialDel()
    else{
        if(isNaN(id)) // Si no es numero convertir a numero u operacion
            id = Convertir(id)

        if(!isNaN(id) || id === '.' || id === "+-" || id === "%"){ // 1 2 3 4 5 6 7 8 9 . +- %
            if (isNaN(op[op.length - 2])){
                if (id === "+-"){
                    MasMenos()
                }
                else if (id === "%")
                    Porcentaje()
                else{
                    document.querySelector("#PMBtn").disabled = false
                    temp.push(id)
                    ToNumber(temp)
                }
            }
        }
        else{ // + - * / =
            if (id != "="){
                if(op.length === 4){
                    op[op.length - 1] = id
                    op.push("")
                }
                if(op.length === 3 && op[2] != "")
                    op.push(id,"")
                if(op.length === 2){
                    op[op.length - 1] = id
                    op.push("")
                }
                if(op.length === 1 && op[0] != "")
                    op.push(id, "")
                temp=[""]
                document.querySelector("#PMBtn").disabled = true
            }
        }
        if (op.length > 4 || id === "="){
            temp=[""]
            Igual()
        }

    }
    
    /////////////TEST//////////////////
    console.log(`Temporal: ${temp}`)
    console.log(`Op: ${op}`)
    
    OpOut = imprimir()
    operation.value = (`${OpOut}`)
}

//note where ever i used console.log thats some time to track values//remove if u want!



const passworddisplay=document.querySelector("[data-passwordDisplay]")





const datacopymsg= document.querySelector("[data-copyMsg]");


const datacopyButton=document.querySelector("[data-copy]");

const lengthdisplay = document.querySelector("[data-lengthNumber]");

let inputslider=document.querySelector("[data-lengthSlider]");




const UppercaseCheck= document.querySelector("#UpperCase");
const LowercaseCheck= document.querySelector("#LowerCase");
const numbersCheck= document.querySelector("#Numbers");
const symbolsCheck= document.querySelector("#Symbols");


const dataIndicator = document.querySelector("[data-indicator]");

const GenerateButton= document.querySelector(".Generate-Button");

const checkboxall = document.querySelectorAll("input[type=checkbox]");






let password ="";

let passwordlength="10";

let checkcount=0;





UppercaseCheck.checked=true;
checkcount=1;




function handleslider()
{
   inputslider.value=passwordlength;

    lengthdisplay.innerText=passwordlength;

    
    const min = inputslider.min;
    const max = inputslider.max;


    inputslider.style.backgroundSize = ((passwordlength-min)*100/(max-min)) + "% 100%";
    

}
handleslider();


inputslider.addEventListener("input" , function(event){
    passwordlength = event.target.value; 





    handleslider(); 
})





function handlecheckBoxChange()
{
    checkcount = 0


    checkboxall.forEach(function(cbox){
        if (cbox.checked)
            {
                console.log("checked...");
                checkcount+=1;
            }
            console.log("counter of checkcount : ", checkcount);
        });

        if (passwordlength < checkcount)
        {
            passwordlength=checkcount;
            handleslider();
        }
    
    }



checkboxall.forEach(function(cbox){
    cbox.addEventListener("change" , handlecheckBoxChange );
})













function randomIntger(min , max)
{
    console.log("max ech time : ", max);
    console.log("min ech time : ", min);





  let randomNUmber= Math.floor( Math.random() * (max-min + 1) ) + min;

  
    


 

     


   
    return randomNUmber;

} 



function GenerateRandomNumbers()
{
    return randomIntger(0,9);
}
console.log(GenerateRandomNumbers());






function GenerateRandomUpperCase()
{
    let x =String.fromCharCode(randomIntger(65,91) );
    console.log("x",x);
    return x;
}
console.log(GenerateRandomUpperCase());




function GenerateRandomlowerCase()
{
    return String.fromCharCode( randomIntger(97,123) );

}
console.log(GenerateRandomlowerCase());







const symbol_db = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function GenerateRandomSymbols()
{
    const randNum = randomIntger(0,symbol_db.length );
    return symbol_db.charAt(randNum);
}
console.log(GenerateRandomSymbols());

















    




function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
  }



let funarray = [] ;
GenerateButton.addEventListener("click", function(event){
    
    
    if (checkcount == 0) {
        return;
    }
    
    
    if (passwordlength < checkcount) { 
        passwordlength = checkcount; 
        handleslider();
    }


password = "";
 


let funArray = [];   
    if (UppercaseCheck.checked)
    {
        funArray.push(GenerateRandomUpperCase);
        
    }
    if (LowercaseCheck.checked)
        {
            funArray.push(GenerateRandomlowerCase);
        }
     if (numbersCheck.checked)
    {
        funArray.push(GenerateRandomNumbers);
    }
    if (symbolsCheck.checked)
        {
            funArray.push(GenerateRandomSymbols);
        } 

        
    for (let i = 0 ; i<funArray.length ; i++)
        {
            
            password += funArray[i]();
        }

        
    for (let i = 0 ; i <passwordlength-funArray.length; i++ )
    {
        let randIndex = randomIntger(0 , funArray.length -1);
        console.log('randindex:',randIndex);
        console.log('randindex-type:',typeof randIndex);
        password += funArray[randIndex]();
        console.log("password before shuffle : ",password);
    }
    
    password= shufflePassword(Array.from(password));
    passworddisplay.value=password;
    calcStrength();
});


function calcStrength()
{
    let hasupprcase= false;
    let haslowercase= false;
    let hasnumber= false;
    let hassymb= false;

    if(UppercaseCheck.checked)
    {
        hasupprcase= true;
    }
    if (LowercaseCheck.checked)
    {
        haslowercase=true;
    }
   if (numbersCheck.checked)
    {
        hasnumber=true;
    }
   if (numbersCheck.checked)
    {
        hassymb=true;
    }


    if (hasupprcase && haslowercase && (hasnumber || hassymb ) && passwordlength>=8)
    {
        console.log("hucase" , hasupprcase);
        console.log("hLwcase" , haslowercase);
        console.log("huNumb" , hasnumber);
        console.log("husymb" , hassymb);
        console.log("strongest password..");
        setblinkcolor("#0f0");

    }
    else if ( (hasupprcase || haslowercase ) && (hasnumber || hassymb) && (passwordlength>=6) )
    {
        console.log("hucase" , hasupprcase);
        console.log("hLwcase" , haslowercase);
        console.log("huNumb" , hasnumber);
        console.log("husymb" , hassymb);
        console.log("medium passwcalcStrengthord..");
        setblinkcolor("#ff0");
           

    }
    else
    {
        console.log("hucase" , hasupprcase);
        console.log("hLwcase" , haslowercase);
        console.log("huNumb" , hasnumber);
        console.log("husymb" , hassymb);
        console.log("weakest password...");
        setblinkcolor("red");
    }

}
function setblinkcolor(color)

{

    dataIndicator.style.cssText =`background-color: ${color} ; box-shadow: 1px 1px 8px 4px ${color} , -1px -1px 8px 4px ${color} ` ;
}
setblinkcolor("#ccc");














datacopyButton.addEventListener("click",function(event){
    if(passworddisplay.value)
        {
            copybuttonclick();
        }
    })
    
    
    async function copybuttonclick()
    {
        let retrievedParentofcopyimg= document.querySelector(".password-copybutton")
        let retirevedCopyimg=document.querySelector(".copyimg");
        try
        {
            await navigator.clipboard.writeText(passworddisplay.value);
            
            
            datacopymsg.innerText="Copied!";
            datacopymsg.style.cssText="box-shadow: 1px 1px 4px 4px rgb(157, 231, 243) ,  -1px -1px 4px 4px rgb(237, 108, 185); background: linear-gradient(90deg, var(--lt-violet) , var(--lt-violet2)) ;  color:white ; cursor:pointer ;";
            
            
            retrievedParentofcopyimg.removeChild(retirevedCopyimg);
            
            var newimg=document.createElement("img");
            newimg.setAttribute("src", "check-markk.png" );
            newimg.setAttribute("height", "24px" );
            newimg.setAttribute("width", "24px" );
            newimg.style.cssText="  pointer-events:none ;"; 
            
        retrievedParentofcopyimg.append(newimg);
        retrievedParentofcopyimg.style.cssText= "pointer-events:none";
        
        
     
        
    }
    catch(e)
    {
        console.log("error while copying is : ",e);
        datacopymsg.innerText="failed";
        
    }
    
    
    
    setTimeout(function(){
        datacopymsg.innerText=""; 
        datacopymsg.style.cssText="";
            retrievedParentofcopyimg.removeChild(newimg);
        retrievedParentofcopyimg.append(retirevedCopyimg);
        retrievedParentofcopyimg.style.cssText= "pointer-events:true";
    },1500);  
}



let iamclearbutton=document.querySelector(".Clear-Button");
console.log(iamclearbutton);
iamclearbutton.addEventListener("click",function(event){

    passworddisplay.value="";
    passwordlength=10;
    handleslider(); 
    LowercaseCheck.checked=false;
    numbersCheck.checked=false;
    symbolsCheck.checked    =false;
    setblinkcolor("#ccc");
})

